"""
Workflow Management Routes
Handles workflows, nodes, and edges with admin-only create/update/delete operations
"""

from fastapi import APIRouter, HTTPException, status, Depends
from schemas import WorkflowCreate, WorkflowResponse, NodeBase, NodeCreate, EdgeBase, EdgeCreate
from middleware.auth import get_current_user
from middleware.role_check import verify_admin_role
from services import hasura_client
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/workflows", tags=["Workflows"])


# ==================== WORKFLOWS ====================

@router.get("", response_model=dict)
async def get_workflows():
    """Get all workflows (public endpoint - no auth required)"""
    try:
        workflows = await hasura_client.get_workflows()
        return {"success": True, "workflows": workflows or []}
    except Exception as e:
        logger.error(f"Error fetching workflows: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching workflows: {str(e)}"
        )


@router.get("/{workflow_id}", response_model=dict)
async def get_workflow(workflow_id: int):
    """Get a specific workflow with all its nodes and edges (public endpoint)"""
    try:
        workflow = await hasura_client.get_workflow(workflow_id)
        
        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Workflow {workflow_id} not found"
            )
        
        # Get nodes and edges
        nodes = await hasura_client.get_nodes(workflow_id)
        edges = await hasura_client.get_edges(workflow_id)
        
        workflow["nodes"] = nodes
        workflow["edges"] = edges
        
        return {
            "success": True,
            "workflow": workflow
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching workflow {workflow_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching workflow: {str(e)}"
        )


@router.post("", response_model=dict)
async def create_workflow(
    workflow: WorkflowCreate,
    user_id: int = Depends(get_current_user)
):
    """Create a new workflow (admin only)"""
    try:
        # Verify user is admin
        user = await verify_admin_role(user_id)
        
        # Create workflow
        new_workflow = await hasura_client.create_workflow(
            name=workflow.name,
            description=workflow.description or ""
        )
        
        logger.info(f"✅ User {user_id} (admin) created workflow: {workflow.name}")
        
        return {
            "success": True,
            "message": "Workflow created successfully",
            "workflow": new_workflow
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating workflow: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating workflow: {str(e)}"
        )


@router.put("/{workflow_id}", response_model=dict)
async def update_workflow(
    workflow_id: int,
    workflow: WorkflowCreate,
    user_id: int = Depends(get_current_user)
):
    """Update a workflow (admin only)"""
    try:
        # Verify user is admin
        user = await verify_admin_role(user_id)
        
        # Check if workflow exists
        existing_workflow = await hasura_client.get_workflow(workflow_id)
        if not existing_workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Workflow {workflow_id} not found"
            )
        
        # Update workflow
        updated_workflow = await hasura_client.update_workflow(
            workflow_id,
            name=workflow.name,
            description=workflow.description or ""
        )
        
        logger.info(f"✅ User {user_id} (admin) updated workflow: {workflow.name}")
        
        return {
            "success": True,
            "message": "Workflow updated successfully",
            "workflow": updated_workflow
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating workflow: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating workflow: {str(e)}"
        )


@router.delete("/{workflow_id}", response_model=dict)
async def delete_workflow(
    workflow_id: int,
    user_id: int = Depends(get_current_user)
):
    """Delete a workflow and all its nodes and edges (admin only)"""
    try:
        # Verify user is admin
        user = await verify_admin_role(user_id)
        
        # Check if workflow exists
        existing_workflow = await hasura_client.get_workflow(workflow_id)
        if not existing_workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Workflow {workflow_id} not found"
            )
        
        # Delete workflow
        deleted_workflow = await hasura_client.delete_workflow(workflow_id)
        
        logger.info(f"✅ User {user_id} (admin) deleted workflow {workflow_id}")
        
        return {
            "success": True,
            "message": "Workflow deleted successfully",
            "workflow": deleted_workflow
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting workflow: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting workflow: {str(e)}"
        )


# ==================== NODES ====================

@router.get("/{workflow_id}/nodes", response_model=dict)
async def get_nodes(workflow_id: int):
    """Get all nodes for a workflow (public endpoint)"""
    try:
        # Verify workflow exists
        workflow = await hasura_client.get_workflow(workflow_id)
        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Workflow {workflow_id} not found"
            )
        
        nodes = await hasura_client.get_nodes(workflow_id)
        
        return {
            "success": True,
            "nodes": nodes or []
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching nodes for workflow {workflow_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching nodes: {str(e)}"
        )


@router.post("/{workflow_id}/nodes", response_model=dict)
async def create_node(
    workflow_id: int,
    node: NodeCreate,
    user_id: int = Depends(get_current_user)
):
    """Create a new node in a workflow (admin only)"""
    try:
        # Verify user is admin
        user = await verify_admin_role(user_id)
        
        # Verify workflow exists
        workflow = await hasura_client.get_workflow(workflow_id)
        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Workflow {workflow_id} not found"
            )
        
        # Create node
        new_node = await hasura_client.create_node(
            workflow_id=workflow_id,
            text=node.text,
            response=node.response
        )
        
        logger.info(f"✅ User {user_id} (admin) created node in workflow {workflow_id}")
        
        return {
            "success": True,
            "message": "Node created successfully",
            "node": new_node
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating node: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating node: {str(e)}"
        )


