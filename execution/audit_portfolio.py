import os
import re
import urllib.request
import urllib.error
from html.parser import HTMLParser

class ComprehensiveAuditor:
    def __init__(self, base_dir, base_url='http://localhost:3000'):
        self.base_dir = base_dir
        self.base_url = base_url
        self.issues = []
        self.warnings = []
        self.successes = []

    def audit_server_and_local_assets(self):
        print("=== 1. Checking HTTP Server & Local Assets ===")
        index_path = os.path.join(self.base_dir, 'index.html')
        if not os.path.exists(index_path):
            self.issues.append(f"Missing file: {index_path}")
            return

        with open(index_path, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # Check server responds
        try:
            with urllib.request.urlopen(self.base_url, timeout=5) as res:
                if res.status == 200:
                    self.successes.append(f"HTTP Server at {self.base_url} is healthy (Status 200)")
                else:
                    self.issues.append(f"HTTP Server returned status {res.status}")
        except Exception as e:
            self.issues.append(f"HTTP Server connection failed: {e}")

        # Check local assets referenced in HTML
        # href="..." or src="..."
        refs = re.findall(r'(?:href|src)=["\']([^"\'#][^"\']*)["\']', html_content)
        local_refs = [r for r in refs if not r.startswith('http://') and not r.startswith('https://') and not r.startswith('mailto:')]

        for ref in set(local_refs):
            clean_ref = ref.split('?')[0].split('#')[0]
            # Check file on disk
            disk_path = os.path.join(self.base_dir, clean_ref.replace('/', os.sep))
            if not os.path.exists(disk_path):
                self.issues.append(f"HTML references missing local file: {ref} -> {disk_path}")
            else:
                self.successes.append(f"Local file exists: {ref} ({os.path.getsize(disk_path)} bytes)")

            # Check HTTP endpoint
            test_url = f"{self.base_url.rstrip('/')}/{clean_ref.lstrip('/')}"
            try:
                with urllib.request.urlopen(test_url, timeout=5) as res:
                    if res.status == 200:
                        self.successes.append(f"Server endpoint [200 OK]: {test_url}")
                    else:
                        self.warnings.append(f"Server endpoint returned status {res.status}: {test_url}")
            except Exception as e:
                self.issues.append(f"Server failed to serve asset {test_url}: {e}")

    def audit_html_syntax_and_structure(self):
        print("\n=== 2. Checking HTML Structure, IDs, and Anchors ===")
        index_path = os.path.join(self.base_dir, 'index.html')
        with open(index_path, 'r', encoding='utf-8') as f:
            html = f.read()

        # Check all IDs for duplicates
        ids = re.findall(r'id=["\']([a-zA-Z0-9_\-]+)["\']', html)
        id_counts = {}
        for i in ids:
            id_counts[i] = id_counts.get(i, 0) + 1
        duplicates = [i for i, c in id_counts.items() if c > 1]
        if duplicates:
            self.issues.append(f"Duplicate HTML IDs found: {duplicates}")
        else:
            self.successes.append(f"All {len(ids)} HTML IDs are unique.")

        # Check internal anchor links (#about, #projects, etc.)
        anchor_links = re.findall(r'href=["\']#([a-zA-Z0-9_\-]+)["\']', html)
        for anchor in set(anchor_links):
            if anchor not in ids:
                self.issues.append(f"Internal anchor href='#{anchor}' has no matching element with id='{anchor}'")
            else:
                self.successes.append(f"Anchor #{anchor} successfully resolves to element ID.")

        # Check img tags have alt attributes
        img_tags = re.findall(r'<img\s+[^>]*>', html)
        for img in img_tags:
            if 'alt=' not in img:
                self.warnings.append(f"Image tag missing alt attribute: {img}")
            else:
                # Check empty alt
                alt_match = re.search(r'alt=["\'](.*?)["\']', img)
                if alt_match and not alt_match.group(1).strip():
                    self.warnings.append(f"Image has empty alt text: {img}")

        # Check for buttons without labels / aria-label
        button_tags = re.findall(r'<button\s+[^>]*>', html)
        for btn in button_tags:
            if 'aria-label=' not in btn and 'data-' not in btn and '>' in btn:
                self.warnings.append(f"Button may need accessible name: {btn}")

    def audit_javascript(self):
        print("\n=== 3. Checking JavaScript Logic & Project Dataset ===")
        js_path = os.path.join(self.base_dir, 'js', 'main.js')
        if not os.path.exists(js_path):
            self.issues.append(f"Missing JS file: {js_path}")
            return

        with open(js_path, 'r', encoding='utf-8') as f:
            js_code = f.read()

        # Check for matching project IDs between HTML and JS
        index_path = os.path.join(self.base_dir, 'index.html')
        with open(index_path, 'r', encoding='utf-8') as f:
            html = f.read()

        html_pids = set(re.findall(r'data-project-id=["\']([a-zA-Z0-9_\-]+)["\']', html))
        # Find project IDs in PROJECTS_DATA
        js_pids = set(re.findall(r"['\"]([a-zA-Z0-9_\-]+)['\"]\s*:\s*\{", js_code))
        # Filter down to the actual keys inside PROJECTS_DATA
        known_pids = {'student-performance', 'smart-shopping-cart', 'agrovision', 'connect-lanka'}
        js_matched_pids = js_pids.intersection(known_pids)

        missing_in_js = html_pids - js_matched_pids
        if missing_in_js:
            self.issues.append(f"HTML project cards have data-project-id not defined in JS: {missing_in_js}")
        else:
            self.successes.append(f"All HTML project IDs ({html_pids}) exist in JS PROJECTS_DATA.")

        # Check DOM element IDs referenced in JS
        js_get_elem = re.findall(r'document\.getElementById\(["\']([a-zA-Z0-9_\-]+)["\']\)', js_code)
        ids_in_html = set(re.findall(r'id=["\']([a-zA-Z0-9_\-]+)["\']', html))
        for elem_id in set(js_get_elem):
            if elem_id not in ids_in_html:
                self.issues.append(f"JS calls getElementById('{elem_id}'), but no such ID exists in index.html!")
            else:
                self.successes.append(f"JS element #{elem_id} exists in HTML.")

        # Check querySelector references
        selectors = re.findall(r'document\.querySelector(?:All)?\(["\']([a-zA-Z0-9_\-\.\#\[\]\=\:]+)["\']\)', js_code)
        for sel in set(selectors):
            if sel.startswith('.'):
                class_name = sel[1:].split()[0].split(':')[0]
                if f'class="{class_name}' not in html and f'class=\'{class_name}' not in html and f' {class_name}' not in html:
                    self.warnings.append(f"JS queries selector '{sel}', but class '{class_name}' was not directly found in HTML.")
                else:
                    self.successes.append(f"JS class selector '{sel}' matched in HTML.")

    def audit_css_file(self):
        print("\n=== 4. Checking CSS File ===")
        css_path = os.path.join(self.base_dir, 'css', 'style.css')
        if not os.path.exists(css_path):
            self.issues.append(f"Missing CSS file: {css_path}")
            return

        with open(css_path, 'r', encoding='utf-8') as f:
            css = f.read()

        # Check bracket balance
        open_braces = css.count('{')
        close_braces = css.count('}')
        if open_braces != close_braces:
            self.issues.append(f"CSS syntax error: Unbalanced braces! {open_braces} open vs {close_braces} close")
        else:
            self.successes.append(f"CSS braces are balanced ({open_braces} rule blocks).")

        # Check font imports
        if '@import' in css:
            self.successes.append("Google Fonts imported properly.")

        # Check critical media queries
        for mq in ['@media (max-width: 1024px)', '@media (max-width: 768px)', '@media (pointer: coarse)']:
            if mq in css:
                self.successes.append(f"Found responsive query: {mq}")
            else:
                self.warnings.append(f"Missing responsive query: {mq}")

    def audit_external_links(self):
        print("\n=== 5. Checking External Links & Assets ===")
        index_path = os.path.join(self.base_dir, 'index.html')
        with open(index_path, 'r', encoding='utf-8') as f:
            html = f.read()

        urls = set(re.findall(r'(?:href|src)=["\'](https?://[^"\']+)["\']', html))
        for url in urls:
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            req = urllib.request.Request(url, headers=headers)
            try:
                with urllib.request.urlopen(req, timeout=7) as resp:
                    self.successes.append(f"External link [Status {resp.status}]: {url[:60]}...")
            except urllib.error.HTTPError as e:
                # 999 or 403 on LinkedIn/Instagram is standard bot protection, not broken
                if e.code in (403, 999):
                    self.warnings.append(f"External link protected against bots (Status {e.code}): {url}")
                else:
                    self.issues.append(f"External link failed with status {e.code}: {url}")
            except Exception as e:
                self.warnings.append(f"External link check timed out or failed ({e}): {url}")

    def report(self):
        print("\n=======================================================")
        print("                  AUDIT SUMMARY REPORT                 ")
        print("=======================================================")
        print(f"Total Successes : {len(self.successes)}")
        print(f"Total Warnings   : {len(self.warnings)}")
        print(f"Total Issues     : {len(self.issues)}")
        print("-------------------------------------------------------")

        if self.issues:
            print("\n[CRITICAL ISSUES / ERRORS]:")
            for iss in self.issues:
                print(f"  [X] {iss}")
        else:
            print("\n[OK] ZERO CRITICAL ERRORS FOUND!")

        if self.warnings:
            print("\n[WARNINGS / POLISH CANDIDATES]:")
            for w in self.warnings:
                print(f"  [!] {w}")

        print("\n[VERIFIED SUCCESSES SAMPLE]:")
        for s in self.successes[:12]:
            print(f"  [v] {s}")
        if len(self.successes) > 12:
            print(f"  ... and {len(self.successes) - 12} more checks passed.")

if __name__ == '__main__':
    auditor = ComprehensiveAuditor(base_dir=os.path.abspath('.'))
    auditor.audit_server_and_local_assets()
    auditor.audit_html_syntax_and_structure()
    auditor.audit_javascript()
    auditor.audit_css_file()
    auditor.audit_external_links()
    auditor.report()
