#!/usr/bin/env python3
"""
Compile complete design concepts for websites and marketing materials
"""

import argparse
import json
from datetime import datetime
from typing import Dict, List

def generate_website_concept(project_name: str, style: str, colors: Dict) -> str:
    """Generate a complete website design concept"""
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{project_name} - Premium Design Concept</title>
    <style>
        /* Design System Variables */
        :root {{
            --color-primary: {colors.get('primary', '#000')};
            --color-secondary: {colors.get('secondary', '#666')};
            --color-accent: {colors.get('accent', '#0066ff')};
            --color-background: {colors.get('background', '#fff')};
            --color-text: {colors.get('text', '#333')};
            
            --font-display: 'Playfair Display', serif;
            --font-body: 'Inter', sans-serif;
            
            --spacing-xs: 0.5rem;
            --spacing-sm: 1rem;
            --spacing-md: 2rem;
            --spacing-lg: 4rem;
            --spacing-xl: 8rem;
            
            --transition-quick: 200ms ease;
            --transition-smooth: 400ms cubic-bezier(0.4, 0, 0.2, 1);
        }}
        
        /* Base Styles */
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: var(--font-body);
            color: var(--color-text);
            background: var(--color-background);
            line-height: 1.6;
            overflow-x: hidden;
        }}
        
        /* Typography */
        h1, h2, h3 {{
            font-family: var(--font-display);
            font-weight: 700;
            line-height: 1.1;
        }}
        
        h1 {{
            font-size: clamp(3rem, 8vw, 6rem);
            margin-bottom: var(--spacing-md);
        }}
        
        h2 {{
            font-size: clamp(2rem, 5vw, 3.5rem);
            margin-bottom: var(--spacing-md);
        }}
        
        /* Container */
        .container {{
            max-width: 1440px;
            margin: 0 auto;
            padding: 0 var(--spacing-md);
        }}
        
        /* Hero Section */
        .hero {{
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
            color: white;
        }}
        
        .hero-content {{
            text-align: center;
            animation: fadeInUp 1s ease;
        }}
        
        .hero h1 {{
            color: white;
            margin-bottom: var(--spacing-sm);
            opacity: 0;
            animation: fadeInUp 0.8s ease 0.2s forwards;
        }}
        
        .hero p {{
            font-size: 1.25rem;
            opacity: 0;
            animation: fadeInUp 0.8s ease 0.4s forwards;
            margin-bottom: var(--spacing-lg);
        }}
        
        /* Button Styles */
        .btn {{
            display: inline-block;
            padding: 1rem 3rem;
            background: var(--color-accent);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: var(--transition-smooth);
            opacity: 0;
            animation: fadeInUp 0.8s ease 0.6s forwards;
        }}
        
        .btn:hover {{
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }}
        
        /* Scroll Indicator */
        .scroll-indicator {{
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 50px;
            border: 2px solid white;
            border-radius: 25px;
            opacity: 0;
            animation: fadeIn 1s ease 1s forwards;
        }}
        
        .scroll-indicator::before {{
            content: '';
            position: absolute;
            top: 10px;
            left: 50%;
            width: 3px;
            height: 10px;
            background: white;
            transform: translateX(-50%);
            animation: scroll 2s infinite;
        }}
        
        /* Features Section */
        .features {{
            padding: var(--spacing-xl) 0;
        }}
        
        .features-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--spacing-lg);
            margin-top: var(--spacing-lg);
        }}
        
        .feature-card {{
            padding: var(--spacing-md);
            background: white;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
            transition: var(--transition-smooth);
        }}
        
        .feature-card:hover {{
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }}
        
        .feature-icon {{
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
            border-radius: 15px;
            margin-bottom: var(--spacing-sm);
        }}
        
        /* Animations */
        @keyframes fadeInUp {{
            from {{
                opacity: 0;
                transform: translateY(30px);
            }}
            to {{
                opacity: 1;
                transform: translateY(0);
            }}
        }}
        
        @keyframes fadeIn {{
            from {{ opacity: 0; }}
            to {{ opacity: 1; }}
        }}
        
        @keyframes scroll {{
            0% {{
                opacity: 0;
                transform: translateX(-50%) translateY(0);
            }}
            40% {{
                opacity: 1;
            }}
            80% {{
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }}
            100% {{
                opacity: 0;
            }}
        }}
        
        /* Responsive */
        @media (max-width: 768px) {{
            .hero h1 {{
                font-size: 2.5rem;
            }}
            
            .container {{
                padding: 0 var(--spacing-sm);
            }}
        }}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content container">
            <h1>{project_name}</h1>
            <p>Premium design that speaks luxury and sophistication</p>
            <a href="#" class="btn">Discover Excellence</a>
        </div>
        <div class="scroll-indicator"></div>
    </section>
    
    <!-- Features Section -->
    <section class="features">
        <div class="container">
            <h2>Exceptional Features</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon"></div>
                    <h3>Premium Quality</h3>
                    <p>Meticulously crafted with attention to every detail</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"></div>
                    <h3>Responsive Design</h3>
                    <p>Flawless experience across all devices and screens</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"></div>
                    <h3>Living Interface</h3>
                    <p>Dynamic interactions that bring your brand to life</p>
                </div>
            </div>
        </div>
    </section>
    
    <script>
        // Intersection Observer for scroll animations
        const observerOptions = {{
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        }};
        
        const observer = new IntersectionObserver((entries) => {{
            entries.forEach(entry => {{
                if (entry.isIntersecting) {{
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }}
            }});
        }}, observerOptions);
        
        document.querySelectorAll('.feature-card').forEach(card => {{
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.8s ease';
            observer.observe(card);
        }});
    </script>
