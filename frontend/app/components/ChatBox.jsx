'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { sendDirectChatMessage } from '../services/api';
import { createSession, getMessages, getSession, updateSession } from '../services/sessions';
import { wsClient } from '../services/websocket';
import { getFAQQuestions } from '../services/faqs';
import { getWorkflowsList, getWorkflow, getWorkflowNodes } from '../services/workflows';
import Message from './Message';
import SpeechRecorder from './SpeechRecorder';

export default function ChatBox({ workflowId, continueSessionId = null }) {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlSessionId = searchParams.get('continue') || continueSessionId;
  
  // ==================== STATE ====================
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [sessionTitle, setSessionTitle] = useState('New Chat');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitleValue, setEditTitleValue] = useState('');
  const [useWebSocket, setUseWebSocket] = useState(true);
  const [wsStatus, setWsStatus] = useState('disconnected');
  
  // FAQ Suggestions
  const [allFAQs, setAllFAQs] = useState([]);
  const [faqSuggestions, setFaqSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Workflow and Node Suggestions
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [workflowNodes, setWorkflowNodes] = useState([]);
  const [showNodeSuggestions, setShowNodeSuggestions] = useState(false);
  
  // Ref to track WebSocket mode across route changes
  const wsModeRef = useRef(true);

  // ==================== HELPER FUNCTIONS ====================
  
  /**
   * Parse API response and extract message content
   * Handles different response formats: knowledge_graph, faq, rag, and fallback
   */
  const parseApiResponse = (response) => {
    let botText = '';
    let answers = [];
    let targetNodes = [];
    let source = 'unknown';
    
    if (response.success === false) {
      botText = response.message || response.answer || "I couldn't find a response. Please try another question.";
    } else if (response.source === 'knowledge_graph' && (response.target_nodes?.length > 0 || response.source_response)) {
      targetNodes = response.target_nodes || [];
      botText = response.source_response || '';
      source = 'knowledge_graph';
    } else if (response.source === 'faq') {
      botText = response.answer || "FAQ answer not available.";
      source = 'faq';
    } else if (response.source === 'rag') {
      // For RAG responses, pass the full response object to preserve source_documents
      botText = response; // Pass the entire response object
      source = 'rag';
    } else {
      botText = response.message || response.answer || "I couldn't find a response. Please try another question.";
    }
    
    return { botText, answers, targetNodes, source };
  };

  /**
   * Parse stored message answer from database (handles JSON parsing)
   */
  const parseStoredAnswer = (answerJson, source = 'unknown') => {
    let answerText = answerJson;
    let answers = [];
    let targetNodes = [];
    let finalSource = source;
    
    try {
      const parsed = JSON.parse(answerJson);
      
      if (parsed.target_nodes?.length > 0 || parsed.source_response) {
        // Knowledge graph response
        targetNodes = parsed.target_nodes || [];
        answerText = parsed.source_response || '';
        finalSource = 'knowledge_graph';
      } else if (parsed.answer) {
        answerText = parsed.answer;
      } else if (parsed.source_response) {
        answerText = parsed.source_response;
      } else {
        answerText = JSON.stringify(parsed);
      }
      
      if (parsed.source) finalSource = parsed.source;
    } catch (e) {
      // Not JSON, keep as is
      answerText = answerJson;
    }
    
    return { answerText, answers, targetNodes, source: finalSource };
  };

  /**
   * Convert database messages to display format
   * Each database message becomes one user message + one bot message
   */
  const convertDbMessagesToDisplay = (dbMessages) => {
    const displayMessages = [];
    
    dbMessages.forEach(msg => {
      // Add user question
      displayMessages.push({
        type: 'user',
        text: msg.question
      });
      
      // Add bot answer if it exists
      if (msg.answer) {
        const { answerText, answers, targetNodes, source } = parseStoredAnswer(
          msg.answer,
          msg.source || 'unknown'
        );
        
        displayMessages.push({
          type: 'bot',
          text: answerText,
          answers: answers,
          targetNodes: targetNodes,
          source: source,
          isHistorical: true // Mark messages loaded from database
        });
      }
    });
    
    return displayMessages;
  };

  /**
   * Load existing session from database via backend API
   * Called when URL has continue parameter
   */
  const loadExistingSession = async (sessionIdToLoad) => {
    try {
      const sessionResult = await getSession(sessionIdToLoad);
      
      if (!sessionResult || !sessionResult.session) {
        console.warn('Session not found:', sessionIdToLoad);
        return false;
      }
      
      const session = sessionResult.session;
      
      setSessionId(session.session_id);
      setSessionTitle(session.title || 'New Chat');
      
      // Only load messages if UI is empty (don't overwrite newly added messages)
      if (messages.length === 0) {
        const messagesResult = await getMessages(sessionIdToLoad);
        console.log('from hasura:', messagesResult);
        if (messagesResult && messagesResult.messages) {
          const displayMessages = convertDbMessagesToDisplay(messagesResult.messages);
          setMessages(displayMessages);
          console.log("in frontend state : ", displayMessages);
        }
      }
      
      return true;
    } catch (err) {
      console.error('Failed to load session:', err);
      setError('Failed to load session. Starting new chat.');
      return false;
    }
  };

  /**
   * Create a new chat session in the database via backend API
   * Returns the new session ID
   */
  const createNewSession = async () => {
    try {
      if (!user?.user_id) {
        const errorMsg = 'User not authenticated';
        console.error('❌', errorMsg);
        setError(errorMsg);
        throw new Error(errorMsg);
      }
      
      // Verify token exists before making request
      const token = localStorage.getItem('token');
      if (!token) {
        const errorMsg = 'Authentication token missing. Please login again.';
        console.error('❌', errorMsg);
        setError(errorMsg);
        throw new Error(errorMsg);
      }
      
      console.log('🔄 Creating new session for user:', user.user_id);
      const result = await createSession(sessionTitle);
      if (result.session) {
        const newSessionId = result.session.session_id;
        setSessionId(newSessionId);
        console.log('✅ Session created:', newSessionId);
        return newSessionId;
      }
      return null;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create session';
      console.error('❌ Session creation failed:', errorMsg);
      setError(errorMsg);
      return null;
    }
  };

  /**
   * Initialize or restore session based on URL
   */
  useEffect(() => {
    if (urlSessionId && user?.user_id) {
      loadExistingSession(urlSessionId);
    }
    // If no URL session, do nothing - wait for first message to create session
  }, [urlSessionId, user?.user_id]);

  // ==================== FETCH FAQs ====================

  /**
   * Fetch all FAQ questions (without answers) when user logs in
   * Store in state to use for suggestions
   * Optimized for performance - only loads question and category
   */
  useEffect(() => {
    const fetchFAQQuestionsData = async () => {
      try {
        if (user?.user_id) {
          const data = await getFAQQuestions();
          if (data && data.faqs) {
            setAllFAQs(data.faqs);
            console.log('✅ FAQ questions loaded:', data.faqs.length);
          }
        }
      } catch (err) {
        console.error('Failed to fetch FAQ questions:', err);
      }
    };

    if (user?.user_id) {
      fetchFAQQuestionsData();
    }
  }, [user?.user_id]);

  // ==================== FETCH WORKFLOWS ====================

  /**
   * Fetch workflow metadata (id, name, description) when user logs in
   * Nodes are fetched only when user selects a specific workflow
   * Optimized for performance - minimal initial data load
   */
  useEffect(() => {
    const fetchWorkflowsData = async () => {
      try {
        if (user?.user_id) {
          const data = await getWorkflowsList();
          if (data && data.workflows) {
            setWorkflows(data.workflows);
            console.log('✅ Workflows loaded:', data.workflows.length);
          }
        }
      } catch (err) {
        console.error('Failed to fetch workflows:', err);
      }
    };

    if (user?.user_id) {
      fetchWorkflowsData();
    }
  }, [user?.user_id]);

  /**
   * Handle workflow selection
   * Fetch nodes from selected workflow
   */
  const handleWorkflowChange = async (e) => {
    const workflowId = parseInt(e.target.value);
    
    if (!workflowId) {
      setSelectedWorkflow(null);
      setWorkflowNodes([]);
      setShowNodeSuggestions(false);
      return;
    }

    try {
      console.log('🔄 Fetching workflow:', workflowId);
      const workflowData = await getWorkflow(workflowId);
      console.log('📦 Workflow data:', workflowData);
      
      if (workflowData && workflowData.workflows_by_pk) {
        const workflow = workflowData.workflows_by_pk;
        console.log('✅ Workflow selected:', workflow.name);
        setSelectedWorkflow(workflow);

        // Fetch nodes using separate query
        console.log('🔄 Fetching nodes for workflow:', workflowId);
        try {
          const nodesData = await getWorkflowNodes(workflowId);
          console.log('📦 Nodes data:', nodesData);
          
          if (nodesData && nodesData.nodes && nodesData.nodes.length > 0) {
            console.log('✅ Nodes loaded:', nodesData.nodes.length);
            console.log('🔗 Node texts:', nodesData.nodes.map(n => n.text));
            setWorkflowNodes(nodesData.nodes);
            setShowNodeSuggestions(true);
          } else {
            console.warn('⚠️ No nodes found in workflow');
            setWorkflowNodes([]);
            setShowNodeSuggestions(false);
          }
        } catch (nodesErr) {
          console.error('❌ Failed to fetch nodes:', nodesErr);
          setError('Failed to load workflow nodes: ' + nodesErr.message);
        }
      } else {
        console.error('❌ No workflow data returned');
        setError('Could not load workflow');
      }
    } catch (err) {
      console.error('❌ Failed to fetch workflow:', err);
      setError('Failed to load workflow: ' + err.message);
    }
  };

  /**
   * Handle node suggestion click
   */
  const handleNodeClick = (nodeText) => {
    console.log('🔗 Node selected:', nodeText);
    setInput(nodeText);
    // Keep node suggestions visible (persistent)
    setShowSuggestions(false);
    // Automatically send the selected node
    sendMessage(nodeText);
  };

  // ==================== WEBSOCKET SETUP ====================

  /**
   * Setup WebSocket connection and handlers
   */
  useEffect(() => {
    if (!useWebSocket) {
      console.log('Mode: REST API 📡');
      // Disconnect if WebSocket was previously connected
      if (wsClient.isConnected()) {
        wsClient.disconnect();
      }
      wsModeRef.current = false;
      return;
    }

    console.log('Mode: WebSocket 🔌');
    wsModeRef.current = true;
    
    // Clear old callbacks before setting up new ones
    wsClient.clearCallbacks();
    
    // Connect to WebSocket
    wsClient.connect('ws://localhost:8000/ws/chat');

    // Handle incoming messages
    wsClient.onMessage((data) => 
      {
      if (data.type === 'processing') {
        console.log('WebSocket: Processing...');
        return;
      }
      
      if (data.type === 'response') {
        // Check if this is a RAG task (async processing)
        if (data.task_id && data.status === 'processing') {
          // Show waiting message for RAG task
          setMessages(prev => [...prev, {
            type: 'bot',
            text: data.message || 'Processing your question with LLM...',
            source: 'rag',
            task_id: data.task_id,
            isLoading: true
          }]);
          return;
        }
        
        setLoading(false);
        const { botText, answers, targetNodes, source } = parseApiResponse(data);
        setMessages(prev => [...prev, {
          type: 'bot',
          text: botText,
          answers: answers,
          targetNodes: targetNodes,
          source: source,
        }]);
      }
      
      if (data.type === 'result') {
        // RAG task completed
        setLoading(false);
        setMessages(prev => {
          // Find and update the loading message
          return prev.map(msg => {
            if (msg.task_id === data.task_id) {
              return {                                                                                    
                ...msg,
                text: data.answer,
                isLoading: false
              };
            }
            return msg;
          });
        });
      }
    });

    // Handle connection status
    wsClient.onStatus((status) => {
      setWsStatus(status);
      if (status === 'error' || status === 'failed') {
        console.log('WebSocket: Failed, switching to REST API ⚠️');
        setError('WebSocket connection failed. Switching to REST API.');
        setUseWebSocket(false);
      }
    });

    // Cleanup only when explicitly disabling WebSocket (not on route change)
    return () => {
      // Only disconnect if user explicitly disabled WebSocket
      if (!wsModeRef.current) {
        wsClient.disconnect();
      }
    };
  }, [useWebSocket]);

  // ==================== MESSAGE HANDLING ====================

  /**
   * Filter FAQ questions based on user input
   * Shows matching questions as suggestions
   */
  const filterFAQSuggestions = (searchText) => {
    if (!searchText.trim() || searchText.length < 2) {
      setFaqSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const searchLower = searchText.toLowerCase();
    const filtered = allFAQs.filter(faq =>
      faq.question.toLowerCase().includes(searchLower)
    );

    setFaqSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  };

  /**
   * Handle input change - filter suggestions
   */
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    filterFAQSuggestions(text);
  };

  /**
   * Handle suggestion selection
   */
  const handleSuggestionClick = (faqQuestion) => {
    setInput(faqQuestion);
    setShowSuggestions(false);
    // Automatically send the selected suggestion
    sendMessage(faqQuestion);
  };

  /**
   * Handle input blur - close suggestions
   */
  const handleInputBlur = () => {
    // Delay closing to allow suggestion click to register
    setTimeout(() => {
      setShowSuggestions(false);
      // Don't close node suggestions as they are persistent
    }, 200);
  };

  /**
   * Main message sending logic
   * 1. Add user message to UI immediately
   * 2. Create session if needed
   * 3. Send to backend (via WebSocket or REST)
   * 4. Add bot response
   */
  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    if (!user?.user_id) {
      setError('User not authenticated');
      return;
    }

    // Step 1: Add user message to UI immediately
    setMessages(prev => [...prev, { type: 'user', text: messageText }]);
    setInput('');
    setError(null);
    setLoading(true);
    
    try {
      // Step 2: Ensure we have a session
      let currentSessionId = sessionId;
      if (!currentSessionId) {
        currentSessionId = await createNewSession();
        if (currentSessionId) {
          // Update URL to persist session
          router.push(`/?continue=${currentSessionId}`);
        } else {
          throw new Error('Failed to create session');
        }
      }

      // Step 3: Send message to backend
      if (useWebSocket && wsClient.isConnected())
         {
        console.log('Sending via WebSocket 🔌');
        // Use WebSocket
        wsClient.sendMessage(messageText, user.user_id, String(currentSessionId));
        // Response will be handled in WebSocket onMessage callback
        }
       else
         {
        console.log('Sending via REST API 📡');
        // Use REST API (existing logic)
        const response = await sendDirectChatMessage(messageText, currentSessionId, user.user_id);
        
        // Step 4: Parse response and add to UI
        const { botText, answers, targetNodes, source } = parseApiResponse(response);
        setMessages(prev => [...prev, {
          type: 'bot',
          text: botText,
          answers: answers,
          targetNodes: targetNodes,
          source: source,
        }]);
        setLoading(false);
      }
    } catch (err) {
      const errorText = err instanceof Error ? err.message : 'Failed to get response';
      setError(errorText);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `Error: ${errorText}`,
      }]);
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  /**
   * Handle transcribed speech from SpeechRecorder
   * Sets the input field with transcribed text
   * User must manually click Send button to submit
   */
  const handleSpeechTranscribed = (transcribedText) => {
    setInput(transcribedText);
    // DO NOT auto-send - user must manually click Send button
    // If you want auto-send, uncomment the line below
    // sendMessage(transcribedText);
  };

  const handleOptionClick = (optionText) => {
    sendMessage(optionText);
  };

  // ==================== SESSION MANAGEMENT ====================

  /**
   * Start a completely new chat
   * Clear URL, session ID, and all messages
   */
  const handleNewChat = () => {
    router.push('/');
    setMessages([]);
    setError(null);
    setSessionId(null);
    setSessionTitle('New Chat');
    setInput('');
  };

  const handleEditTitle = () => {
    setEditTitleValue(sessionTitle);
    setIsEditingTitle(true);
  };

  const handleSaveTitle = async () => {
    if (!editTitleValue.trim() || !sessionId) return;
    
    try {
      await updateSession(sessionId, editTitleValue, 'General');
      setSessionTitle(editTitleValue);
      setIsEditingTitle(false);
    } catch (err) {
      console.error('Failed to update session title:', err);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingTitle(false);
    setEditTitleValue('');
  };

  return (
    <div className="chatbox-container">
      <div className="chat-header">
        <div className="header-top">
          <div className="session-title-container">
            {isEditingTitle ? (
              <div className="title-edit-group">
                <input
                  type="text"
                  value={editTitleValue}
                  onChange={(e) => setEditTitleValue(e.target.value)}
                  className="title-edit-input"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveTitle()}
                />
                <button onClick={handleSaveTitle} className="save-title-btn" title="Save">
                  ✓
                </button>
                <button onClick={handleCancelEdit} className="cancel-title-btn" title="Cancel">
                  ✕
                </button>
              </div>
            ) : (
              <div className="title-display-group">
                <h2>💬 {sessionTitle}</h2>
                <button onClick={handleEditTitle} className="edit-title-btn" title="Rename session">
                  ✏️
                </button>
              </div>
            )}
          </div>
          <div className="header-actions">
            <button 
              onClick={() => {
                const newState = !useWebSocket;
                console.log(newState ? 'Switching to WebSocket 🔌' : 'Switching to REST API 📡');
                setUseWebSocket(newState);
              }} 
              className={`ws-toggle-btn ${useWebSocket ? 'active' : ''}`}
              title={useWebSocket ? 'Using WebSocket (Real-time)' : 'Using REST API'}
            >
              {useWebSocket ? '🔌 WS' : '📡 API'}
            </button>
            <button onClick={handleNewChat} className="action-btn" title="New conversation">
              ➕
            </button>
          </div>
        </div>
        <p className="subtitle">
          Chat powered by knowledge graph and AI 
          {useWebSocket && (
            <span className={`ws-status ws-status-${wsStatus}`}>
              {wsStatus === 'connected' ? ' • WebSocket Connected' : 
               wsStatus === 'connecting' ? ' • Connecting...' : 
               wsStatus === 'error' ? ' • Connection Error' : ''}
            </span>
          )}
        </p>
      </div>

      <div className="chat-window">
        {workflows.length > 0 && (
          <div className="workflow-selector-area">
            <div className="workflow-selector-header">
              <h3>📊 Select a Workflow</h3>
            </div>
            <div className="workflow-cards-grid">
              {workflows.map(workflow => (
                <div
                  key={workflow.id}
                  className={`workflow-card ${selectedWorkflow?.id === workflow.id ? 'selected' : ''}`}
                  onClick={() => handleWorkflowChange({ target: { value: workflow.id } })}
                >
                  <div className="workflow-card-icon">📋</div>
                  <div className="workflow-card-content">
                    <h4>{workflow.name}</h4>
                    {workflow.description && <p>{workflow.description}</p>}
                  </div>
                  {selectedWorkflow?.id === workflow.id && <div className="workflow-card-checkmark">✓</div>}
                </div>
              ))}
            </div>
          </div>
        )}
        {showNodeSuggestions && workflowNodes.length > 0 && (
          <div className="node-suggestions-persistent">
            <div className="suggestions-label">🔗 {selectedWorkflow?.name} - Node Options:</div>
            <div className="suggestions-list">
              {workflowNodes.map((node, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleNodeClick(node.text)}
                >
                  <span className="suggestion-text">{node.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {messages.length === 0 ? (
          <div className="empty-state">
            <h2>💬 Start a New Conversation</h2>
            <p>Ask me anything and I'll search through your knowledge base</p>
            <div className="tips">
              <h4>💡 Tips:</h4>
              <ul>
                <li>Ask questions about topics in your knowledge base</li>
                <li>I'll search through documents and connected information</li>
                <li>Click on responses to explore related information</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((msg, index) => (
              <Message 
                key={index} 
                type={msg.type} 
                text={msg.text} 
                answers={msg.answers}
                targetNodes={msg.targetNodes}
                onOptionClick={handleOptionClick}
                source={msg.source}
                isHistorical={msg.isHistorical}
              />
            ))}
          </div>
        )}
      </div>

      <div className="chat-input-area">
        {error && <div className="error-message">⚠️ {error}</div>}
        <form onSubmit={handleSend} className="chat-form">
          {showSuggestions && faqSuggestions.length > 0 && (
            <div className="faq-suggestions">
              <div className="suggestions-label">💡 Suggested Questions:</div>
              <div className="suggestions-list">
                {faqSuggestions.slice(0, 5).map((faq, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(faq.question)}
                  >
                    <span className="suggestion-text">{faq.question}</span>
                    {faq.category && <span className="suggestion-category">{faq.category}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              disabled={loading}
              autoFocus
            />
            <button type="submit" disabled={loading} className="send-btn">
              {loading ? '⏳' : '➤'}
            </button>
            <SpeechRecorder 
            onTranscribe={handleSpeechTranscribed}
            disabled={loading}
          />
          </div>
        </form>
      </div>

      <style jsx>{`
        .chatbox-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          background-color: #fff;
        }

        .chat-header {
          padding: 16px 24px;
          border-bottom: 1px solid #e5e5e5;
          background-color: #f9f9f9;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .session-title-container {
          flex: 1;
        }

        .title-display-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .title-display-group h2 {
          margin: 0;
          font-size: 20px;
          color: #333;
        }

        .edit-title-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .edit-title-btn:hover {
          background: #2980b9;
          transform: scale(1.05);
        }

        .title-edit-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .title-edit-input {
          font-size: 18px;
          padding: 8px 12px;
          border: 2px solid #3498db;
          border-radius: 6px;
          font-weight: 500;
          font-family: inherit;
          flex: 1;
          max-width: 400px;
        }

        .title-edit-input:focus {
          outline: none;
          border-color: #2980b9;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }

        .save-title-btn,
        .cancel-title-btn {
          padding: 8px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .save-title-btn {
          background: #27ae60;
          color: white;
        }

        .save-title-btn:hover {
          background: #229954;
        }

        .cancel-title-btn {
          background: #e74c3c;
          color: white;
        }

        .cancel-title-btn:hover {
          background: #c0392b;
        }

        .title-area {
          flex: 1;
        }

        .chat-header h2 {
          margin: 0;
          font-size: 20px;
          color: #333;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .chat-header h2:hover {
          background-color: #f0f0f0;
        }

        .title-edit input {
          font-size: 20px;
          padding: 4px 8px;
          border: 2px solid #007bff;
          border-radius: 4px;
          font-weight: 500;
          font-family: inherit;
        }

        .title-edit input:focus {
          outline: none;
          border-color: #0056b3;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 6px 10px;
          background-color: transparent;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background-color: #f0f0f0;
          border-color: #999;
        }

        .ws-toggle-btn {
          padding: 6px 12px;
          background-color: transparent;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .ws-toggle-btn:hover {
          background-color: #f0f0f0;
          border-color: #999;
        }

        .ws-toggle-btn.active {
          background-color: #27ae60;
          color: white;
          border-color: #27ae60;
        }

        .ws-toggle-btn.active:hover {
          background-color: #229954;
          border-color: #229954;
        }

        .ws-status {
          font-size: 11px;
          margin-left: 8px;
        }

        .ws-status-connected {
          color: #27ae60;
        }

        .ws-status-connecting {
          color: #f39c12;
        }

        .ws-status-error {
          color: #e74c3c;
        }

        .workflow-selector-area {
          padding: 16px 0;
          margin-bottom: 16px;
          border-bottom: 1px solid #e5e5e5;
          background-color: transparent;
        }

        .workflow-selector-header {
          margin-bottom: 16px;
        }

        .workflow-selector-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .workflow-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
        }

        .workflow-card {
          background: white;
          border: 2px solid #e5e5e5;
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          position: relative;
        }

        .workflow-card:hover {
          border-color: #007bff;
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
          transform: translateY(-2px);
        }

        .workflow-card.selected {
          border-color: #007bff;
          background: #e3f2fd;
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.25);
        }

        .workflow-card-icon {
          font-size: 32px;
          min-width: 40px;
          text-align: center;
          flex-shrink: 0;
        }

        .workflow-card-content {
          flex: 1;
          min-width: 0;
        }

        .workflow-card-content h4 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .workflow-card-content p {
          margin: 0;
          font-size: 12px;
          color: #999;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .workflow-card-checkmark {
          font-size: 20px;
          color: #007bff;
          font-weight: bold;
          flex-shrink: 0;
        }

        .node-suggestions-persistent {
          padding: 12px 24px;
          background-color: #e6f2ff;
          border-bottom: 1px solid #b3d9ff;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            height: auto;
            transform: translateY(0);
          }
        }

        .node-suggestions-persistent .suggestions-label {
          font-size: 12px;
          font-weight: 600;
          color: #0066cc;
          margin: 0 0 10px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .node-suggestions-persistent .suggestions-list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 8px;
          max-height: auto;
          overflow-y: visible;
        }

        .node-suggestions-persistent .suggestion-item {
          padding: 8px 12px;
          background-color: white;
          border: 1px solid #b3d9ff;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          transition: all 0.2s ease;
          font-size: 13px;
        }

        .node-suggestions-persistent .suggestion-item:hover {
          background-color: #7fbfff;
          border-color: #0066cc;
          box-shadow: 0 2px 8px rgba(0, 102, 204, 0.25);
          transform: translateY(-2px);
        }

        .node-suggestions-persistent .suggestion-text {
          font-size: 13px;
          color: #333;
          text-align: left;
        }

        .chat-header .subtitle {
          margin: 0;
          font-size: 12px;
          color: #999;
        }

        .chat-window {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          padding: 24px;
          gap: 16px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #999;
          text-align: center;
        }

        .empty-state h2 {
          font-size: 28px;
          margin: 0 0 12px 0;
          color: #333;
        }

        .empty-state p {
          font-size: 16px;
          margin: 0 0 24px 0;
          color: #999;
        }

        .tips {
          margin-top: 20px;
          text-align: left;
          display: inline-block;
          background-color: #f5f5f5;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid #007bff;
        }

        .tips h4 {
          margin: 0 0 12px 0;
          color: #333;
        }

        .tips ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .tips li {
          margin-bottom: 8px;
          color: #666;
          font-size: 14px;
        }

        .tips li:last-child {
          margin-bottom: 0;
        }

        .messages-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chat-input-area {
          padding: 16px 24px 24px 24px;
          border-top: 1px solid #e5e5e5;
          background-color: #fff;
        }

        .chat-form {
          width: 100%;
        }

        .input-wrapper {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        input[type="text"] {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 15px;
          font-family: inherit;
          background-color: #fff;
          color: #333;
          transition: border-color 0.2s ease;
        }

        input[type="text"]:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        input[type="text"]:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        .send-btn {
          padding: 10px 16px;
          background-color: transparent;
          color: #007bff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          min-height: 40px;
        }

        .send-btn:hover:not(:disabled) {
          background-color: #007bff;
          color: white;
          border-color: #007bff;
        }

        .send-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-message {
          color: #d32f2f;
          background-color: #ffebee;
          border: 1px solid #ffcdd2;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .faq-suggestions {
          margin-bottom: 12px;
          padding: 12px;
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          animation: slideUp 0.2s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .suggestions-label {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .suggestions-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 300px;
          overflow-y: auto;
        }

        .suggestion-item {
          padding: 10px 12px;
          background-color: white;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
        }

        .suggestion-item:hover {
          background-color: #e3f2fd;
          border-color: #007bff;
          box-shadow: 0 2px 8px rgba(0, 123, 255, 0.15);
          transform: translateX(4px);
        }

        .suggestion-text {
          font-size: 14px;
          color: #333;
          flex: 1;
          text-align: left;
        }

        .suggestion-category {
          font-size: 11px;
          background-color: #007bff;
          color: white;
          padding: 3px 8px;
          border-radius: 4px;
          margin-left: 8px;
          white-space: nowrap;
        }

        .node-suggestions {
          margin-bottom: 12px;
          padding: 12px;
          background-color: #f0f8ff;
          border: 1px solid #b3d9ff;
          border-radius: 8px;
          animation: slideUp 0.2s ease-out;
        }

        .node-suggestions .suggestions-label {
          color: #0066cc;
        }

        .node-suggestions .suggestion-item {
          border-color: #b3d9ff;
          background-color: white;
        }

        .node-suggestions .suggestion-item:hover {
          background-color: #e6f2ff;
          border-color: #0066cc;
          box-shadow: 0 2px 8px rgba(0, 102, 204, 0.15);
        }

        @media (max-width: 768px) {
          .chat-window {
            padding: 16px;
          }

          .chat-input-area {
            padding: 12px 16px 16px 16px;
          }

          .header-actions {
            gap: 4px;
          }

          .workflow-selector-area {
            padding: 12px 16px;
          }

          .workflow-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
