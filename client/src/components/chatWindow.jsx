import React, { useState, useEffect } from 'react';
import { createNewSession, sendMessageAPI } from '../services/api';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Create a new chat session on mount
    const initChatSession = async () => {
      const { sessionId } = await createNewSession();
      setSessionId(sessionId);
    };
    initChatSession();
  }, []);

  async function handleSend() {
    if (!input.trim()) return;
    const response = await sendMessageAPI(sessionId, input);
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: input },
      { role: 'assistant', content: response.data.response },
    ]);
    setInput('');
  }

  return (
    <div style={{ flex: '1', border: '1px solid #ccc', padding: '1rem' }}>
      <div>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: '0.5rem 0' }}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
