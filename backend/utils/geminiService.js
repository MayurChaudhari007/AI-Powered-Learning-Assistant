
// ----------------------------------------------------------------------------------------
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL_NAME = "gemini-2.5-flash-lite";

/**
 * Helper: Sleep/Delay function
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Helper: Retry logic with Exponential Backoff and Jitter
 * @param {Function} fn - The async function to retry
 * @param {number} retries - Maximum number of retries
 */
const withRetry = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      const isRateLimit =
        error.message?.includes("429") || error.status === 429;

      if (isRateLimit && i < retries - 1) {
        // Exponential backoff: 2s, 4s, 8s... + random jitter
        const waitTime = Math.pow(2, i) * 1000 + Math.random() * 1000;
        console.warn(
          `⚠️ Rate limit hit. Retrying in ${Math.round(waitTime)}ms... (Attempt ${i + 1}/${retries})`,
        );
        await sleep(waitTime);
        continue;
      }
      throw error;
    }
  }
};

// 1. General Content (Summaries/Quizzes/Flashcards)
const generateContent = async (prompt) => {
  return await withRetry(async () => {
    try {
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini Content Error:", error.message);
      throw error;
    }
  });
};

// 2. Specialized Chat (Context-Aware)
const generateChatResponse = async (context, question, historyString) => {
  return await withRetry(async () => {
    try {
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const prompt = `
                SYSTEM: You are a concise Learning Assistant. 
                Answer ONLY using the provided document context. 
                Keep answers strictly to 2-3 lines.

                DOCUMENT CONTEXT:
                ${context.substring(0, 20000)}

                CONVERSATION HISTORY:
                ${historyString || "No previous history."}

                USER QUESTION: 
                ${question}

                ASSISTANT REPLY:
            `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini Chat Error:", error.message);
      throw error;
    }
  });
};

module.exports = { generateContent, generateChatResponse };
