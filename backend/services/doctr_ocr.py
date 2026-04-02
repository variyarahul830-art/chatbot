# Cleaned: unused code and unnecessary comments removed, essential comments retained.
"""
OCR & PDF Text Extraction Service
Supports: text PDFs, scanned PDFs, hybrid documents, tables, invoices
Uses: PyMuPDF (text extraction) + docTR (OCR) + img2table (table detection from images)
"""
 
import os
import sys
import io
import fitz
import numpy as np
import cv2
import logging
from typing import List, Dict, Optional
from PIL import Image
 
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except:
        pass
 
logging.getLogger('numba').setLevel(logging.WARNING)
logging.getLogger('numba.core.ssa').setLevel(logging.WARNING)
 
_doctr_model: Optional[any] = None
_img2table_extractor: Optional[any] = None
 
def _dataframe_to_markdown(df) -> str:
    """
    Convert a pandas DataFrame to a clean Markdown table.
    Handles NaN values and formats for better readability.
    """
    import pandas as pd
   
    # Replace NaN with empty string for cleaner display
    df_clean = df.fillna('')
   
    # Build Markdown table
    markdown_lines = []
   
    # Header row
    headers = ['Col' + str(i+1) for i in range(len(df_clean.columns))]
    markdown_lines.append('| ' + ' | '.join(headers) + ' |')
   
    # Separator row
    markdown_lines.append('|' + '|'.join(['---' for _ in headers]) + '|')
   
    # Data rows
    for _, row in df_clean.iterrows():
        row_values = [str(val).strip() if val else '-' for val in row]
        markdown_lines.append('| ' + ' | '.join(row_values) + ' |')
   
    return '\n'.join(markdown_lines)
 
 
def get_doctr():
    """Lazy-load docTR OCR model with error handling"""
    global _doctr_model
    if _doctr_model is None:
        try:
            from doctr.models import ocr_predictor
            print("[OCR] Loading docTR model (this may take a minute on first run)...")
            _doctr_model = ocr_predictor(
                det_arch='db_resnet50',
                reco_arch='crnn_vgg16_bn',
                pretrained=True
            )
            print("[OCR] ✓ docTR model loaded successfully")
        except ImportError as e:
            print(f"[OCR] ⚠️  docTR not installed: {e}")
            print("[OCR] Install with: pip install python-doctr[torch]")
            raise ImportError("docTR library not installed. Run: pip install python-doctr[torch]")
        except Exception as e:
            print(f"[OCR] ⚠️  Error loading docTR model: {e}")
            raise
    return _doctr_model
 
 
def get_img2table():
    """Lazy-load img2table for scanned table extraction with docTR"""
    global _img2table_extractor
    if _img2table_extractor is None:
        try:
            from img2table.ocr import DocTR
            print("[OCR] Loading img2table with docTR OCR backend...")
            _img2table_extractor = DocTR()
            print("[OCR] ✓ img2table with docTR loaded successfully")
        except ImportError as e:
            print(f"[OCR] ⚠️  img2table not installed: {e}")
            print("[OCR] Install with: pip install 'img2table[ocr]'")
            return None
        except Exception as e:
            print(f"[OCR] ⚠️  Error loading img2table: {e}")
            return None
    return _img2table_extractor
 
 
def is_scanned_pdf(pdf_bytes: bytes, text_threshold_per_page: int = 100) -> str:
    """
    Detect PDF type: 'scanned', 'text', or 'hybrid'
    Uses per-page threshold for better accuracy
    """
    try:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        total_text = 0
        pages_with_text = 0
        page_count = min(len(doc), 3)  # Check first 3 pages
 
        for idx in range(page_count):
            try:
                text_len = len(doc[idx].get_text().strip())
                total_text += text_len
                if text_len > text_threshold_per_page:
                    pages_with_text += 1
            except:
                pass
 
        doc.close()
       
        avg_chars_per_page = total_text / page_count if page_count > 0 else 0
       
        print(f"[OCR] PDF Text Detection: {total_text} chars total, {avg_chars_per_page:.1f} avg per page across {page_count} pages")
        print(f"[OCR] Pages with substantial text (>{text_threshold_per_page} chars): {pages_with_text}/{page_count}")
       
        # Scanned: very little text per page on average
        if avg_chars_per_page < text_threshold_per_page:
            return 'scanned'
        # Text-based: all pages have substantial text
        elif pages_with_text == page_count and total_text >= 1000 * page_count:
            return 'text'
        # Hybrid: some pages with text, some without, or moderate text
        return 'hybrid'
    except:
        return 'scanned'
 
 
