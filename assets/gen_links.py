import json, re, runpy, sys
from pathlib import Path

BRAIN = Path(__file__).resolve().parent.parent
LINKS = BRAIN / 'assets' / 'problem-links.js'


# Turns a data-file source string plus an optional explicit url into [label, url] pairs
def links_for(p, slugs):
    out, src = [], p['src']
    if 'LeetCode' in src:
        for n in re.findall(r'\d+', src.split('LeetCode', 1)[1]):
            if n in slugs: out.append([f'LeetCode {n}', f'https://leetcode.com/problems/{slugs[n]}/'])
    m = re.search(r'CSES (\d+)', src)
    if m: out.append([f'CSES {m[1]}', f'https://cses.fi/problemset/task/{m[1]}'])
    for u in ([p['url']] if isinstance(p.get('url'), str) else p.get('url') or []):
        out.append(['GfG' if 'geeksforgeeks' in u else 'CodeChef' if 'codechef' in u else 'Problem', u])
    return out


# Adds or replaces one page's entry in problem-links.js (python3 gen_links.py <topic_data.py>)
def update(data_path):
    t = runpy.run_path(data_path)['TOPIC']
    slugs = json.loads((BRAIN / 'assets' / 'data' / 'lc_slugs.json').read_text())
    text = LINKS.read_text()
    data = json.loads(text[text.index('{'):text.rindex('}') + 1])
    data[f"{t['dir']}/{t['anim']}"] = [[p['title'], links_for(p, slugs)] for p in t['problems']]
    body = ',\n'.join(json.dumps(h, ensure_ascii=False) + ': ' + json.dumps(v, ensure_ascii=False) for h, v in sorted(data.items()))
    LINKS.write_text(text[:text.index('{')] + '{\n' + body + '\n};\n')
    missing = [p['title'] for p in t['problems'] if not links_for(p, slugs)]
    print(f"links: {len(t['problems'])} problems" + (f", no link for {missing}" if missing else ''))


if __name__ == '__main__':
    update(sys.argv[1])
