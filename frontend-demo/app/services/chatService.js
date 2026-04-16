/**
 * Chat Service - Handles communication with the backend
 * Sends user messages and receives AI responses
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const sendMessage = async (message) => {
  try {
    // You can adjust this endpoint based on your backend implementation
    // This assumes you have a /api/chat endpoint in your backend
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        // You can add session_id here if needed for tracking
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || data.message || "I couldn't process that request.";
  } catch (error) {
    console.error("Chat service error:", error);
    throw new Error(
      "Failed to connect to the server. Please try again later."
    );
  }
};

/**
 * Local storage management for chat history
 */
export const saveChatHistory = (messages) => {
  try {
    localStorage.setItem("chat_history", JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save chat history:", error);
  }
};

export const loadChatHistory = () => {
  try {
    const history = localStorage.getItem("chat_history");
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Failed to load chat history:", error);
    return [];
  }
};

export const clearChatHistory = () => {
  try {
    localStorage.removeItem("chat_history");
  } catch (error) {
    console.error("Failed to clear chat history:", error);
  }
};
