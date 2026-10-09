import os, re, sys, runpy, textwrap, datetime, urllib.parse
from pathlib import Path

BRAIN = Path(__file__).resolve().parent.parent
VAULT_URL = 'file://' + urllib.parse.quote(str(BRAIN))


# Pulls a method or class (with the comment line above it) out of a Java file by name
def extract(java_text, name):
    lines = java_text.split('\n')
    pat = re.compile(r'(\b(class|interface|enum|record)\s+%s\b)|(^\s*(public |private |protected |static |final |<[^>]+> )*[\w<>\[\], ]+\s+%s\s*\()|(^\s*(public |private )?%s\s*\()' % (name, name, name))
    for i, l in enumerate(lines):
        if pat.search(l) and not l.strip().startswith(('return', '//')) and not l.rstrip().endswith(';'):
            start = i - 1 if i > 0 and lines[i - 1].strip().startswith('//') else i
            depth, j, seen = 0, i, False
            while j < len(lines):
                depth += lines[j].count('{') - lines[j].count('}')
                seen = seen or '{' in lines[j]
                if seen and depth == 0:
                    break
                j += 1
            return textwrap.dedent('\n'.join(lines[start:j + 1]))
    raise SystemExit(f'extract: {name} not found')


# Writes one problem note from its data dict
def problem_note(t, p, today):
    java_path = Path(os.environ.get('JAVA_SRC', BRAIN / t['dir'] / 'java')) / (p['java'] + '.java')
    java_text = java_path.read_text()
    anim = f"{VAULT_URL}/{urllib.parse.quote(t['dir'])}/{urllib.parse.quote(t['anim'])}#p={p['tab']}"
    cpp = f" · **Original C++:** [[{p['cpp']}|C++ file]]" if p.get('cpp') else ''
    fm = ['---', f"topic: {t['name']}", f"pattern: [{', '.join(p['patterns'])}]", f"source: {p['src']}",
          f"difficulty: {p['diff']}"]
    if p.get('companies'):
        fm.append(f"companies: [{', '.join(p['companies'])}]")
    fm += ['review_stage: 0', f"next_review: {today + datetime.timedelta(days=1)}", f"tags: [java-brain, {t['tag']}]", '---']
    out = fm + [f"# {p['title']}", '', '> [!tip] 🧠 Memory hook', f"> {p['hook']}", f"> **Mantra: {p['mantra']}**", '',
                f"**Animation:** [▶ Open in browser]({anim}) · **Pattern hub:** [[{t['name']} - Pattern Map]]{cpp}", '',
                '## Problem', p['statement'].strip(), '']
    if p.get('insight'):
        out += ['## Key insight', p['insight'].strip(), '']
    rows = []
    for k, a in enumerate(p['approaches'], 1):
        out += [f"## Approach {k}: {a['name']}" if len(p['approaches']) > 1 else f"## Approach: {a['name']}"]
        if a.get('explain'):
            out += [a['explain'].strip(), '']
        code = '\n\n'.join(extract(java_text, n) for n in a['code'])
        out += ['```java', code, '```', '']
        rows.append(f"| {a['name']} | {a['time']} | {a['space']} |")
    out += ['| Approach | Time | Space |', '|---|---|---|'] + rows + ['']
    if p.get('gotcha'):
        out += ['> [!warning] Java gotcha', f"> {p['gotcha']}", '']
    out += ['## Recall before you reveal']
    for q, a in p['recall']:
        out += [f'> [!question]- {q}', '> ' + a.replace('\n', '\n> '), '']
    if p.get('connected'):
        out += ['## Connected'] + [f'- {c}' for c in p['connected']] + ['']
    (BRAIN / t['dir'] / f"{p['title']}.md").write_text('\n'.join(out))


# Writes the topic hub note
def hub_note(t):
    anim = f"{VAULT_URL}/{urllib.parse.quote(t['dir'])}/{urllib.parse.quote(t['anim'])}"
    out = ['---', f"topic: {t['name']}", 'type: pattern-map', 'tags: [java-brain, pattern-map]', '---',
           f"# {t['name']}: Pattern Map", '', '> [!tip] 🧠 One picture to keep', '> ' + t['hook'].strip().replace('\n', '\n> '), '',
           f"**All animations:** [▶ {t['name']} Animations]({anim}) · ⬆ [[00 Brain Map]]", '']
    if t.get('toolkit'):
        out += ['## Java toolkit', t['toolkit'].strip(), '']
    if t.get('mermaid'):
        out += ['## Patterns in this folder', '```mermaid', t['mermaid'].strip(), '```', '']
    out += ['| # | Problem | Pattern | Mantra | Level |', '|---|---|---|---|---|']
    for k, p in enumerate(t['problems'], 1):
        out.append(f"| {k} | [[{p['title']}]] | {', '.join(p['patterns'])} | {p['mantra']} | {p['diff']} |")
    out.append('')
    if t.get('order'):
        out += ['## Suggested learning order', t['order'].strip(), '']
    if t.get('cross'):
        out += ['## Connections to other folders'] + [f'- {c}' for c in t['cross']] + ['']
    (BRAIN / t['dir'] / f"{t['name']} - Pattern Map.md").write_text('\n'.join(out))


# Entry point: JAVA_SRC=<dir with tested .java files> python3 gen_notes.py <topic_data.py>
if __name__ == '__main__':
    t = runpy.run_path(sys.argv[1])['TOPIC']
    today = datetime.date.today()
    for k, p in enumerate(t['problems']):
        p.setdefault('tab', k)
        problem_note(t, p, today)
    hub_note(t)
    print(f"{t['name']}: {len(t['problems'])} notes + hub written")
