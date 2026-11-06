"""Refresh the editable homepage and local styles from the public source."""

import html
from pathlib import Path
import re
from urllib.parse import urljoin
from urllib.request import Request, urlopen


SOURCE = "https://emorypresbyterian.org/"
ROOT = Path(__file__).resolve().parent
CSS_DIR = ROOT / "assets" / "css"
CSS_DIR.mkdir(parents=True, exist_ok=True)


def fetch(url):
    request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(request, timeout=60) as response:
        return response.read().decode("utf-8-sig")


def absolute_css(css, base):
    def replace(match):
        value = match.group(2).strip()
        if value.startswith(("data:", "#")):
            return match.group(0)
        return 'url("' + urljoin(base, value) + '")'

    return re.sub(r"""url\(\s*(["']?)(.*?)\1\s*\)""", replace, css)


page = fetch(SOURCE)
allowed_scripts = {
    "jquery-core-js",
    "jquery-migrate-js",
    "divi-custom-script-js-extra",
    "divi-custom-script-js",
    "et-core-common-js",
    "wt26-footer-move-js",
    "wt26-aria-main-js",
    "leaflet-js-js",
    "wt26-divi-leaflet-maps-js",
}


def filter_script(match):
    script = match.group(0)
    identity = re.search(r"""\bid=["']([^"']+)""", script)
    if identity and identity.group(1) in allowed_scripts:
        return script
    if "var et_link_options_data =" in script:
        return script
    return ""


page = re.sub(r"<script\b[^>]*>.*?</script\s*>", filter_script, page,
              flags=re.I | re.S)
page = re.sub(r"<base\b[^>]*>", "", page, flags=re.I)
page = re.sub(r"<link\b[^>]*rel=['\"](?:canonical|shortlink|pingback)['\"][^>]*>",
              "", page, flags=re.I)

styles = []


def local_stylesheet(match):
    tag = match.group(0)
    if not re.search(r"""rel=["']stylesheet["']""", tag, re.I):
        return tag
    href = re.search(r"""href=(["'])(.*?)\1""", tag, re.S)
    if not href:
        return tag
    url = urljoin(SOURCE, html.unescape(href.group(2)))
    name = f"source-{len(styles) + 1:02d}.css"
    css = absolute_css(fetch(url), url)
    (CSS_DIR / name).write_text(css, encoding="utf-8")
    styles.append(url)
    return tag[:href.start(2)] + f"assets/css/{name}" + tag[href.end(2):]


page = re.sub(r"<link\b[^>]*>", local_stylesheet, page, flags=re.I)

# Inline background images and root-relative media must still use the live host.
page = re.sub(r"<style\b[^>]*>.*?</style>", lambda m: absolute_css(m.group(0), SOURCE),
              page, flags=re.I | re.S)
page = re.sub(r"""(\b(?:src|href|action|poster)=)(["'])(/[^"']*)\2""",
              lambda m: m.group(1) + m.group(2) + urljoin(SOURCE, m.group(3)) + m.group(2),
              page, flags=re.I)
page = re.sub(r"""(\bstyle=)(["'])(.*?)\2""",
              lambda m: m.group(1) + m.group(2) + absolute_css(m.group(3), SOURCE) + m.group(2),
              page, flags=re.I | re.S)
# The local home link stays here; all other navigation points to the source site.
page = re.sub(r"""href=(["'])https://emorypresbyterian\.org/\1""",
              'href="./"', page)
page = re.sub(r"<form\b[^>]*>", lambda m: re.sub(
    r"""\s(?:action|target|onsubmit)=(["']).*?\1""", "", m.group(0), flags=re.I),
    page, flags=re.I | re.S)
page = re.sub(r"""\son\w+=(["'])[^"']*gform\.[^"']*\1""", "", page, flags=re.I)
page = re.sub(r"<iframe\b[^>]*id=['\"]gform_ajax_frame[^>]*>.*?</iframe>",
              "", page, flags=re.I | re.S)
page = page.replace("</head>", '<link rel="stylesheet" href="preview.css">\n</head>')
page = page.replace("</body>", '<script src="preview.js"></script>\n</body>')
(ROOT / "original.html").write_text(page, encoding="utf-8")
print(f"Saved original.html and {len(styles)} local stylesheets. Images remain remote.")
