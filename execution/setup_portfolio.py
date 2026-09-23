"""
Deterministic script to setup assets, verify file structure,
and run local test server for Canada-inspired portfolio website.
Adheres to Layer 3 Execution in the 3-Layer Architecture.
"""

import os
import sys
import urllib.request
import http.server
import socketserver
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
ASSETS_DIR = BASE_DIR / "assets"
TMP_DIR = BASE_DIR / ".tmp"

SVG_ASSETS = {
    "arrow-up-right.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>''',
    "cart-icon.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>''',
    "play-icon.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>''',
    "close-icon.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>''',
    "monitor-icon.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>''',
    "smartphone-icon.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>''',
    "anchor-icon.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path></svg>''',
    "menu-icon.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>''',
    "reel-badge.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="160" height="160">
  <defs>
    <path id="textCircle" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none" />
  </defs>
  <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" stroke-dasharray="4 4" />
  <circle cx="100" cy="100" r="36" fill="#ffffff" />
  <polygon points="95,90 110,100 95,110" fill="#000000" />
  <text font-family="'Manrope', sans-serif" font-size="11.5" font-weight="700" letter-spacing="3.2" fill="#ffffff">
    <textPath href="#textCircle" startOffset="0%">
      PLAY SHOWREEL • MOTION &amp; PRODUCT DESIGN •
    </textPath>
  </text>
</svg>'''
}

def setup_directories():
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    (BASE_DIR / "css").mkdir(parents=True, exist_ok=True)
    (BASE_DIR / "js").mkdir(parents=True, exist_ok=True)
    print("[OK] Directories initialized.")

def create_svg_assets():
    for filename, content in SVG_ASSETS.items():
        filepath = ASSETS_DIR / filename
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"[OK] Generated asset: {filename}")

def serve(port=3000):
    os.chdir(BASE_DIR)
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"Portfolio serving live at http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer terminated.")

if __name__ == "__main__":
    setup_directories()
    create_svg_assets()
    if len(sys.argv) > 1 and sys.argv[1] == "serve":
        port = int(sys.argv[2]) if len(sys.argv) > 2 else 3000
        serve(port)
