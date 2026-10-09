# Java Brain

Data structures and algorithms in **Java**, learned the way memory works: a step-by-step animation for every approach, a memory hook and mantra per problem, recall questions, and spaced-repetition notes.

**Open the site:** https://d9-cell.github.io/java-brain/

- **Hub**: every topic and problem on one page, with search, an *Unsolved / Solved* filter and progress bars.
- **Animations**: each topic page steps through the Java code line by line (Predict mode hides the explanation so you can guess first).
- **Notes**: every problem has an Obsidian note with the problem, the key insight, the Java solutions, complexity and recall questions. Click **📖 Note** on any animation, or browse the folders here on GitHub.
- **Solve links**: each problem links to LeetCode, GeeksforGeeks or CSES.

## Track what you have solved (stays in your browser)

There is no account and no server. Your usernames, ticks and synced lists are stored only in your own browser (`localStorage`).

1. Tick problems by hand on the hub or with **Mark solved** on any animation page.
2. Or sync what you already solved:
   1. On the hub open **Connect your profiles**, enter your usernames and press **Save**.
   2. Drag the **⟳ Java Brain · LeetCode** and **⟳ Java Brain · GfG** buttons onto your bookmarks bar.
   3. Open leetcode.com (logged in) and click the LeetCode bookmark. You return to the hub with your full solved history ticked. Do the same on geeksforgeeks.org.

The bookmarks run on those sites only when you click them, read your own solved list there, and pass it back in the link to this page. You can read their code in `index.html`. **Export progress** saves a backup file; **Import progress** restores it on another browser or device. CodeChef does not publish solved problems, so tick those by hand.

## Use it as an Obsidian vault

Clone the repo and open the folder in Obsidian (*Open folder as vault*). `00 Brain Map.md` is the starting point; every topic has a *Pattern Map* note. `Review Dashboard.md` needs the Dataview plugin.

```bash
git clone https://github.com/D9-cell/java-brain.git
```

## How it is built

- `index.html`: the hub.
- `<Topic>/<Topic> Animations.html`: animation pages; `assets/brain-anim.js` is the step player.
- `assets/progress.js`: solved tracking in the browser.
- `assets/problem-links.js`: problem titles and platform links.
- `assets/data/*.py` + `*.anim.js`: the source for generated notes and pages (`gen_notes.py`, `gen_anim.py`, `gen_links.py`; `check_anim.js` validates every animation step).

Every Java solution was checked against a brute-force version on small random inputs when it was written.

Work in progress: Dynamic Programming is being added group by group.
