"""Build one self-contained circuit page: python build.py scene.json out.html
Scene "-" = no scene: the page reads it from the URL hash or shows a paste box (hosted lab for any AI).
The engine (viewer.html + sim.js) is never rewritten. Only the scene JSON changes per photo."""
import json, sys, pathlib
here = pathlib.Path(__file__).parent
scene = None if sys.argv[1] == '-' else json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))  # fails early on bad JSON
html = (here / 'viewer.html').read_text(encoding='utf-8')
html = (html.replace('{{TITLE}}', (scene or {}).get('title', '3D circuit lab'))
            .replace('/*SIM*/', (here / 'sim.js').read_text(encoding='utf-8'))
            .replace('/*SCENE*/', '' if scene is None else json.dumps(scene, ensure_ascii=False).replace('</', '<\\/')))
pathlib.Path(sys.argv[2]).write_text(html, encoding='utf-8')
print('wrote', sys.argv[2], len(html) // 1024, 'KB')
