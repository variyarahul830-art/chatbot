"""
PDF Text Extraction Service using docTR OCR
Extracts text from PDF files with page tracking using docTR (replaces Tesseract)
"""

import io
import fitz
from typing import List, Dict, Any
import logging

from .doctr_ocr import extract_text_from_pdf

logger = logging.getLogger(__name__)


class PDFProcessor:
    """Service for extracting text from PDF files using docTR"""
    
    @staticmethod
    def extract_text_with_pages(pdf_content: bytes) -> List[Dict[str, Any]]:
        """
        Extract text from PDF with page information using docTR OCR
        
        Args:
            pdf_content: Raw PDF file content as bytes
            
        Returns:
            List of dicts with keys: 'text', 'page_number', 'page_count', 'structured_data'
        """
        try:
            logger.info(f"Extracting text from PDF using docTR ({len(pdf_content)} bytes)...")
            
            # Use docTR extraction (handles text PDFs, scanned PDFs, and hybrid)
            pages_data_raw = extract_text_from_pdf(pdf_content)
            
            pages_data = []
            total_pages = len(pages_data_raw)
            logger.info(f"Total pages in PDF: {total_pages}")
            
            for page_result in pages_data_raw:
                try:
                    page_num = page_result.get('page', 1)
                    text = page_result.get('text', '')
                    structured_data = page_result.get('structured_data', {})
                    
                    if text:
                        logger.info(f"✅ Page {page_num}: Successfully extracted via docTR ({len(text)} chars)")
                        pages_data.append({
                            'text': text,
                            'page_number': page_num,
                            'page_count': total_pages,
                            'structured_data': structured_data,
                            'extraction_method': structured_data.get('extraction_method', 'unknown')
                        })
                    else:
                        logger.warning(f"⚠️ No text extracted from page {page_num}")
                except Exception as e:
                    logger.warning(f"Error processing page result: {str(e)}")
                    continue
            
            logger.info(f"✅ Successfully extracted {len(pages_data)} pages with text using docTR")
            return pages_data
            
        except Exception as e:
            logger.error(f"Error processing PDF with docTR: {str(e)}")
            raise Exception(f"Error processing PDF: {str(e)}")
    
    @staticmethod
    def extract_full_text(pdf_content: bytes) -> str:
        """
        Extract full text from PDF as a single string using docTR OCR
        
        Args:
            pdf_content: Raw PDF file content as bytes
            
        Returns:
            Full extracted text
        """
        try:
            logger.info(f"Extracting full text from PDF using docTR...")
            
            # Use docTR extraction (handles text PDFs, scanned PDFs, and hybrid)
            pages_data = extract_text_from_pdf(pdf_content)
            
            full_text = []
            for page_result in pages_data:
                try:
                    page_num = page_result.get('page', 1)
                    text = page_result.get('text', '')
                    extraction_method = page_result.get('structured_data', {}).get('extraction_method', 'unknown')
                    
                    if text:
                        logger.info(f"✅ Page {page_num}: Extracted via {extraction_method} ({len(text)} chars)")
                        full_text.append(f"--- Page {page_num} ({extraction_method}) ---\n{text}")
                except Exception as e:
                    logger.warning(f"Error processing page result: {str(e)}")
                    continue
            
            result = "\n\n".join(full_text)
            logger.info(f"✅ Successfully extracted full text using docTR ({len(result)} chars total)")
            return result
            
        except Exception as e:
            logger.error(f"Error extracting with docTR: {str(e)}")
            raise Exception(f"Error processing PDF with OCR: {str(e)}")
