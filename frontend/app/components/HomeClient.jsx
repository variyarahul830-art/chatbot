'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, selectRole } from '@/app/store/authSlice';
import Sidebar from './Sidebar';
import ChatBox from './ChatBox';
import GraphBuilderWrapper from './GraphBuilderWrapper';
import PDFUpload from './PDFUpload';
import FAQManagement from './FAQManagement';

export default function HomeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get from Redux
  const auth = useSelector(selectAuth);      // auth : user json 
  const role = useSelector(selectRole);
  
  const continueSessionId = searchParams.get('continue');
  const [activeMode, setActiveMode] = useState('chat');
  const [currentWorkflowId, setCurrentWorkflowId] = useState(null); // not require
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!auth?.token) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [auth?.token, router]);

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>Loading...</div>;
  }

  if (!auth?.token) {
    return null;
  }

  const isAdmin = role === 'admin';
  
  const renderContent = () => {
    // Protected admin routes
    if (!isAdmin && (activeMode === 'builder' || activeMode === 'pdf' || activeMode === 'faq')) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2 style={{ fontSize: '24px', color: '#667eea' }}>🔐 Admin Only</h2>
          <p style={{ fontSize: '16px', color: '#666', textAlign: 'center' }}>
            This feature is only available to administrators.
          </p>
          <button
            onClick={() => setActiveMode('chat')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Go to Chat
          </button>
        </div>
      );
    }

    // Regular content rendering
    switch(activeMode) {
      case 'chat':
        return <ChatBox workflowId={currentWorkflowId} continueSessionId={continueSessionId} />;
      case 'builder':
        return <GraphBuilderWrapper workflowId={currentWorkflowId} onWorkflowChange={setCurrentWorkflowId} />;
      case 'pdf':
        return <PDFUpload />;
      case 'faq':
        return <FAQManagement />;
      default:
        return <ChatBox workflowId={currentWorkflowId} continueSessionId={continueSessionId} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeMode={activeMode} onModeChange={setActiveMode} />

      <main className="main-content">
        {renderContent()}
      </main>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body {
          width: 100%;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          background-color: #fff;
          color: #333;
          overflow-x: hidden;
        }

        #__next {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>

      <style jsx>{`
        .app-container {
          display: flex;
          width: 100%;
          min-height: 100vh;
          background-color: #fff;
        }

        .main-content {
          flex: 1;
          margin-left: 260px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          max-height: 100vh;
          scroll-behavior: smooth;
        }

        /* Scrollbar styling */
        .main-content::-webkit-scrollbar {
          width: 10px;
        }

        .main-content::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .main-content::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 5px;
        }

        .main-content::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        @media (max-width: 768px) {
          .app-container {
            flex-direction: column;
            min-height: auto;
          }

          .main-content {
            margin-left: 0;
            margin-top: 0;
            max-height: none;
          }
        }
      `}</style>
    </div>
  );
}
