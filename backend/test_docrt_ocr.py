"""
Standalone OCR Test Script
Usage:
    python test_ocr.py sample.pdf
"""

import sys
import json

# Import your existing functions
from backend.services.doctr_ocr import extract_text_from_pdf   # <-- change filename if needed


def main():
    if len(sys.argv) < 2:
        print("Usage: python test_ocr.py <pdf_path>")
        sys.exit(1)

    pdf_path = sys.argv[1]

    try:
        with open(pdf_path, "rb") as f:
            pdf_bytes = f.read()

        print(f"[TEST] Processing file: {pdf_path}")
        results = extract_text_from_pdf(pdf_bytes)

        print("\n================ EXTRACTION RESULT ================\n")

        for page_data in results:
            print(f"\n----- PAGE {page_data['page']} -----\n")
            print(page_data["text"])
            print("\nStructured Data:")
            print(json.dumps(page_data["structured_data"], indent=2))

        print("\n================ DONE ================\n")

    except Exception as e:
        print(f"[ERROR] {e}")


if __name__ == "__main__":
    main()