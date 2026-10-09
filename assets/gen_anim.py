import json, re, runpy, sys
from pathlib import Path

BRAIN = Path(__file__).resolve().parent.parent


# Converts the small markdown used in data files (bold, code, wikilinks) to HTML
def md(s):
    s = s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'`(.+?)`', r'<code>\1</code>', s)
    s = re.sub(r'\[\[(?:[^\]|]*\|)?([^\]]+)\]\]', r'\1', s)
    return s


# Writes the animation page for one topic from its data file plus <key>.anim.js
def build(data_path):
    t = runpy.run_path(data_path)['TOPIC']
    anim_js = Path(data_path).with_suffix('.anim.js').read_text()
    titles = [p['title'] for p in t['problems']]
    depth = len(Path(t['dir']).parts)
    up = '../' * depth
    meta = []
    for k, p in enumerate(t['problems']):
        links = []
        for c in p['connected']:
            m = re.match(r'\[\[([^\]|]+)(?:\|[^\]]*)?\]\]', c)
            if m and m.group(1) in titles:
                links.append([m.group(1), titles.index(m.group(1))])
        meta.append(dict(name=p['title'], hook=md(p['hook']), mantra=p['mantra'], statement=md(p['statement']),
                         recall=[[md(q), md(a)] for q, a in p['recall']], links=links))
    sub = md(t['hook'].split('\n')[0])
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{t['name']} Animations</title>
<link rel="stylesheet" href="{up}assets/brain-anim.css">
</head>
<body>
<div id="app"></div>
<script src="{up}assets/problem-links.js"></script>
<script src="{up}assets/solved.js"></script>
<script src="{up}assets/progress.js"></script>
<script src="{up}assets/brain-anim.js"></script>
<script src="{up}assets/tree-kit.js"></script>
<script>
const {{ lane, tree, recorder, mount, ln }} = BrainAnim;
const {{ C, A, Q, S, R, make, levelStory, nodeStory }} = TK;
const grid = BrainAnim.grid;
const ANIM = {{}};
{anim_js}
const META = {json.dumps(meta, ensure_ascii=False)};
mount({{
  title: {json.dumps(t['name'] + ' Animations')},
  sub: {json.dumps(sub, ensure_ascii=False)},
  problems: META.map(m => {{
    if (!ANIM[m.name]) throw new Error('missing animation: ' + m.name);
    return {{ name: m.name, hook: m.hook, mantra: m.mantra, statement: m.statement, anims: ANIM[m.name], recall: m.recall, links: m.links }};
  }})
}});
</script>
</body>
</html>
'''
    out = BRAIN / t['dir'] / t['anim']
    out.write_text(html)
    print(f'wrote {out.relative_to(BRAIN)} ({len(meta)} problems)')


if __name__ == '__main__':
    build(sys.argv[1])
