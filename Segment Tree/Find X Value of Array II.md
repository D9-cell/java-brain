---
topic: Segment Tree
pattern: [Custom node merge, Modular arithmetic]
source: LeetCode 3525
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Find X Value of Array II

> [!TIP]
> **🧠 Memory hook**
> Each node carries a remainder histogram of its prefixes; gluing shifts the right histogram by the left product.
> **Mantra: cnt[] OF PREFIX PRODUCTS, MERGE = SHIFT BY L.prod**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=11) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
With point updates, count subarrays starting at `start` (any end) whose product mod k equals x.

## Key insight
Node = (prod mod k, cnt[k] over prefixes). Merge: copy L.cnt; for each x add R.cnt[x] into cnt[L.prod·x mod k]. Query (start, n−1) and read cnt[x].

## Approach: Histogram segment tree
```java
// Segment summary: prod = product mod k; cnt[x] = prefixes of this segment whose product mod k is x
static class Node {
    int prod;
    int[] cnt;

    Node(int k) { cnt = new int[k]; }
}

// Leaf for a single value
private Node leaf(int value) {
    Node nd = new Node(k);
    nd.prod = value % k;
    nd.cnt[nd.prod] = 1;
    return nd;
}

// Left prefixes stay; each right prefix gets multiplied by the whole left product
private Node merge(Node L, Node R) {
    Node res = new Node(k);
    res.prod = L.prod * R.prod % k;
    for (int x = 0; x < k; x++) res.cnt[x] += L.cnt[x];
    for (int x = 0; x < k; x++) res.cnt[L.prod * x % k] += R.cnt[x];
    return res;
}

// Builds summaries bottom-up
private void build(int i, int l, int r, int[] a) {
    if (l == r) { tree[i] = leaf(a[l]); return; }
    int mid = (l + r) >>> 1;
    build(2 * i + 1, l, mid, a);
    build(2 * i + 2, mid + 1, r, a);
    tree[i] = merge(tree[2 * i + 1], tree[2 * i + 2]);
}

// Point update
private void update(int i, int l, int r, int idx, int val) {
    if (l == r) { tree[i] = leaf(val); return; }
    int mid = (l + r) >>> 1;
    if (idx <= mid) update(2 * i + 1, l, mid, idx, val);
    else update(2 * i + 2, mid + 1, r, idx, val);
    tree[i] = merge(tree[2 * i + 1], tree[2 * i + 2]);
}

// Summary of [ql, qr]; merge order matters, so only merge when both sides overlap
private Node query(int i, int l, int r, int ql, int qr) {
    if (ql <= l && r <= qr) return tree[i];
    int mid = (l + r) >>> 1;
    if (qr <= mid) return query(2 * i + 1, l, mid, ql, qr);
    if (ql > mid) return query(2 * i + 2, mid + 1, r, ql, qr);
    return merge(query(2 * i + 1, l, mid, ql, qr), query(2 * i + 2, mid + 1, r, ql, qr));
}

// Each query: update, then count prefixes of nums[start..n-1] with product mod k == x
public int[] resultArray(int[] nums, int k, int[][] queries) {
    this.k = k;
    n = nums.length;
    tree = new Node[4 * n];
    build(0, 0, n - 1, nums);
    int[] res = new int[queries.length];
    for (int q = 0; q < queries.length; q++) {
        update(0, 0, n - 1, queries[q][0], queries[q][1]);
        res[q] = query(0, 0, n - 1, queries[q][2], n - 1).cnt[queries[q][3]];
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Histogram segment tree | O((n + q log n)·k) | O(n·k) |

## Recall before you reveal
<details><summary>Why avoid an identity node in query?</summary>

The merge is order-sensitive. Returning a child directly when the range is one-sided keeps it simple.

</details>


## Connected
- [Longest Substring of One Repeating Character](Longest%20Substring%20of%20One%20Repeating%20Character.md)
