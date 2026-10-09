---
topic: Segment Tree
pattern: [Min segment tree]
source: GFG
difficulty: Medium
companies: [Meta]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Range Minimum Query

> [!TIP]
> **🧠 Memory hook**
> Each manager reports the weakest member; out-of-range answers +∞ so it never wins.
> **Mantra: COMBINE = MIN, IDENTITY = +∞**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=1) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
Build a segment tree and answer `RMQ(st, n, a, b)` = min of `arr[a..b]`.

## Key insight
The same template as the sum tree with `Math.min` and `Integer.MAX_VALUE`. For range max, use `Math.max` and `Integer.MIN_VALUE`.

## Approach: Min segment tree
```java
// Leaf stores the value, inner node stores min of children
static void build(int[] tree, int i, int l, int r, int[] a) {
    if (l == r) { tree[i] = a[l]; return; }
    int mid = (l + r) >>> 1;
    build(tree, 2 * i + 1, l, mid, a);
    build(tree, 2 * i + 2, mid + 1, r, a);
    tree[i] = Math.min(tree[2 * i + 1], tree[2 * i + 2]);
}

// Returns the segment tree array for a
static int[] constructST(int[] a, int n) {
    int[] tree = new int[4 * n];
    build(tree, 0, 0, n - 1, a);
    return tree;
}

// No overlap → +infinity (identity for min), full overlap → node, partial → min of children
static int query(int[] tree, int i, int l, int r, int ql, int qr) {
    if (r < ql || l > qr) return Integer.MAX_VALUE;
    if (ql <= l && r <= qr) return tree[i];
    int mid = (l + r) >>> 1;
    return Math.min(query(tree, 2 * i + 1, l, mid, ql, qr), query(tree, 2 * i + 2, mid + 1, r, ql, qr));
}

// GFG signature: minimum of a[from..to]
static int RMQ(int[] st, int n, int from, int to) {
    return query(st, 0, 0, n - 1, from, to);
}
```

| Approach | Time | Space |
|---|---|---|
| Min segment tree | O(n) build, O(log n) query | O(4n) |

## Recall before you reveal
<details><summary>Identity for max?</summary>

`Integer.MIN_VALUE`.

</details>


## Connected
- [Range Maximum Index Query](Range%20Maximum%20Index%20Query.md)