def extract_text_pymupdf(pdf_bytes: bytes) -> List[Dict]:
    """Extract text from text-based PDFs with table and image detection"""
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    pages = []
 
    for i, page in enumerate(doc):
        text = page.get_text("text")
        tables = []
       
        # Detect images on page
        image_list = page.get_images(full=True)
        image_count = len(image_list)
 
        # Try table extraction with better error handling
        try:
            table_data = page.find_tables()
            if table_data and table_data.tables:
                for table in table_data.tables:
                    try:
                        # Get table as DataFrame and format as Markdown
                        df = table.to_pandas()
                        table_md = _dataframe_to_markdown(df)
                        tables.append(table_md)
                    except:
                        pass
        except:
            pass
 
        # Combine text and tables
        full_text = text
        if tables:
            full_text += "\n\n[TABLES FOUND]\n" + "\n\n".join(tables)
       
        # Add image placeholder if images exist
        if image_count > 0:
            full_text += f"\n\n[{image_count} IMAGE(S) ON THIS PAGE]"
 
        pages.append({
            "page": i + 1,
            "text": full_text,
            "structured_data": {
                "has_tables": len(tables) > 0,
                "table_count": len(tables),
                "has_images": image_count > 0,
                "image_count": image_count,
                "extraction_method": "pymupdf",
                "is_text_based": True
            }
        })
 
    doc.close()
    return pages
 
 
def extract_text_ocr_doctr(pdf_bytes: bytes) -> List[Dict]:
    """OCR extraction using docTR for scanned PDFs with img2table for better table detection"""
    try:
        model = get_doctr()
    except Exception as e:
        print(f"[OCR] Failed to load docTR: {e}")
        # Fallback to basic text extraction
        return extract_text_pymupdf(pdf_bytes)
   
    # Try to load img2table for scanned table extraction
    img2table_ocr = get_img2table()
   
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    results = []
 
    for i, page in enumerate(doc):
        # Detect images
        try:
            image_list = page.get_images(full=True)
            image_count = len(image_list)
        except Exception as e:
            print(f"[OCR] Warning: Could not detect images on page {i+1}: {e}")
            image_count = 0
       
        # Render at high resolution (3x for better OCR accuracy)
        try:
            pix = page.get_pixmap(matrix=fitz.Matrix(3.0, 3.0))
            img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
 
            # Convert to RGB
            if pix.n == 4:
                img = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)
            elif pix.n == 1:
                img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
        except Exception as e:
            print(f"[OCR] Error rendering page {i+1}: {e}")
            results.append({
                "page": i + 1,
                "text": f"[ERROR: Could not render page {i+1} for OCR]",
                "structured_data": {
                    "error": str(e),
                    "extraction_method": "failed"
                }
            })
            continue
 
        # Extract tables using img2table (better for scanned tables)
        tables = []
        if img2table_ocr:
            try:
                from img2table.document import Image as Img2TableImage
                import io
               
                # Convert numpy array to PIL Image then to bytes
                pil_img = Image.fromarray(img)
               
                # Save PIL image to bytes buffer
                img_bytes = io.BytesIO()
                pil_img.save(img_bytes, format='PNG')
                img_bytes.seek(0)
               
                # Create img2table document from bytes
                img_doc = Img2TableImage(src=img_bytes.getvalue())
               
                # Extract tables
                extracted_tables = img_doc.extract_tables(ocr=img2table_ocr, implicit_rows=True, borderless_tables=True)
               
                if extracted_tables:
                    for table in extracted_tables:
                        try:
                            # Get table as DataFrame
                            df = table.df
                            if df is not None and not df.empty:
                                # Convert to Markdown table format for better structure
                                table_md = _dataframe_to_markdown(df)
                                tables.append(table_md)
                                print(f"[OCR] Page {i+1}: img2table extracted table with {len(df)} rows, {len(df.columns)} columns")
                        except Exception as e:
                            print(f"[OCR] Warning: Failed to process img2table result on page {i+1}: {e}")
            except Exception as e:
                print(f"[OCR] Warning: img2table table extraction failed on page {i+1}: {e}")
 
        # Run docTR OCR for text extraction
        try:
            result = model([img])
            page_result = result.pages[0]
 
            # Extract text from blocks with structure preservation
            text_parts = []
            for block in page_result.blocks:
                block_text = []
                for line in block.lines:
                    line_text = " ".join(word.value for word in line.words)
                    block_text.append(line_text)
                text_parts.append(" ".join(block_text))
 
            extracted_text = "\n\n".join(text_parts)
           
            # Add table data if found
            if tables:
                extracted_text += "\n\n[TABLES FOUND VIA IMG2TABLE]\n" + "\n\n".join(tables)
           
            # Add image info if present
            if image_count > 0:
                extracted_text += f"\n\n[{image_count} IMAGE(S) DETECTED]"
 
            results.append({
                "page": i + 1,
                "text": extracted_text,
                "structured_data": {
                    "ocr_method": "doctr",
                    "has_images": image_count > 0,
                    "image_count": image_count,
                    "has_tables": len(tables) > 0,
                    "table_count": len(tables),
                    "extraction_method": "ocr",
                    "is_scanned": True,
                    "blocks_detected": len(page_result.blocks)
                }
            })
        except Exception as e:
            results.append({
                "page": i + 1,
                "text": f"[OCR ERROR: Could not extract text from page {i+1}]",
                "structured_data": {
                    "error": str(e),
                    "extraction_method": "failed"
                }
            })
 
    doc.close()
    return results
 
 
