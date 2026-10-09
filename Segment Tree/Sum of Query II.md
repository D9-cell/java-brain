---
topic: Segment Tree
pattern: [Sum segment tree]
source: GFG
difficulty: Easy
companies: [Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Sum of Query II

> [!TIP]
> **🧠 Memory hook**
> The same org chart; GFG speaks 1-based.
> **Mantra: BUILD ONCE, SUBTRACT 1, QUERY**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=4) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
Given `arr` and `q` flattened 1-based (l, r) pairs, return each range sum.

## Key insight
Build a sum tree once and query each pair after converting it to 0-based. Without updates, prefix sums also work.

## Approach: Sum segment tree
```java
// Leaf stores the value, inner node stores left + right
static void build(int[] tree, int i, int l, int r, int[] a) {
    if (l == r) { tree[i] = a[l]; return; }
    int mid = (l + r) >>> 1;
    build(tree, 2 * i + 1, l, mid, a);
    build(tree, 2 * i + 2, mid + 1, r, a);
    tree[i] = tree[2 * i + 1] + tree[2 * i + 2];
}

// Standard range sum
static int query(int[] tree, int i, int l, int r, int ql, int qr) {
    if (r < ql || l > qr) return 0;
    if (ql <= l && r <= qr) return tree[i];
    int mid = (l + r) >>> 1;
    return query(tree, 2 * i + 1, l, mid, ql, qr) + query(tree, 2 * i + 2, mid + 1, r, ql, qr);
}

// queries holds pairs (l, r) flattened and 1-based
public List<Integer> querySum(int n, int[] arr, int q, int[] queries) {
    int[] tree = new int[4 * n];
    build(tree, 0, 0, n - 1, arr);
    List<Integer> res = new ArrayList<>();
    for (int k = 0; k < 2 * q; k += 2) res.add(query(tree, 0, 0, n - 1, queries[k] - 1, queries[k + 1] - 1));
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Sum segment tree | O(n + q log n) | O(4n) |

## Recall before you reveal
<details><summary>Pitfall?</summary>

1-based indices.

</details>


## Connected
- [Range Sum Query - Mutable](Range%20Sum%20Query%20-%20Mutable.md)
