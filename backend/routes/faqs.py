"""
FAQ Management Routes
Handles FAQ operations with admin-only create/update/delete operations
"""

from fastapi import APIRouter, HTTPException, status, Depends, Query
from schemas import FAQCreate, FAQUpdate, FAQResponse
from middleware.auth import get_current_user
from middleware.role_check import verify_admin_role
from services import hasura_client
import logging
from typing import Optional

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/faqs", tags=["FAQs"])


@router.get("", response_model=dict)
async def get_faqs(category: Optional[str] = Query(None)):
    """Get all FAQs, optionally filtered by category (public endpoint)"""
    try:
        faqs = await hasura_client.get_faqs(category=category)
        
        return {
            "success": True,
            "faqs": faqs or []
        }
    except Exception as e:
        logger.error(f"Error fetching FAQs: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching FAQs: {str(e)}"
        )


@router.get("/questions", response_model=dict)
async def get_faq_questions():
    """Get only FAQ questions for suggestions (public endpoint - optimized for performance)"""
    try:
        faqs = await hasura_client.get_faq_questions()
        
        return {
            "success": True,
            "faqs": faqs or []
        }
    except Exception as e:
        logger.error(f"Error fetching FAQ questions: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching FAQ questions: {str(e)}"
        )


@router.get("/categories", response_model=dict)
async def get_faq_categories():
    """Get all unique FAQ categories (public endpoint)"""
    try:
        faqs = await hasura_client.get_faq_categories()
        
        # Extract unique categories
        categories = list(set(
            faq.get("category") 
            for faq in (faqs or []) 
            if faq.get("category")
        ))
        
        return {
            "success": True,
            "categories": sorted(categories)
        }
    except Exception as e:
        logger.error(f"Error fetching FAQ categories: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching FAQ categories: {str(e)}"
        )


@router.get("/{faq_id}", response_model=dict)
async def get_faq(faq_id: int):
    """Get a specific FAQ by ID (public endpoint)"""
    try:
        faq = await hasura_client.get_faq_by_id(faq_id)
        
        if not faq:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"FAQ {faq_id} not found"
            )
        
        return {
            "success": True,
            "faq": faq
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching FAQ {faq_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching FAQ: {str(e)}"
        )


@router.post("", response_model=dict)
async def create_faq(
    faq: FAQCreate,
    user_id: int = Depends(get_current_user)
):
    """Create a new FAQ (admin only)"""
    try:
        # Verify user is admin
        user = await verify_admin_role(user_id)
        
        # Create FAQ
        new_faq = await hasura_client.create_faq(
            question=faq.question,
            answer=faq.answer,
            category=faq.category
        )
        
        logger.info(f"✅ User {user_id} (admin) created FAQ: {faq.question[:50]}...")
        
        return {
            "success": True,
            "message": "FAQ created successfully",
            "faq": new_faq
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating FAQ: {str(e)}")
        if "duplicate" in str(e).lower() or "unique" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This question already exists"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating FAQ: {str(e)}"
        )


@router.put("/{faq_id}", response_model=dict)
async def update_faq(
    faq_id: int,
    faq: FAQUpdate,
    user_id: int = Depends(get_current_user)
):
    """Update an FAQ (admin only)"""
    try:
        # Verify user is admin
        user = await verify_admin_role(user_id)
        
        # Check if FAQ exists
        existing_faq = await hasura_client.get_faq_by_id(faq_id)
        if not existing_faq:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"FAQ {faq_id} not found"
            )
        
        # Update FAQ with provided fields
        updated_data = {
            "question": faq.question or existing_faq.get("question"),
            "answer": faq.answer or existing_faq.get("answer"),
            "category": faq.category if faq.category is not None else existing_faq.get("category")
        }
        
        updated_faq = await hasura_client.update_faq(
            faq_id,
            question=updated_data["question"],
            answer=updated_data["answer"],
            category=updated_data["category"]
        )
        
        logger.info(f"✅ User {user_id} (admin) updated FAQ {faq_id}")
        
        return {
            "success": True,
            "message": "FAQ updated successfully",
            "faq": updated_faq
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating FAQ: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating FAQ: {str(e)}"
        )


@router.delete("/{faq_id}", response_model=dict)
async def delete_faq(
    faq_id: int,
    user_id: int = Depends(get_current_user)
):
    """Delete an FAQ (admin only)"""
    try:
        # Verify user is admin
        user = await verify_admin_role(user_id)
        
        # Check if FAQ exists
        existing_faq = await hasura_client.get_faq_by_id(faq_id)
        if not existing_faq:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"FAQ {faq_id} not found"
            )
        
        # Delete FAQ
        deleted_faq = await hasura_client.delete_faq(faq_id)
        
        logger.info(f"✅ User {user_id} (admin) deleted FAQ {faq_id}")
        
        return {
            "success": True,
            "message": "FAQ deleted successfully",
            "faq": deleted_faq
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting FAQ: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting FAQ: {str(e)}"
        )
