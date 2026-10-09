---
topic: Segment Tree
pattern: [Range max index, Binary search]
source: LeetCode 2940
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Find Building Where Alice and Bob Can Meet

> [!TIP]
> **🧠 Memory hook**
> Climb only right and up. If Bob is already taller, meet at Bob's; else find the first tower taller than both.
> **Mantra: BOB TALLER? BOB : BINARY SEARCH + RMQ**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=7) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
For each query (a, b), find the leftmost building index where both can meet, or -1.

## Key insight
With a ≤ b: answer b if a == b or h[b] > h[a]. Otherwise binary-search the smallest mid with max(h[b+1..mid]) > max(h[a], h[b]).

## Approach: Binary search + RMQ index tree
```java
// Index of the taller building, leftmost on ties
private int better(int x, int y) {
    if (x == -1) return y;
    if (y == -1) return x;
    return h[x] >= h[y] ? x : y;
}

// Leaf stores its index, inner node stores the index of the max height
private void build(int i, int l, int r) {
    if (l == r) { tree[i] = l; return; }
    int mid = (l + r) >>> 1;
    build(2 * i + 1, l, mid);
    build(2 * i + 2, mid + 1, r);
    tree[i] = better(tree[2 * i + 1], tree[2 * i + 2]);
}

// Index of the maximum height in [ql, qr]
private int query(int i, int l, int r, int ql, int qr) {
    if (r < ql || l > qr) return -1;
    if (ql <= l && r <= qr) return tree[i];
    int mid = (l + r) >>> 1;
    return better(query(2 * i + 1, l, mid, ql, qr), query(2 * i + 2, mid + 1, r, ql, qr));
}

// If bob can be reached directly use him; else binary-search the leftmost index right of bob taller than both
public int[] leftmostBuildingQueries(int[] heights, int[][] queries) {
    h = heights;
    int n = h.length;
    tree = new int[4 * n];
    build(0, 0, n - 1);
    int[] res = new int[queries.length];
    for (int k = 0; k < queries.length; k++) {
        int a = Math.min(queries[k][0], queries[k][1]), b = Math.max(queries[k][0], queries[k][1]);
        if (a == b || h[b] > h[a]) { res[k] = b; continue; }
        int need = Math.max(h[a], h[b]), lo = b + 1, hi = n - 1, ans = -1;
        while (lo <= hi) {
            int mid = (lo + hi) >>> 1;
            if (h[query(0, 0, n - 1, b + 1, mid)] > need) { ans = mid; hi = mid - 1; }
            else lo = mid + 1;
        }
        res[k] = ans;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + RMQ index tree | O(n + q log² n) | O(4n) |

## Recall before you reveal
<details><summary>Faster idea?</summary>

Descend the max tree for the first index > value (O(log n)), or offline with a monotonic stack.

</details>


## Connected
- Index tree from [Range Maximum Index Query](Range%20Maximum%20Index%20Query.md)
