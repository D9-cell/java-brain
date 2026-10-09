---
topic: Segment Tree
pattern: [Max segment tree, Descend to first fit]
source: LeetCode 3477 / 3479
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Fruits Into Baskets II and III

> [!TIP]
> **🧠 Memory hook**
> Aisle signs show the biggest basket inside; walk to the leftmost aisle whose sign is big enough.
> **Mantra: MAX TREE, DESCEND LEFT-FIRST, MARK −1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=6) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
Fruits in order take the leftmost unused basket with capacity ≥ fruit. Return how many fruits stay unplaced.

## Key insight
A max tree tells whether any basket in a range fits. Descend left when the left max ≥ fruit, otherwise right. Mark the basket −1 and recompute upward.

## Approach: Max tree descent
```java
// Max segment tree over basket capacities
private void build(int i, int l, int r, int[] b) {
    if (l == r) { tree[i] = b[l]; return; }
    int mid = (l + r) >>> 1;
    build(2 * i + 1, l, mid, b);
    build(2 * i + 2, mid + 1, r, b);
    tree[i] = Math.max(tree[2 * i + 1], tree[2 * i + 2]);
}

// Descends to the leftmost basket with capacity >= fruit, uses it (-1), and fixes maxima
private boolean place(int i, int l, int r, int fruit) {
    if (tree[i] < fruit) return false;
    if (l == r) { tree[i] = -1; return true; }
    int mid = (l + r) >>> 1;
    boolean ok = tree[2 * i + 1] >= fruit ? place(2 * i + 1, l, mid, fruit) : place(2 * i + 2, mid + 1, r, fruit);
    tree[i] = Math.max(tree[2 * i + 1], tree[2 * i + 2]);
    return ok;
}

// Counts fruits that find no basket
public int numOfUnplacedFruits(int[] fruits, int[] baskets) {
    int n = baskets.length;
    tree = new int[4 * n];
    build(0, 0, n - 1, baskets);
    int unplaced = 0;
    for (int f : fruits) if (!place(0, 0, n - 1, f)) unplaced++;
    return unplaced;
}
```

| Approach | Time | Space |
|---|---|---|
| Max tree descent | O(n log n) | O(4n) |

## Recall before you reveal
<details><summary>Why not a binary search over prefix maxima?</summary>

Baskets get used up; the tree supports point updates.

</details>


## Connected
- [Find Building Where Alice and Bob Can Meet](Find%20Building%20Where%20Alice%20and%20Bob%20Can%20Meet.md)
