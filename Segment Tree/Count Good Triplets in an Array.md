---
topic: Segment Tree
pattern: [Count segment tree, Fix the middle]
source: LeetCode 2179
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Count Good Triplets in an Array

> [!TIP]
> **🧠 Memory hook**
> The middle child in two group photos: friends on the left in both × friends on the right in both.
> **Mantra: MAP TO nums2 POS, LEFT × RIGHT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=5) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
Count value triplets that appear in increasing positions in both permutations.

## Key insight
Walk nums1. For value y at nums2 position p: `leftCommon` = seen values at nums2 positions ≤ p (tree query). `rightCommon = (n−1−p) − (i − leftCommon)`. Add the product.

## Approach: Count tree over nums2 positions
```java
// Marks position idx as seen (count tree)
private void update(int i, int l, int r, int idx) {
    if (l == r) { tree[i] = 1; return; }
    int mid = (l + r) >>> 1;
    if (idx <= mid) update(2 * i + 1, l, mid, idx);
    else update(2 * i + 2, mid + 1, r, idx);
    tree[i] = tree[2 * i + 1] + tree[2 * i + 2];
}

// Counts seen positions in [ql, qr]
private int query(int i, int l, int r, int ql, int qr) {
    if (r < ql || l > qr) return 0;
    if (ql <= l && r <= qr) return tree[i];
    int mid = (l + r) >>> 1;
    return query(2 * i + 1, l, mid, ql, qr) + query(2 * i + 2, mid + 1, r, ql, qr);
}

// Each value is the middle: (common elements on its left) × (common elements on its right)
public long goodTriplets(int[] nums1, int[] nums2) {
    int n = nums1.length;
    int[] pos2 = new int[n];
    for (int i = 0; i < n; i++) pos2[nums2[i]] = i;
    tree = new int[4 * n];
    long res = 0;
    for (int i = 0; i < n; i++) {
        int p = pos2[nums1[i]];
        long leftCommon = query(0, 0, n - 1, 0, p);
        long leftNotCommon = i - leftCommon;
        long rightCommon = (n - 1 - p) - leftNotCommon;
        res += leftCommon * rightCommon;
        update(0, 0, n - 1, p);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Count tree over nums2 positions | O(n log n) | O(4n) |

## Recall before you reveal
<details><summary>Derive rightCommon.</summary>

Positions after p in nums2: n−1−p. Subtract the seen-but-after ones (i − leftCommon), which are before y in nums1.

</details>


## Connected
- [Distribute Elements Into Two Arrays II](Distribute%20Elements%20Into%20Two%20Arrays%20II.md)
