#!/bin/sh
# Assembles src/ + assets/ into one self-contained index.html.
set -e
cd "$(dirname "$0")"
cat src/01-head.html src/02-body.html src/03-content.js src/04-art.js src/04b-land.js src/05-views.js src/06-app.js > /tmp/21knots.raw.html
python3 - <<'PY'
import os, re
s = open('/tmp/21knots.raw.html').read()
keys = {'LOGO': 'logo', 'SHIP': 'ship'}
for f in os.listdir('assets'):
    if f.endswith('.b64'): keys.setdefault(f[:-4], f[:-4])
for k, f in keys.items():
    s = s.replace('%%' + k + '%%', open('assets/' + f + '.b64').read().strip())
left = re.findall(r'%%[A-Z_]+%%', s)
assert not left, left
open('index.html', 'w').write(s)
PY
echo "built index.html ($(wc -c < index.html) bytes)"
