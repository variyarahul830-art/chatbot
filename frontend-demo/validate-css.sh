#!/bin/bash
# CSS Module Validation Script
# Verifies that CSS files don't contain Sass-specific syntax

echo "=== CSS Module Syntax Validation ==="
echo

# Check for Sass parent selector (&)
echo "Checking for Sass parent selector (&)..."
FILES=$(find app/components -name "*.module.css")
FOUND_SASS=0

for file in $FILES; do
  # Look for indented & patterns (nested selectors)
  if grep -E "^\s+&" "$file" > /dev/null; then
    echo "❌ Found Sass syntax in $file"
    grep -n "^\s+&" "$file"
    FOUND_SASS=1
  fi
done

if [ $FOUND_SASS -eq 0 ]; then
  echo "✅ No Sass parent selectors found"
fi

echo

# Check for nested element selectors (p {, li {, etc inside rules)
echo "Checking for nested element selectors..."
FOUND_NESTED=0

for file in $FILES; do
  # This is a basic check - look for element selectors that are indented
  if grep -E "^\s+(p|li|h[1-6]|div|span|a|button|input) \{" "$file" > /dev/null; then
    echo "⚠️  Found potentially nested selectors in $file"
    grep -n "^\s+(p|li|h[1-6]|div|span|a|button|input) \{" "$file"
    # Note: This might be false positives in @keyframes or other contexts
  fi
done

echo

# Summary
echo "=== CSS Module Files ==="
ls -lh app/components/*.module.css | awk '{print $9, $5}'

echo
echo "=== Validation Complete ==="
echo "If all checks pass, the CSS is ready for Next.js build."