def extract_text_hybrid_doctr(pdf_bytes: bytes) -> List[Dict]:
    """Hybrid extraction: text where available, OCR where needed, with table and image detection"""
    try:
        model = get_doctr()
    except Exception as e:
        print(f"[OCR] Failed to load docTR, using text-only extraction: {e}")
        # Fallback to text-only extraction
        return extract_text_pymupdf(pdf_bytes)
   
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    results = []
 
    for i, page in enumerate(doc):
        text = page.get_text("text").strip()
        structured_data = {}
       
        # Detect images
        try:
            image_list = page.get_images(full=True)
            image_count = len(image_list)
        except Exception as e:
            print(f"[OCR] Warning: Could not detect images on page {i+1}: {e}")
            image_count = 0
       
        # Try table extraction first (if text-based)
        tables = []
        if len(text) >= 50:
            try:
                table_data = page.find_tables()
                if table_data and table_data.tables:
                    for table in table_data.tables:
                        try:
                            tables.append(table.to_pandas().to_string(index=False))
                        except:
                            pass
            except:
                pass
 
        # If insufficient text, use OCR
        if len(text) < 50:
            try:
                pix = page.get_pixmap(matrix=fitz.Matrix(3.0, 3.0))
                img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
 
                if pix.n == 4:
                    img = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)
                elif pix.n == 1:
                    img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
 
                try:
                    result = model([img])
                    page_result = result.pages[0]
                    text_parts = []
                    for block in page_result.blocks:
                        block_text = [" ".join(word.value for word in line.words) for line in block.lines]
                        text_parts.append(" ".join(block_text))
                    text = "\n\n".join(text_parts)
                    structured_data = {
                        "ocr_method": "doctr",
                        "has_structure": True,
                        "extraction_method": "hybrid_ocr"
                    }
                except Exception as e:
                    print(f"[OCR] docTR failed on page {i+1}: {e}")
                    text = f"[OCR processing failed for page {i+1}]"
                    structured_data = {"error": str(e), "extraction_method": "failed"}
            except Exception as e:
                print(f"[OCR] Error rendering page {i+1} for OCR: {e}")
                text = f"[Could not render page {i+1}]"
                structured_data = {"error": str(e), "extraction_method": "render_failed"}
        else:
            structured_data = {
                "extraction_method": "hybrid_text",
                "is_text_based": True
            }
       
        # Add table data
        if tables:
            text += "\n\n[TABLES FOUND]\n" + "\n\n".join(tables)
            structured_data["has_tables"] = True
            structured_data["table_count"] = len(tables)
       
        # Add image info
        if image_count > 0:
            text += f"\n\n[{image_count} IMAGE(S) ON THIS PAGE]"
            structured_data["has_images"] = True
            structured_data["image_count"] = image_count
 
        results.append({
            "page": i + 1,
            "text": text,
            "structured_data": structured_data
        })
 
    doc.close()
    return results
 
 
def extract_text_from_pdf(pdf_bytes: bytes) -> List[Dict]:
    """
    Main entry point - Unified extraction strategy for all PDF types
    Handles: text PDFs, scanned PDFs, hybrid, tables, invoices
    Strategy: Use appropriate method based on PDF type
    Optimized for gemma3:1b - extracts complete structured content
    """
    pdf_type = is_scanned_pdf(pdf_bytes)
   
    print(f"[OCR] Detected PDF type: {pdf_type}")
 
    if pdf_type == 'text':
        # Text PDFs: fast text extraction with table detection
        return extract_text_pymupdf(pdf_bytes)
    elif pdf_type == 'scanned':
        # Scanned PDFs: full docTR OCR processing for images
        print("[OCR] Using docTR OCR for scanned PDF")
        return extract_text_ocr_doctr(pdf_bytes)
    else:
        # Hybrid PDFs: intelligent mix of text extraction + OCR
        # Handles invoices, forms, mixed content documents
        print("[OCR] Using hybrid extraction for mixed content")
        return extract_text_hybrid_doctr(pdf_bytes)
 
 