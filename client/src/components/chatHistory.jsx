// src/components/ChatHistory.jsx
import React from "react";

function ChatHistory({ sessions, onSelectSession, onNewChat }) {
  return (
    <div className="bg-gray-900 text-white w-64 p-4 flex flex-col">
      <button
        onClick={onNewChat}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mb-4"
      >
        + New Chat
      </button>

      <h2 className="text-lg font-bold mb-2">Chat History</h2>
      <div className="flex-1 overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className="cursor-pointer p-2 hover:bg-gray-700 rounded"
          >
            {session.name || `Chat ${session.id}`}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatHistory;
