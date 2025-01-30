// src/components/ChatWindow.jsx
import React, { useRef, useEffect } from "react";
import TextAreaAutoSize from 'react-textarea-autosize';

function ChatWindow({ messages, onSendMessage }) {
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const content = inputRef.current.value.trim();
    if (!content) return;
    onSendMessage(content);
    inputRef.current.value = "";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-100"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 p-2 rounded ${
              msg.role === "assistant"
                ? "bg-white text-gray-800 self-start"
                : "bg-green-500 text-white self-end"
            } max-w-prose`}
            style={{ marginLeft: msg.role === "assistant" ? 0 : "auto" }}
          >
            <strong>{msg.role.toUpperCase()}:</strong> {msg.content}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="px-4 bg-gray-50 border-t border-gray-300 shadow-sm">
        <TextAreaAutoSize
          ref={inputRef}
          className="w-full border border-gray-300 rounded p-2 resize-none focus:outline-none focus:border-blue-500"
          minRows={1}
          maxRows = {10}
          placeholder="Type your message..."
          onKeyDown={handleKeyDown}
        ></TextAreaAutoSize>
        <div className="text-right mt-2">
          <button
            onClick={handleSend}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
