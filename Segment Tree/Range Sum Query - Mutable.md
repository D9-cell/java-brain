---
topic: Segment Tree
pattern: [Sum segment tree, Point update]
source: LeetCode 307
difficulty: Medium
companies: [Meta]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Range Sum Query - Mutable

> [!TIP]
> **🧠 Memory hook**
> Org chart of managers who know their team totals.
> **Mantra: NO → 0, FULL → NODE, PARTIAL → BOTH KIDS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=0) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
Support `update(index, val)` and `sumRange(left, right)` efficiently.

## Key insight
A plain array gives O(1) update and O(n) query; prefix sums the opposite. A segment tree balances both at O(log n).

## Approach: Sum segment tree
```java
// Sum segment tree: node i covers [l, r], children 2i+1 and 2i+2
static class NumArray {
    private final int n;
    private final int[] tree;

    // Builds the tree bottom-up in O(n)
    NumArray(int[] nums) {
        n = nums.length;
        tree = new int[4 * n];
        build(0, 0, n - 1, nums);
    }

    // Leaf stores the value, inner node stores left + right
    private void build(int i, int l, int r, int[] a) {
        if (l == r) { tree[i] = a[l]; return; }
        int mid = (l + r) >>> 1;
        build(2 * i + 1, l, mid, a);
        build(2 * i + 2, mid + 1, r, a);
        tree[i] = tree[2 * i + 1] + tree[2 * i + 2];
    }

    // Goes down to the leaf for idx, then fixes sums on the way back up
    private void update(int i, int l, int r, int idx, int val) {
        if (l == r) { tree[i] = val; return; }
        int mid = (l + r) >>> 1;
        if (idx <= mid) update(2 * i + 1, l, mid, idx, val);
        else update(2 * i + 2, mid + 1, r, idx, val);
        tree[i] = tree[2 * i + 1] + tree[2 * i + 2];
    }

    // No overlap → 0, full overlap → node value, partial → ask both children
    private int query(int i, int l, int r, int ql, int qr) {
        if (r < ql || l > qr) return 0;
        if (ql <= l && r <= qr) return tree[i];
        int mid = (l + r) >>> 1;
        return query(2 * i + 1, l, mid, ql, qr) + query(2 * i + 2, mid + 1, r, ql, qr);
    }

    // Public point update
    public void update(int index, int val) { update(0, 0, n - 1, index, val); }

    // Public range sum
    public int sumRange(int left, int right) { return query(0, 0, n - 1, left, right); }
}
```

| Approach | Time | Space |
|---|---|---|
| Sum segment tree | build O(n), update/query O(log n) | O(4n) |

## Recall before you reveal
<details><summary>Write the three query cases.</summary>

`r < ql || l > qr` → 0; `ql <= l && r <= qr` → tree[i]; else left + right.

</details>


<details><summary>Why does update return up the path?</summary>

To recompute the parent sums after the leaf changes.

</details>


## Connected
- [Sum of Query II](Sum%20of%20Query%20II.md)
- [Range Minimum Query](Range%20Minimum%20Query.md)
