---
topic: Segment Tree
pattern: [Index segment tree]
source: Concept
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Range Maximum Index Query

> [!TIP]
> **🧠 Memory hook**
> Managers report WHO is strongest (an ID); comparisons look the value up in the array.
> **Mantra: STORE INDEX, COMPARE a[x] ≥ a[y]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=2) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
Return the index of the maximum value in `arr[a..b]` (leftmost on ties).

## Key insight
Store indices in the tree; `better(x, y)` compares `a[x]` and `a[y]`; -1 is the "no overlap" identity.

## Approach: Index segment tree
```java
// Picks the index with the larger value, preferring the left one on ties
static int better(int[] a, int x, int y) {
    if (x == -1) return y;
    if (y == -1) return x;
    return a[x] >= a[y] ? x : y;
}

// Leaf stores its own index, inner node stores the better child index
static void build(int[] tree, int i, int l, int r, int[] a) {
    if (l == r) { tree[i] = l; return; }
    int mid = (l + r) >>> 1;
    build(tree, 2 * i + 1, l, mid, a);
    build(tree, 2 * i + 2, mid + 1, r, a);
    tree[i] = better(a, tree[2 * i + 1], tree[2 * i + 2]);
}

// No overlap → -1, full overlap → stored index, partial → better of children
static int query(int[] tree, int i, int l, int r, int ql, int qr, int[] a) {
    if (r < ql || l > qr) return -1;
    if (ql <= l && r <= qr) return tree[i];
    int mid = (l + r) >>> 1;
    return better(a, query(tree, 2 * i + 1, l, mid, ql, qr, a), query(tree, 2 * i + 2, mid + 1, r, ql, qr, a));
}
```

| Approach | Time | Space |
|---|---|---|
| Index segment tree | O(log n) per query | O(4n) |

## Recall before you reveal
<details><summary>Tie rule?</summary>

`>=` keeps the left index.

</details>


## Connected
- Used by [Find Building Where Alice and Bob Can Meet](Find%20Building%20Where%20Alice%20and%20Bob%20Can%20Meet.md)