</body>
</html>"""
    
    return html

def generate_style_guide(project_name: str, colors: Dict, typography: Dict) -> Dict:
    """Generate a comprehensive style guide"""
    
    style_guide = {
        "project": project_name,
        "created": datetime.now().isoformat(),
        "colors": {
            "primary": colors.get("primary", "#000000"),
            "secondary": colors.get("secondary", "#666666"),
            "accent": colors.get("accent", "#0066ff"),
            "neutrals": {
                "white": "#ffffff",
                "light": "#f5f5f5",
                "gray": "#888888",
                "dark": "#333333",
                "black": "#000000"
            }
        },
        "typography": {
            "display": typography.get("display", "Playfair Display"),
            "heading": typography.get("heading", "Playfair Display"),
            "body": typography.get("body", "Inter"),
            "scale": {
                "h1": "clamp(3rem, 8vw, 6rem)",
                "h2": "clamp(2rem, 5vw, 3.5rem)",
                "h3": "clamp(1.5rem, 4vw, 2.5rem)",
                "body": "1rem",
                "small": "0.875rem"
            }
        },
        "spacing": {
            "xs": "0.5rem",
            "sm": "1rem",
            "md": "2rem",
            "lg": "4rem",
            "xl": "8rem"
        },
        "animations": {
            "duration": {
                "quick": "200ms",
                "normal": "400ms",
                "slow": "800ms"
            },
            "easing": {
                "ease-out": "cubic-bezier(0.4, 0, 0.2, 1)",
                "ease-in-out": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
                "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            }
        },
        "components": [
            "Hero Section",
            "Navigation Bar",
            "Feature Cards",
            "Call-to-Action Buttons",
            "Form Elements",
            "Footer"
        ],
        "breakpoints": {
            "mobile": "320px",
            "tablet": "768px",
            "desktop": "1024px",
            "wide": "1440px"
        }
    }
    
    return style_guide

def generate_marketing_concept(project_name: str, style: str) -> Dict:
    """Generate marketing material specifications"""
    
    marketing = {
        "project": project_name,
        "style": style,
        "materials": {
            "social_media": {
                "instagram_post": {
                    "dimensions": "1080x1080px",
                    "format": "JPG/PNG",
                    "style": "Minimalist with brand colors"
                },
                "instagram_story": {
                    "dimensions": "1080x1920px",
                    "format": "JPG/PNG/MP4",
                    "style": "Full-screen immersive"
                },
                "facebook_cover": {
                    "dimensions": "1200x630px",
                    "format": "JPG/PNG",
                    "style": "Wide format with clear messaging"
                }
            },
            "email": {
                "newsletter": {
                    "width": "600px",
                    "style": "Single column, mobile-responsive"
                },
                "promotional": {
                    "width": "600px",
                    "style": "Hero image with CTA button"
                }
            },
            "display_ads": {
                "leaderboard": {
                    "dimensions": "728x90px",
                    "format": "JPG/PNG/GIF"
                },
                "medium_rectangle": {
                    "dimensions": "300x250px",
                    "format": "JPG/PNG/GIF"
                },
                "skyscraper": {
                    "dimensions": "160x600px",
                    "format": "JPG/PNG/GIF"
                }
            },
            "print": {
                "business_card": {
                    "dimensions": "3.5x2 inches",
                    "format": "PDF (CMYK, 300dpi)"
                },
                "flyer": {
                    "dimensions": "8.5x11 inches",
                    "format": "PDF (CMYK, 300dpi)"
                }
            }
        }
    }
    
    return marketing

def main():
    parser = argparse.ArgumentParser(description='Compile complete design concepts')
    parser.add_argument('--project', required=True,
                        help='Project name')
    parser.add_argument('--type', choices=['website', 'marketing', 'both'],
                        default='website',
                        help='Type of concept to generate')
    parser.add_argument('--style', 
                        choices=['luxury', 'tech', 'organic', 'bold', 'minimal'],
                        default='luxury',
                        help='Design style')
    parser.add_argument('--primary-color', default='#1C1C1C',
                        help='Primary brand color')
    parser.add_argument('--secondary-color', default='#D4AF37',
                        help='Secondary brand color')
    parser.add_argument('--accent-color', default='#0066FF',
                        help='Accent color for CTAs')
    parser.add_argument('--output', help='Output file path')
    
    args = parser.parse_args()
    
    # Prepare color scheme
    colors = {
        'primary': args.primary_color,
        'secondary': args.secondary_color,
        'accent': args.accent_color,
        'background': '#FFFFFF' if args.style in ['luxury', 'minimal', 'organic'] else '#000000',
        'text': '#333333' if args.style in ['luxury', 'minimal', 'organic'] else '#FFFFFF'
    }
    
    # Prepare typography
    typography = {
        'display': 'Playfair Display' if args.style == 'luxury' else 'Inter',
        'heading': 'Playfair Display' if args.style == 'luxury' else 'Inter',
        'body': 'Inter'
    }
    
    output = ""
    
    if args.type in ['website', 'both']:
        # Generate website concept
        website_html = generate_website_concept(args.project, args.style, colors)
        
        if args.output and args.type == 'website':
            output_file = args.output if args.output.endswith('.html') else f"{args.output}.html"
            with open(output_file, 'w') as f:
                f.write(website_html)
            print(f"Website concept saved to {output_file}")
            
            # Also save style guide
            style_guide = generate_style_guide(args.project, colors, typography)
            guide_file = output_file.replace('.html', '_style_guide.json')
            with open(guide_file, 'w') as f:
                json.dump(style_guide, f, indent=2)
            print(f"Style guide saved to {guide_file}")
        else:
            output = website_html
    
    if args.type in ['marketing', 'both']:
        # Generate marketing specifications
        marketing = generate_marketing_concept(args.project, args.style)
        
        if args.output:
            output_file = args.output if args.output.endswith('.json') else f"{args.output}_marketing.json"
            with open(output_file, 'w') as f:
                json.dump(marketing, f, indent=2)
            print(f"Marketing specifications saved to {output_file}")
        else:
            output = json.dumps(marketing, indent=2)
    
    if not args.output:
        print(output)

if __name__ == "__main__":
    main()