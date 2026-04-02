/**
 * FAQ API Client Service
 * Handles all FAQ operations through the backend REST API
 * Pattern: Frontend → Backend API → Hasura GraphQL
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Get all FAQs, optionally filtered by category
 */
export async function getFAQs(category = null) {
  try {
    let url = `${API_BASE}/api/faqs`;
    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch FAQs");
    }

    return {
      faqs: result.faqs || [],
    };
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw error;
  }
}

/**
 * Get only FAQ questions for suggestions (optimized for performance)
 */
export async function getFAQQuestions() {
  try {
    const response = await fetch(`${API_BASE}/api/faqs/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch FAQ questions");
    }

    return {
      faqs: result.faqs || [],
    };
  } catch (error) {
    console.error("Error fetching FAQ questions:", error);
    throw error;
  }
}

/**
 * Get all unique FAQ categories
 */
export async function getFAQCategories() {
  try {
    const response = await fetch(`${API_BASE}/api/faqs/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch FAQ categories");
    }

    // Convert categories array to the format expected by components
    return {
      faqs: (result.categories || []).map(cat => ({ category: cat })),
    };
  } catch (error) {
    console.error("Error fetching FAQ categories:", error);
    throw error;
  }
}

/**
 * Get a specific FAQ by ID
 */
export async function getFAQ(id) {
  try {
    const response = await fetch(`${API_BASE}/api/faqs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch FAQ");
    }

    return Result.faq;
  } catch (error) {
    console.error(`Error fetching FAQ ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new FAQ (requires authentication and admin role)
 */
export async function createFAQ(question, answer, category = null) {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE}/api/faqs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        question,
        answer,
        category,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to create FAQ");
    }

    return {
      insert_faqs_one: result.faq,
    };
  } catch (error) {
    console.error("Error creating FAQ:", error);
    throw error;
  }
}

/**
 * Update an FAQ (requires authentication and admin role)
 */
export async function updateFAQ(id, question, answer, category) {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE}/api/faqs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        question,
        answer,
        category,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to update FAQ");
    }

    return {
      update_faqs_by_pk: result.faq,
    };
  } catch (error) {
    console.error(`Error updating FAQ ${id}:`, error);
    throw error;
  }
}

/**
 * Delete an FAQ (requires authentication and admin role)
 */
export async function deleteFAQ(id) {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE}/api/faqs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to delete FAQ");
    }

    return {
      delete_faqs_by_pk: result.faq,
    };
  } catch (error) {
    console.error(`Error deleting FAQ ${id}:`, error);
    throw error;
  }
}
