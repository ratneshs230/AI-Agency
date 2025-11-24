#!/usr/bin/env python3
"""
Generate premium color palettes for design concepts
"""

import argparse
import json
import random
from typing import Dict, List, Tuple

def hex_to_rgb(hex_color: str) -> Tuple[int, int, int]:
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb: Tuple[int, int, int]) -> str:
    """Convert RGB tuple to hex color"""
    return '#{:02x}{:02x}{:02x}'.format(*rgb)

def generate_tints_shades(base_color: str, count: int = 5) -> Dict[str, str]:
    """Generate tints and shades of a base color"""
    r, g, b = hex_to_rgb(base_color)
    variations = {}
    
    # Generate tints (lighter)
    for i in range(1, count + 1):
        factor = i / (count + 1)
        tint_r = int(r + (255 - r) * factor)
        tint_g = int(g + (255 - g) * factor)
        tint_b = int(b + (255 - b) * factor)
        variations[f'tint-{i * 100}'] = rgb_to_hex((tint_r, tint_g, tint_b))
    
    # Generate shades (darker)
    for i in range(1, count + 1):
        factor = i / (count + 1)
        shade_r = int(r * (1 - factor))
        shade_g = int(g * (1 - factor))
        shade_b = int(b * (1 - factor))
        variations[f'shade-{i * 100}'] = rgb_to_hex((shade_r, shade_g, shade_b))
    
    return variations

def generate_palette(style: str) -> Dict[str, any]:
    """Generate a complete color palette based on style"""
    
    palettes = {
        'luxury': {
            'name': 'Luxury Elegance',
            'primary': '#1C1C1C',
            'secondary': '#D4AF37',
            'accent': '#8B4513',
            'neutral': {
                'white': '#FAFAF8',
                'light': '#E8E6E1',
                'gray': '#A09C94',
                'dark': '#4A4A4A',
                'black': '#0A0A0A'
            }
        },
        'tech': {
            'name': 'Tech Forward',
            'primary': '#0066FF',
            'secondary': '#00D4AA',
            'accent': '#FF006E',
            'neutral': {
                'white': '#FFFFFF',
                'light': '#F5F5F7',
                'gray': '#86868B',
                'dark': '#1D1D1F',
                'black': '#000000'
            }
        },
        'organic': {
            'name': 'Natural Premium',
            'primary': '#3E7B4F',
            'secondary': '#E6B47D',
            'accent': '#CD5C5C',
            'neutral': {
                'white': '#FFF8E1',
                'light': '#F5E6D3',
                'gray': '#B5A492',
                'dark': '#5C4033',
                'black': '#2E1A11'
            }
        },
        'bold': {
            'name': 'Bold Statement',
            'primary': '#FF0000',
            'secondary': '#000000',
            'accent': '#FFFF00',
            'neutral': {
                'white': '#FFFFFF',
                'light': '#F0F0F0',
                'gray': '#808080',
                'dark': '#333333',
                'black': '#000000'
            }
        }
    }
    
    if style not in palettes:
        style = 'luxury'  # Default fallback
    
    palette = palettes[style].copy()
    
    # Add variations
    palette['primary_variations'] = generate_tints_shades(palette['primary'], 3)
    palette['secondary_variations'] = generate_tints_shades(palette['secondary'], 3)
    palette['accent_variations'] = generate_tints_shades(palette['accent'], 2)
    
    # Add gradients
    palette['gradients'] = {
        'primary_gradient': f"linear-gradient(135deg, {palette['primary']} 0%, {palette['secondary']} 100%)",
        'accent_gradient': f"linear-gradient(90deg, {palette['accent']} 0%, {palette['primary']} 100%)",
        'subtle_gradient': f"linear-gradient(180deg, {palette['neutral']['white']} 0%, {palette['neutral']['light']} 100%)"
    }
    
    return palette

def generate_css_variables(palette: Dict) -> str:
    """Generate CSS custom properties from palette"""
    css = ":root {\n"
    css += f"  /* {palette['name']} Color Palette */\n\n"
    
    # Main colors
    css += "  /* Primary Colors */\n"
    css += f"  --color-primary: {palette['primary']};\n"
    css += f"  --color-secondary: {palette['secondary']};\n"
    css += f"  --color-accent: {palette['accent']};\n\n"
    
    # Neutral colors
    css += "  /* Neutral Colors */\n"
    for key, value in palette['neutral'].items():
        css += f"  --color-neutral-{key}: {value};\n"
    css += "\n"
    
    # Primary variations
    css += "  /* Primary Variations */\n"
    for key, value in palette['primary_variations'].items():
        css += f"  --color-primary-{key}: {value};\n"
    css += "\n"
    
    # Secondary variations
    css += "  /* Secondary Variations */\n"
    for key, value in palette['secondary_variations'].items():
        css += f"  --color-secondary-{key}: {value};\n"
    css += "\n"
    
    # Gradients
    css += "  /* Gradients */\n"
    for key, value in palette['gradients'].items():
        css += f"  --gradient-{key.replace('_', '-')}: {value};\n"
    
    css += "}\n"
    
    return css

def generate_scss_map(palette: Dict) -> str:
    """Generate SCSS color map"""
    scss = f"// {palette['name']} Color Palette\n\n"
    scss += "$colors: (\n"
    scss += f"  'primary': {palette['primary']},\n"
    scss += f"  'secondary': {palette['secondary']},\n"
    scss += f"  'accent': {palette['accent']},\n"
    
    # Neutral colors
    for key, value in palette['neutral'].items():
        scss += f"  'neutral-{key}': {value},\n"
    
    scss = scss.rstrip(',\n') + "\n);\n"
    
    return scss

def main():
    parser = argparse.ArgumentParser(description='Generate premium color palettes')
    parser.add_argument('--style', 
                        choices=['luxury', 'tech', 'organic', 'bold'],
                        default='luxury',
                        help='Style of color palette to generate')
    parser.add_argument('--format', 
                        choices=['json', 'css', 'scss', 'all'],
                        default='css',
                        help='Output format')
    parser.add_argument('--output', 
                        help='Output file path (optional)')
    
    args = parser.parse_args()
    
    # Generate palette
    palette = generate_palette(args.style)
    
    # Format output
    output = ""
    if args.format == 'json' or args.format == 'all':
        output = json.dumps(palette, indent=2)
    
    if args.format == 'css' or args.format == 'all':
        output = generate_css_variables(palette)
    
    if args.format == 'scss' or args.format == 'all':
        output = generate_scss_map(palette)
    
    if args.format == 'all':
        output = f"/* JSON */\n{json.dumps(palette, indent=2)}\n\n"
        output += f"/* CSS */\n{generate_css_variables(palette)}\n\n"
        output += f"/* SCSS */\n{generate_scss_map(palette)}"
    
    # Output
    if args.output:
        with open(args.output, 'w') as f:
            f.write(output)
        print(f"Color palette saved to {args.output}")
    else:
        print(output)

if __name__ == "__main__":
    main()