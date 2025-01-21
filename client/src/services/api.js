import axios from 'axios';

const API_BASE = 'http://localhost:4000/api/chat';

// Create new session
export async function createNewSession() {
  const { data } = await axios.post(`${API_BASE}/new`);
  return data; // { sessionId: '...' }
}

// Send message to a given session
export async function sendMessageAPI(sessionId, message) {
  return axios.post(`${API_BASE}/${sessionId}`, { message });
}