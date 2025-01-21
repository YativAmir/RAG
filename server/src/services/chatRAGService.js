const { getRelevantChunks } = require('./embeddingService');
const { generateCompletion } = require('../utils/openAIClient');

/**
 * handleUserQuery - orchestrates the RAG pipeline
 * @param {string} userQuery - The user’s query message
 * @param {Array} conversationHistory - The entire conversation so far
 */
async function handleUserQuery(userQuery, conversationHistory) {
  // 1. Embed query & retrieve relevant doc chunks
  const relevantChunks = await getRelevantChunks(userQuery);

  // 2. Construct the final prompt
  const systemPrompt = `
    You are an AI assistant. Use the following context to answer the user's question.

    Context:
    ${relevantChunks.join('\n\n')}

    Conversation so far:
    ${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
  `;

  // 3. Call LLM for answer
  const aiResponse = await generateCompletion(systemPrompt, userQuery);

  return aiResponse;
}

module.exports = { handleUserQuery };
