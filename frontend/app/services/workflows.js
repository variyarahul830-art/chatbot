/**
 * Workflow API Client Service
 * Handles all workflow, node, and edge operations through the backend REST API
 * Pattern: Frontend → Backend API → Hasura GraphQL
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Get authorization header with JWT token
 */
function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

/**
 * Get all workflows
 */
export async function getWorkflows() {
  try {
    const response = await fetch(`${API_BASE}/api/workflows`, {
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
      throw new Error(result.message || "Failed to fetch workflows");
    }

    return {
      workflows: result.workflows || [],
    };
  } catch (error) {
    console.error("Error fetching workflows:", error);
    throw error;
  }
}

/**
 * Get workflow list with metadata only (optimized for initial load)
 */
export async function getWorkflowsList() {
  return getWorkflows();
}

/**
 * Get a specific workflow with all nodes and edges
 */
export async function getWorkflow(id) {
  try {
    const response = await fetch(`${API_BASE}/api/workflows/${id}`, {
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
      throw new Error(result.message || "Failed to fetch workflow");
    }

    return {
      workflows_by_pk: result.workflow,
    };
  } catch (error) {
    console.error(`Error fetching workflow ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new workflow (requires authentication and admin role)
 */
export async function createWorkflow(name, description = "") {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE}/api/workflows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to create workflow");
    }

    return {
      insert_workflows_one: result.workflow,
    };
  } catch (error) {
    console.error("Error creating workflow:", error);
    throw error;
  }
}

/**
 * Update a workflow (requires authentication and admin role)
 */
export async function updateWorkflow(id, name, description) {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE}/api/workflows/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to update workflow");
    }

    return {
      update_workflows_by_pk: result.workflow,
    };
  } catch (error) {
    console.error(`Error updating workflow ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a workflow (requires authentication and admin role)
 */
export async function deleteWorkflow(id) {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE}/api/workflows/${id}`, {
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
      throw new Error(result.message || "Failed to delete workflow");
    }

    return {
      delete_workflows_by_pk: result.workflow,
    };
  } catch (error) {
    console.error(`Error deleting workflow ${id}:`, error);
    throw error;
  }
}

// ==================== NODES ====================

/**
 * Get all nodes for a workflow
 */
export async function getNodes(workflowId) {
  try {
    const response = await fetch(`${API_BASE}/api/workflows/${workflowId}/nodes`, {
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
      throw new Error(result.message || "Failed to fetch nodes");
    }

    return {
      nodes: result.nodes || [],
    };
  } catch (error) {
    console.error(`Error fetching nodes for workflow ${workflowId}:`, error);
    throw error;
  }
}

/**
 * Get node texts only (optimized query)
 */
export async function getWorkflowNodes(workflowId) {
  return getNodes(workflowId);
}

/**
 * Create a new node in a workflow (requires authentication and admin role)
 */
export async function createNode(workflowId, text, response = null) {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Authentication required");
    }

    const response_obj = await fetch(`${API_BASE}/api/workflows/${workflowId}/nodes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        workflow_id: workflowId,
        text,
        response,
      }),
    });

    if (!response_obj.ok) {
      const error = await response_obj.json();
      throw new Error(error.detail || `HTTP error! status: ${response_obj.status}`);
    }

    const result = await response_obj.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to create node");
    }

    return {
      insert_nodes_one: result.node,
    };
  } catch (error) {
    console.error("Error creating node:", error);
    throw error;
  }
}

/**
 * Update a node (requires authentication and admin role)
 */
export async function updateNode(id, text, response) {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Authentication required");
    }

    const response_obj = await fetch(`${API_BASE}/api/workflows/nodes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
        response,
      }),
    });

    if (!response_obj.ok) {
      const error = await response_obj.json();
      throw new Error(error.detail || `HTTP error! status: ${response_obj.status}`);
    }

    const result = await response_obj.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to update node");
    }

    return {
      update_nodes_by_pk: result.node,
    };
  } catch (error) {
    console.error(`Error updating node ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a node (requires authentication and admin role)
 */
export async function deleteNode(id) {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE}/api/workflows/nodes/${id}`, {
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
      throw new Error(result.message || "Failed to delete node");
    }

    return {
      delete_nodes_by_pk: result.node,
    };
  } catch (error) {
    console.error(`Error deleting node ${id}:`, error);
    throw error;
  }
}

// ==================== EDGES ====================

/**
 * Get all edges for a workflow
 */
export async function getEdges(workflowId) {
  try {
    const response = await fetch(`${API_BASE}/api/workflows/${workflowId}/edges`, {
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
      throw new Error(result.message || "Failed to fetch edges");
    }

    return {
      edges: result.edges || [],
    };
  } catch (error) {
    console.error(`Error fetching edges for workflow ${workflowId}:`, error);
    throw error;
  }
}

/**
 * Create a new edge in a workflow (requires authentication and admin role)
 */
export async function createEdge(workflowId, sourceNodeId, targetNodeId) {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE}/api/workflows/${workflowId}/edges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        source_node_id: sourceNodeId,
        target_node_id: targetNodeId,
        workflow_id: workflowId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || "Failed to create edge");
    }

    return {
      insert_edges_one: result.edge,
    };
  } catch (error) {
    console.error("Error creating edge:", error);
    throw error;
  }
}

/**
 * Delete an edge (requires authentication and admin role)
 */
export async function deleteEdge(id) {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE}/api/workflows/edges/${id}`, {
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
      throw new Error(result.message || "Failed to delete edge");
    }

    return {
      delete_edges_by_pk: result.edge,
    };
  } catch (error) {
    console.error(`Error deleting edge ${id}:`, error);
    throw error;
  }
}
