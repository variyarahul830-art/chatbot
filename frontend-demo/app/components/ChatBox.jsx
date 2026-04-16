"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sendMessage, saveChatHistory, loadChatHistory } from "../services/chatService";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const EXAMPLE_PROMPTS = [
  "What's the refund policy?",
  "How does pricing work?",
  "Tell me about the features",
  "What are the security measures?",
];

export default function ChatBox({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showExamples, setShowExamples] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load chat history on component mount
  useEffect(() => {
    const history = loadChatHistory();
    setMessages(history);
    setShowExamples(history.length === 0);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const messageContent = input.trim();
    setShowExamples(false);

    // Add user message
    const userMessage = {
      id: `${Date.now()}-user`,
      type: "user",
      content: messageContent,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Send message to backend
      const response = await sendMessage(messageContent);

      // Add bot response
      const botMessage = {
        id: `${Date.now()}-bot`,
        type: "bot",
        content: response,
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } catch (error) {
      // Add error message
      const errorMessage = {
        id: `${Date.now()}-error`,
        type: "error",
        content: error.message || "An error occurred. Please try again.",
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example) => {
    setInput(example);
    // Focus input for better UX
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="chat-box">
      <ChatHeader isLoading={isLoading} onClose={onClose} />

      <div className="chat-messages">
        {messages.length === 0 && showExamples ? (
          <motion.div
            className="chat-welcome-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="chat-welcome-content">
              <p className="chat-welcome-title">👋 Welcome!</p>
              <p className="chat-welcome-text">
                Ask me anything about your documents. I'll search through all your uploaded files and provide accurate answers.
              </p>

              <div className="chat-examples">
                <p className="chat-examples-label">Try asking:</p>
                <div className="chat-examples-grid">
                  {EXAMPLE_PROMPTS.map((prompt, idx) => (
                    <motion.button
                      key={idx}
                      className="chat-example-btn"
                      onClick={() => handleExampleClick(prompt)}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {messages.length === 0 && (
              <div className="chat-empty-state">
                <p className="chat-empty-title">Start a conversation</p>
                <p className="chat-empty-text">
                  Ask questions about your documents and get instant answers.
                </p>
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
            </AnimatePresence>
          </>
        )}

        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="message bot"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
            >
              <div className="typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        input={input}
        isLoading={isLoading}
        inputRef={inputRef}
        onChange={setInput}
        onKeyDown={handleKeyDown}
        onSubmit={handleSendMessage}
      />
    </div>
  );
}
