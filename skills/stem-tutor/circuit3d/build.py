"""Build one self-contained circuit page: python build.py scene.json out.html
The engine (viewer.html + sim.js) is never rewritten. Only the scene JSON changes per photo."""
import json, sys, pathlib
here = pathlib.Path(__file__).parent
scene = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))  # fails early on bad JSON
html = (here / 'viewer.html').read_text(encoding='utf-8')
html = (html.replace('{{TITLE}}', scene.get('title', 'Circuit'))
            .replace('/*SIM*/', (here / 'sim.js').read_text(encoding='utf-8'))
            .replace('/*SCENE*/', json.dumps(scene, ensure_ascii=False).replace('</', '<\\/')))
pathlib.Path(sys.argv[2]).write_text(html, encoding='utf-8')
print('wrote', sys.argv[2], len(html) // 1024, 'KB')
