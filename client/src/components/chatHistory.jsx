import React, { useEffect, useState } from 'react';
// You’d have an API call to fetch all sessions, etc.
function ChatHistory() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // In production, fetch the list of existing chat sessions from your server
    // setSessions(responseFromServer);
  }, []);

  return (
    <div style={{ width: '200px', border: '1px solid #ccc', padding: '1rem' }}>
      <h3>Chat History</h3>
      <ul>
        {sessions.map((session) => (
          <li key={session._id}>
            Chat {session._id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatHistory;
