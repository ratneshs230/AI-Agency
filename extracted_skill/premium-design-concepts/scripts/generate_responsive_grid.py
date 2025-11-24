#!/usr/bin/env python3
"""
Generate responsive grid systems for premium layouts
"""

import argparse
from typing import Dict, List

def generate_grid_css(columns: int = 12, gap: str = "2rem", max_width: str = "1440px") -> str:
    """Generate a responsive CSS grid system"""
    
    css = """/* Premium Responsive Grid System */

.container {
  width: 100%;
  max-width: """ + max_width + """;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 4rem;
  }
}

.grid {
  display: grid;
  gap: """ + gap + """;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

/* Explicit column spans */
"""
    
    # Generate column classes
    for i in range(1, columns + 1):
        css += f"""
.grid-cols-{i} {{
  grid-template-columns: repeat({i}, minmax(0, 1fr));
}}
"""
    
    # Responsive column classes
    css += """
/* Mobile First Responsive Classes */

/* Small devices (640px and up) */
@media (min-width: 640px) {
"""
    for i in range(1, columns + 1):
        css += f"""  .sm\\:grid-cols-{i} {{
    grid-template-columns: repeat({i}, minmax(0, 1fr));
  }}
"""
    css += "}\n"
    
    # Medium devices
    css += """
/* Medium devices (768px and up) */
@media (min-width: 768px) {
"""
    for i in range(1, columns + 1):
        css += f"""  .md\\:grid-cols-{i} {{
    grid-template-columns: repeat({i}, minmax(0, 1fr));
  }}
"""
    css += "}\n"
    
    # Large devices
    css += """
/* Large devices (1024px and up) */
@media (min-width: 1024px) {
"""
    for i in range(1, columns + 1):
        css += f"""  .lg\\:grid-cols-{i} {{
    grid-template-columns: repeat({i}, minmax(0, 1fr));
  }}
"""
    css += "}\n"
    
    # Extra large devices
    css += """
/* Extra large devices (1280px and up) */
@media (min-width: 1280px) {
"""
    for i in range(1, columns + 1):
        css += f"""  .xl\\:grid-cols-{i} {{
    grid-template-columns: repeat({i}, minmax(0, 1fr));
  }}
"""
    css += "}\n"
    
    # Span classes
    css += "\n/* Grid span classes */\n"
    for i in range(1, columns + 1):
        css += f""".col-span-{i} {{
  grid-column: span {i} / span {i};
}}

"""
    
    # Row span classes
    css += "/* Grid row span classes */\n"
    for i in range(1, 7):  # Usually don't need more than 6 rows
        css += f""".row-span-{i} {{
  grid-row: span {i} / span {i};
}}

"""
    
    # Gap utilities
    css += """/* Gap utilities */
.gap-0 { gap: 0; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-5 { gap: 1.25rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }
.gap-10 { gap: 2.5rem; }
.gap-12 { gap: 3rem; }
.gap-16 { gap: 4rem; }

/* Separate row and column gaps */
.gap-x-0 { column-gap: 0; }
.gap-x-1 { column-gap: 0.25rem; }
.gap-x-2 { column-gap: 0.5rem; }
.gap-x-4 { column-gap: 1rem; }
.gap-x-6 { column-gap: 1.5rem; }
.gap-x-8 { column-gap: 2rem; }

.gap-y-0 { row-gap: 0; }
.gap-y-1 { row-gap: 0.25rem; }
.gap-y-2 { row-gap: 0.5rem; }
.gap-y-4 { row-gap: 1rem; }
.gap-y-6 { row-gap: 1.5rem; }
.gap-y-8 { row-gap: 2rem; }
"""
    
    return css

def generate_flexbox_css() -> str:
    """Generate flexbox utility classes"""
    
    css = """/* Flexbox Utilities */

.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

/* Flex direction */
.flex-row { flex-direction: row; }
.flex-row-reverse { flex-direction: row-reverse; }
.flex-col { flex-direction: column; }
.flex-col-reverse { flex-direction: column-reverse; }

/* Flex wrap */
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }
.flex-wrap-reverse { flex-wrap: wrap-reverse; }

/* Align items */
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.items-center { align-items: center; }
.items-baseline { align-items: baseline; }
.items-stretch { align-items: stretch; }

/* Justify content */
.justify-start { justify-content: flex-start; }
.justify-end { justify-content: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }

/* Align self */
.self-auto { align-self: auto; }
.self-start { align-self: flex-start; }
.self-end { align-self: flex-end; }
.self-center { align-self: center; }
.self-stretch { align-self: stretch; }

/* Flex grow and shrink */
.flex-1 { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }
.flex-initial { flex: 0 1 auto; }
.flex-none { flex: none; }
.flex-grow { flex-grow: 1; }
.flex-grow-0 { flex-grow: 0; }
.flex-shrink { flex-shrink: 1; }
.flex-shrink-0 { flex-shrink: 0; }

/* Responsive flex utilities */
@media (min-width: 640px) {
  .sm\\:flex { display: flex; }
  .sm\\:flex-row { flex-direction: row; }
  .sm\\:flex-col { flex-direction: column; }
}

@media (min-width: 768px) {
  .md\\:flex { display: flex; }
  .md\\:flex-row { flex-direction: row; }
  .md\\:flex-col { flex-direction: column; }
}

@media (min-width: 1024px) {
  .lg\\:flex { display: flex; }
  .lg\\:flex-row { flex-direction: row; }
  .lg\\:flex-col { flex-direction: column; }
}
"""
    
    return css

