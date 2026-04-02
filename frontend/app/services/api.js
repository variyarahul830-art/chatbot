/**
 * API Service Layer - Chatbot
 * Reusable fetch helpers for chatbot API endpoints
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Get authorization headers with token
 * @returns {Object} Headers with Authorization token
 */
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Get headers for multipart/form-data with token
 * @returns {Object} Headers with Authorization token (without Content-Type for FormData)
 */
function getAuthHeadersForFormData() {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}


// ============== Chat Operations ==============
/**
 * Send a direct chat message with session management
 * @param {string} question - The user's question
 * @param {string} sessionId - Optional session ID for chat history
 * @param {string} userId - Optional user ID for chat history
 * @returns {Promise} Promise with the response
 */
export async function sendDirectChatMessage(question, sessionId = null, userId = null) {
  try {
    const body = { question };
    if (sessionId) body.session_id = String(sessionId);
    if (userId) body.user_id = String(userId);
    
    const response = await fetch(`${API_BASE_URL}/api/chat/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to send message');
  }
}

// ============== PDF Operations ==============

/**
 * Upload a PDF file to MinIO and store metadata in PostgreSQL
 * @param {File} file - The PDF file to upload
 * @param {string} description - Optional description of the PDF
 * @param {string} userId - The user ID (required for auth)
 */
export async function uploadPDF(file, description = '') {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (description) {
      formData.append('description', description);
    }

    const response = await fetch(`${API_BASE_URL}/api/pdf/upload`, {
      method: 'POST',
      headers: getAuthHeadersForFormData(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `Failed to upload PDF: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to upload PDF');
  }
}

/**
 * Get all uploaded PDF documents
 */
export async function getPDFDocuments() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pdf/documents`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to get PDF documents: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get PDF documents');
  }
}

/**
 * Delete a PDF document
 * @param {number} pdfId - The PDF document ID
 */
export async function deletePDF(pdfId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pdf/documents/${pdfId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `Failed to delete PDF: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to delete PDF');
  }
}

/**
 * Download a PDF document directly
 * @param {number} pdfId - The PDF document ID
 */
export async function downloadPDF(pdfId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pdf/documents/${pdfId}/download`, {
      method: 'GET',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `Failed to download PDF: ${response.statusText}`);
    }

    // Get filename from Content-Disposition header
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'document.pdf';
    if (contentDisposition) {
      const matches = /filename="([^"]+)"/.exec(contentDisposition);
      if (matches && matches[1]) {
        filename = matches[1];
      }
    }

    return {
      blob: await response.blob(),
      filename: filename
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to download PDF');
  }
}
