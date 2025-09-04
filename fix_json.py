#!/usr/bin/env python3
import re
import json

def fix_json_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix single quotes to double quotes (but preserve apostrophes in text)
    # This regex looks for single quotes that are likely JSON keys/values, not apostrophes
    content = re.sub(r"'([^']*?)'", r'"\1"', content)
    
    # Remove trailing commas in arrays
    content = re.sub(r',(\s*])', r'\1', content)
    
    # Remove trailing commas in objects
    content = re.sub(r',(\s*})', r'\1', content)
    
    # Fix any remaining malformed JSON
    # Try to parse and re-format
    try:
        parsed = json.loads(content)
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(parsed, f, indent=4, ensure_ascii=False)
        print(f"Successfully fixed JSON and saved to {output_file}")
    except json.JSONDecodeError as e:
        print(f"Still has JSON errors: {e}")
        # Save the partially fixed version anyway
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Saved partially fixed version to {output_file}")

if __name__ == "__main__":
    fix_json_file("src/model_vocab_feedback.json", "src/model_vocab_feedback_fixed.json") 