import os
import re

def update_classes(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Mappings
    replacements = [
        # Typography
        (r'\bfont-display\b', 'font-sans font-semibold tracking-tight'),
        (r'\btext-muted\b', 'text-text-secondary'),
        (r'\btext-ink\b', 'text-text-primary'),
        (r'\btext-paper/60\b', 'text-text-secondary'),
        (r'\btext-paper\b', 'text-background'),
        
        # Backgrounds
        (r'\bbg-ink\b', 'bg-white'),
        (r'\bbg-paper-2\b', 'bg-surface-elevated'),
        (r'\bbg-paper\b', 'bg-surface'),
        (r'\bbg-line\b', 'bg-border'),
        
        # Borders
        (r'\bborder-line\b', 'border-border'),
        (r'\bborder-paper/15\b', 'border-border'),
        (r'\bdivide-line\b', 'divide-border'),
        
        # Hovers
        (r'\bhover:bg-ink\b', 'hover:bg-white'),
        (r'\bhover:text-paper\b', 'hover:text-background'),
        (r'\bhover:text-ink\b', 'hover:text-white'),
        (r'\bhover:border-ink\b', 'hover:border-white'),
        
        # Specific overrides
        (r'\borb\b', 'hidden'), # hide orb
    ]

    new_content = content
    for pattern, repl in replacements:
        new_content = re.sub(pattern, repl, new_content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

files_to_check = [
    "d:/portfolio2/app/page.tsx",
    "d:/portfolio2/components/Chrome.tsx",
    "d:/portfolio2/components/Projects.tsx",
    "d:/portfolio2/components/Reveal.tsx",
    "d:/portfolio2/components/Icons.tsx"
]

for f in files_to_check:
    if os.path.exists(f):
        update_classes(f)
