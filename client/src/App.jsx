// src/App.jsx
import React, { useState } from "react";
import ChatWindow from "./components/chatWindow";
import ChatHistory from "./components/chatHistory";

function App() {
  // Simple example state
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  // Create new chat
  const handleNewChat = () => {
    const newSession = {
      id: Date.now(),
      name: `Session at ${new Date().toLocaleTimeString()}`,
      messages: [],
    };
    setSessions((prev) => [...prev, newSession]);
    setMessages([]); // reset messages
    setCurrentSessionId(newSession.id);
  };

  // Select existing chat
  const handleSelectSession = (id) => {
    const session = sessions.find((s) => s.id === id);
    if (session) {
      setCurrentSessionId(session.id);
      setMessages(session.messages);
    }
  };

  // Send a message
  const handleSendMessage = async (content) => {
    const userMsg = { role: "user", content };
    // Add user message to state
    setMessages((prev) => [...prev, userMsg]);

    // If you have a real backend:
    // const response = await sendMessageAPI(currentSessionId, content);
    // For a quick mock, let's just respond with a dummy AI message
    const assistantMsg = { role: "assistant", content: "Hello, I'm a mock AI." };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);

    // Also store messages in the selected session object
    setSessions((prevSessions) =>
      prevSessions.map((session) => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, userMsg, assistantMsg],
          };
        }
        return session;
      })
    );
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar with Chat History */}
      <ChatHistory
        sessions={sessions}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
      />

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* If no session is selected, prompt user to create one */}
        {!currentSessionId ? (
          <div className="m-auto text-center">
            <h2 className="text-xl">No active chat. Create or select a session.</h2>
          </div>
        ) : (
          <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
        )}
      </div>
    </div>
  );
}

export default App;
