---
topic: Segment Tree
pattern: [Max segment tree, TreeSet neighbours]
source: LeetCode 3161
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Block Placement Queries

> [!TIP]
> **🧠 Memory hook**
> Fence posts: write the gap to the previous post on each post; a block fits if some earlier gap or the tail stretch is long enough.
> **Mantra: GAP AT EACH OBSTACLE, MAX UP TO prev(x), CHECK TAIL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=9) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
Type 1 adds an obstacle at x. Type 2 asks if a block of size sz fits within [0, x].

## Key insight
Store `gap[x] = x − prev(x)` at index x in a max tree. Inserting x also shrinks the next obstacle's gap. A query = max(max gap on [0, prev(x)], x − prev(x)) ≥ sz.

## Approach 1: Brute force (scan obstacles)
```java
// Approach 1 (brute force): scan obstacles in order up to x
static List<Boolean> brute(int[][] queries) {
    TreeSet<Integer> st = new TreeSet<>();
    List<Boolean> res = new ArrayList<>();
    for (int[] q : queries) {
        if (q[0] == 1) { st.add(q[1]); continue; }
        int prev = 0;
        boolean found = false;
        for (int c : st) {
            if (c > q[1]) break;
            if (c - prev >= q[2]) { found = true; break; }
            prev = c;
        }
        res.add(found || q[1] - prev >= q[2]);
    }
    return res;
}
```

## Approach 2: Max tree + TreeSet
```java
// Sets the gap ending at obstacle position idx
private void set(int i, int l, int r, int idx, int val) {
    if (l == r) { tree[i] = val; return; }
    int mid = (l + r) >>> 1;
    if (idx <= mid) set(2 * i + 1, l, mid, idx, val);
    else set(2 * i + 2, mid + 1, r, idx, val);
    tree[i] = Math.max(tree[2 * i + 1], tree[2 * i + 2]);
}

// Largest gap among obstacles positioned in [ql, qr]
private int max(int i, int l, int r, int ql, int qr) {
    if (r < ql || l > qr) return 0;
    if (ql <= l && r <= qr) return tree[i];
    int mid = (l + r) >>> 1;
    return Math.max(max(2 * i + 1, l, mid, ql, qr), max(2 * i + 2, mid + 1, r, ql, qr));
}

// gap[x] = x - previous obstacle, stored at x; a query checks max gap up to prev(x) and the tail x - prev(x)
public List<Boolean> getResults(int[][] queries) {
    TreeSet<Integer> obstacles = new TreeSet<>();
    obstacles.add(0);
    List<Boolean> res = new ArrayList<>();
    for (int[] q : queries) {
        int x = q[1];
        if (q[0] == 1) {
            int pre = obstacles.lower(x);
            Integer nxt = obstacles.higher(x);
            set(0, 0, N - 1, x, x - pre);
            if (nxt != null) set(0, 0, N - 1, nxt, nxt - x);
            obstacles.add(x);
        } else {
            int pre = obstacles.floor(x);
            int best = Math.max(max(0, 0, N - 1, 0, pre), x - pre);
            res.add(best >= q[2]);
        }
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force (scan obstacles) | O(Q·N) | O(N) |
| Max tree + TreeSet | O(Q log C) | O(C) |

## Recall before you reveal
<details><summary>Which two gaps change on insert?</summary>

gap[x] and gap[next(x)].

</details>


<details><summary>Why the tail?</summary>

The space between the last obstacle ≤ x and x itself is not stored.

</details>


## Connected
- [Fruits Into Baskets II and III](Fruits%20Into%20Baskets%20II%20and%20III.md)
