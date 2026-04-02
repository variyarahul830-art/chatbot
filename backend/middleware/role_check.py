"""
Role-based access control middleware
Verifies user role from database before allowing admin operations
"""
from fastapi import HTTPException, status
from services import hasura_client
import logging

logger = logging.getLogger(__name__)


async def verify_admin_role(user_id: str) -> dict:
    """
    Verify that user has admin role by fetching from database.
    This prevents frontend spoofing.
    
    Args:
        user_id: The user's ID
        
    Returns:
        User object with role
        
    Raises:
        HTTPException: If user not found or not admin
    """
    if not user_id:
        logger.error("No user_id provided for role verification")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User ID is required"
        )
    
    try:
        # Fetch user from database
        user = await hasura_client.get_user(user_id)
        
        if not user:
            logger.warning(f"User {user_id} not found in database")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        user_role = user.get('role', 'user')
        logger.info(f"User {user_id} has role: {user_role}")
        
        if user_role != 'admin':
            logger.warning(f"User {user_id} attempted admin action but has role: {user_role}")
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin access required. Only users with admin role can perform this action."
            )
        
        logger.info(f"✅ Admin verification passed for user {user_id}")
        return user
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error verifying admin role for user {user_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error verifying user role"
        )


async def verify_user_exists(user_id: str) -> dict:
    """
    Verify that user exists (for read operations, any user role allowed)
    
    Args:
        user_id: The user's ID
        
    Returns:
        User object
        
    Raises:
        HTTPException: If user not found
    """
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User ID is required"
        )
    
    try:
        user = await hasura_client.get_user(user_id)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        return user
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error verifying user {user_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error verifying user"
        )
