import React from 'react';
import ChatWindow from './components/chatWindow.jsx';
import ChatHistory from './components/chatHistory.jsx';

function App() {
  return (
    <div>
      <h1>My RAG Chatbot (Vite + React)</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <ChatWindow />
        <ChatHistory />
      </div>
    </div>
  );
}

export default App;