@router.put("/nodes/{node_id}", response_model=dict)
async def update_node(
    node_id: int,
    node: dict,
    user_id: int = Depends(get_current_user)
):
    """Update a node (admin only)"""
    try:
        # Verify user is admin
        user = await verify_admin_role(user_id)
        
        # Check if node exists
        existing_node = await hasura_client.get_node_by_id(node_id)
        if not existing_node:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Node {node_id} not found"
            )
        
        # Update node
        updated_node = await hasura_client.update_node(
            node_id,
            text=node.get("text", existing_node["text"]),
            response=node.get("response", existing_node.get("response"))
        )
        
        logger.info(f"✅ User {user_id} (admin) updated node {node_id}")
        
        return {
            "success": True,
            "message": "Node updated successfully",
            "node": updated_node
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating node: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating node: {str(e)}"
        )


@router.delete("/nodes/{node_id}", response_model=dict)
async def delete_node(
    node_id: int,
    user_id: int = Depends(get_current_user)
):
    """Delete a node (admin only)"""
    try:
        # Verify user is admin
        user = await verify_admin_role(user_id)
        
        # Check if node exists
        existing_node = await hasura_client.get_node_by_id(node_id)
        if not existing_node:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Node {node_id} not found"
            )
        
        # Delete node
        deleted_node = await hasura_client.delete_node(node_id)
        
        logger.info(f"✅ User {user_id} (admin) deleted node {node_id}")
        
        return {
            "success": True,
            "message": "Node deleted successfully",
            "node": deleted_node
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting node: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting node: {str(e)}"
        )


# ==================== EDGES ====================

@router.get("/{workflow_id}/edges", response_model=dict)
async def get_edges(workflow_id: int):
    """Get all edges for a workflow (public endpoint)"""
    try:
        # Verify workflow exists
        workflow = await hasura_client.get_workflow(workflow_id)
        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Workflow {workflow_id} not found"
            )
        
        edges = await hasura_client.get_edges(workflow_id)
        
        return {
            "success": True,
            "edges": edges or []
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching edges for workflow {workflow_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching edges: {str(e)}"
        )


@router.post("/{workflow_id}/edges", response_model=dict)
async def create_edge(
    workflow_id: int,
    edge: EdgeCreate,
    user_id: int = Depends(get_current_user)
):
    """Create a new edge in a workflow (admin only)"""
    try:
        # Verify user is admin
        user = await verify_admin_role(user_id)
        
        # Verify workflow exists
        workflow = await hasura_client.get_workflow(workflow_id)
        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Workflow {workflow_id} not found"
            )
        
        # Verify both nodes exist
        source_node = await hasura_client.get_node_by_id(edge.source_node_id)
        if not source_node:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Source node {edge.source_node_id} not found"
            )
        
        target_node = await hasura_client.get_node_by_id(edge.target_node_id)
        if not target_node:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Target node {edge.target_node_id} not found"
            )
        
        # Create edge
        new_edge = await hasura_client.create_edge(
            workflow_id=workflow_id,
            source_node_id=edge.source_node_id,
            target_node_id=edge.target_node_id
        )
        
        logger.info(f"✅ User {user_id} (admin) created edge in workflow {workflow_id}")
        
        return {
            "success": True,
            "message": "Edge created successfully",
            "edge": new_edge
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating edge: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating edge: {str(e)}"
        )


@router.delete("/edges/{edge_id}", response_model=dict)
async def delete_edge(
    edge_id: int,
    user_id: int = Depends(get_current_user)
):
    """Delete an edge (admin only)"""
    try:
        # Verify user is admin
        user = await verify_admin_role(user_id)
        
        # Delete edge
        deleted_edge = await hasura_client.delete_edge(edge_id)
        
        if not deleted_edge:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Edge {edge_id} not found"
            )
        
        logger.info(f"✅ User {user_id} (admin) deleted edge {edge_id}")
        
        return {
            "success": True,
            "message": "Edge deleted successfully",
            "edge": deleted_edge
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting edge: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting edge: {str(e)}"
        )