def generate_layout_patterns() -> str:
    """Generate common layout patterns"""
    
    patterns = """/* Premium Layout Patterns */

/* Hero Section with Centered Content */
.hero-centered {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 4rem 2rem;
  text-align: center;
}

/* Split Screen Layout */
.split-screen {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .split-screen {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
}

/* Asymmetric Grid */
.asymmetric-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .asymmetric-grid {
    grid-template-columns: 1fr;
  }
}

/* Magazine Layout */
.magazine-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}

.magazine-layout .feature {
  grid-column: span 8;
}

.magazine-layout .sidebar {
  grid-column: span 4;
}

@media (max-width: 1024px) {
  .magazine-layout .feature,
  .magazine-layout .sidebar {
    grid-column: span 12;
  }
}

/* Masonry Grid */
.masonry {
  column-count: 3;
  column-gap: 2rem;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 2rem;
}

@media (max-width: 1024px) {
  .masonry { column-count: 2; }
}

@media (max-width: 640px) {
  .masonry { column-count: 1; }
}

/* Bento Box Layout */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 1rem;
}

.bento-item-large {
  grid-column: span 2;
  grid-row: span 2;
}

.bento-item-wide {
  grid-column: span 2;
}

.bento-item-tall {
  grid-row: span 2;
}

@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .bento-item-large {
    grid-column: span 2;
    grid-row: span 1;
  }
}

/* Card Grid with Auto-fit */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Full Bleed Layout */
.full-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}
"""
    
    return patterns

def generate_html_example(grid_type: str = "standard") -> str:
    """Generate HTML examples for different grid types"""
    
    if grid_type == "standard":
        return """<!-- Standard Responsive Grid Example -->
<div class="container">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div class="card">Item 1</div>
    <div class="card">Item 2</div>
    <div class="card">Item 3</div>
    <div class="card">Item 4</div>
  </div>
</div>"""
    
    elif grid_type == "asymmetric":
        return """<!-- Asymmetric Grid Example -->
<div class="container">
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-12 lg:col-span-8">
      <!-- Main content -->
    </div>
    <div class="col-span-12 lg:col-span-4">
      <!-- Sidebar -->
    </div>
  </div>
</div>"""
    
    elif grid_type == "bento":
        return """<!-- Bento Box Grid Example -->
<div class="container">
  <div class="bento-grid">
    <div class="bento-item-large">Featured</div>
    <div class="bento-item">Small 1</div>
    <div class="bento-item">Small 2</div>
    <div class="bento-item-wide">Wide</div>
    <div class="bento-item-tall">Tall</div>
    <div class="bento-item">Small 3</div>
  </div>
</div>"""
    
    else:
        return """<!-- Flex Layout Example -->
<div class="container">
  <div class="flex flex-col md:flex-row items-center justify-between gap-8">
    <div class="flex-1">Content 1</div>
    <div class="flex-1">Content 2</div>
    <div class="flex-1">Content 3</div>
  </div>
</div>"""

def main():
    parser = argparse.ArgumentParser(description='Generate responsive grid systems')
    parser.add_argument('--columns', type=int, default=12,
                        help='Number of grid columns (default: 12)')
    parser.add_argument('--gap', default='2rem',
                        help='Default grid gap (default: 2rem)')
    parser.add_argument('--max-width', default='1440px',
                        help='Container max width (default: 1440px)')
    parser.add_argument('--include-flex', action='store_true',
                        help='Include flexbox utilities')
    parser.add_argument('--include-patterns', action='store_true',
                        help='Include layout patterns')
    parser.add_argument('--example', choices=['standard', 'asymmetric', 'bento', 'flex'],
                        help='Generate HTML example')
    parser.add_argument('--output', help='Output file path (optional)')
    
    args = parser.parse_args()
    
    # Generate CSS
    output = generate_grid_css(args.columns, args.gap, args.max_width)
    
    if args.include_flex:
        output += "\n" + generate_flexbox_css()
    
    if args.include_patterns:
        output += "\n" + generate_layout_patterns()
    
    if args.example:
        output += "\n" + generate_html_example(args.example)
    
    # Output
    if args.output:
        with open(args.output, 'w') as f:
            f.write(output)
        print(f"Grid system saved to {args.output}")
    else:
        print(output)

if __name__ == "__main__":
    main()