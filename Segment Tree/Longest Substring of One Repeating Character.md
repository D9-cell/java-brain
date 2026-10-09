---
topic: Segment Tree
pattern: [Custom node merge]
source: LeetCode 2213
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Longest Substring of One Repeating Character

> [!TIP]
> **🧠 Memory hook**
> Summary cards with left-run, right-run and best; runs can cross the glue line.
> **Mantra: PRE · SUF · BEST, CROSS = L.suf + R.pre**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=10) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
After each single-character update, return the longest substring made of one repeating character.

## Key insight
Node = (pre, suf, best, leftChar, rightChar). Merge: best = max(L.best, R.best, L.suf + R.pre if the chars match); pre/suf extend across when one side is a full run.

## Approach: Summary segment tree
```java
// Segment summary: longest run starting at the left edge, ending at the right edge, anywhere inside
static class Node {
    int pre, suf, best;
    char lc, rc;

    Node(int pre, int suf, int best, char lc, char rc) {
        this.pre = pre; this.suf = suf; this.best = best; this.lc = lc; this.rc = rc;
    }
}

// Combines two neighbours; runs join only when the touching characters match
static Node merge(Node L, Node R, int lenL, int lenR) {
    boolean join = L.rc == R.lc;
    int pre = (L.pre == lenL && join) ? L.pre + R.pre : L.pre;
    int suf = (R.suf == lenR && join) ? R.suf + L.suf : R.suf;
    int best = Math.max(L.best, R.best);
    if (join) best = Math.max(best, L.suf + R.pre);
    return new Node(pre, suf, best, L.lc, R.rc);
}

// Builds summaries bottom-up
private void build(int i, int l, int r, char[] s) {
    if (l == r) { tree[i] = new Node(1, 1, 1, s[l], s[l]); return; }
    int mid = (l + r) >>> 1;
    build(2 * i + 1, l, mid, s);
    build(2 * i + 2, mid + 1, r, s);
    tree[i] = merge(tree[2 * i + 1], tree[2 * i + 2], mid - l + 1, r - mid);
}

// Changes one character and re-merges the path to the root
private void update(int i, int l, int r, int pos, char ch) {
    if (l == r) { tree[i] = new Node(1, 1, 1, ch, ch); return; }
    int mid = (l + r) >>> 1;
    if (pos <= mid) update(2 * i + 1, l, mid, pos, ch);
    else update(2 * i + 2, mid + 1, r, pos, ch);
    tree[i] = merge(tree[2 * i + 1], tree[2 * i + 2], mid - l + 1, r - mid);
}

// After each update the answer is the root's best
public int[] longestRepeating(String s, String queryCharacters, int[] queryIndices) {
    int n = s.length();
    tree = new Node[4 * n];
    build(0, 0, n - 1, s.toCharArray());
    int[] res = new int[queryIndices.length];
    for (int k = 0; k < res.length; k++) {
        update(0, 0, n - 1, queryIndices[k], queryCharacters.charAt(k));
        res[k] = tree[0].best;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Summary segment tree | O(n + k log n) | O(4n) |

## Recall before you reveal
<details><summary>When does pre extend into R?</summary>

L.pre == lenL and L.rc == R.lc.

</details>


## Connected
- Custom merge again: [Find X Value of Array II](Find%20X%20Value%20of%20Array%20II.md)
