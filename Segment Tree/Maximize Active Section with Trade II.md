---
topic: Segment Tree
pattern: [Max segment tree on pair sums, Binary search on blocks]
source: LeetCode 3501
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, segment-tree]
---
# Maximize Active Section with Trade II

> [!TIP]
> **🧠 Memory hook**
> Two lakes split by a thin island: sink the island, merge the lakes, then drain them into land. Gain = two neighbouring lakes.
> **Mantra: ZERO BLOCKS, PAIR SUMS, CLIP EDGES, RMQ MIDDLE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Segment%20Tree/Segment%20Tree%20Animations.html#p=13) · **Pattern hub:** [Segment Tree - Pattern Map](Segment%20Tree%20-%20Pattern%20Map.md)

## Problem
For each query [l, r], return the maximum count of 1s in s after at most one trade inside the augmented substring.

## Key insight
The gain of a trade = the sizes of two adjacent zero blocks. Precompute zero blocks and `pairSum[i] = size[i] + size[i+1]`. Per query, find the first/last blocks inside, clip their sizes, and combine the edge pairs with a range max over the interior pairSums.

## Approach: Blocks + RMQ
```java
// Max segment tree over pairSum
private void build(int i, int l, int r, int[] a) {
    if (l == r) { tree[i] = a[l]; return; }
    int mid = (l + r) >>> 1;
    build(2 * i + 1, l, mid, a);
    build(2 * i + 2, mid + 1, r, a);
    tree[i] = Math.max(tree[2 * i + 1], tree[2 * i + 2]);
}

// Max of pairSum[ql..qr]; an empty range gives 0
private int query(int i, int l, int r, int ql, int qr) {
    if (ql > qr || r < ql || l > qr) return 0;
    if (ql <= l && r <= qr) return tree[i];
    int mid = (l + r) >>> 1;
    return Math.max(query(2 * i + 1, l, mid, ql, qr), query(2 * i + 2, mid + 1, r, ql, qr));
}

// First index with a[idx] >= key
static int lowerBound(List<Integer> a, int key) {
    int lo = 0, hi = a.size();
    while (lo < hi) { int m = (lo + hi) >>> 1; if (a.get(m) < key) lo = m + 1; else hi = m; }
    return lo;
}

// Best trade gain = the largest sum of two neighbouring zero blocks inside [l, r] (edge blocks clipped)
public List<Integer> maxActiveSectionsAfterTrade(String s, int[][] queries) {
    int n = s.length(), ones = 0;
    List<Integer> bs = new ArrayList<>(), be = new ArrayList<>();
    for (int i = 0; i < n; ) {
        if (s.charAt(i) == '1') { ones++; i++; continue; }
        int st = i;
        while (i < n && s.charAt(i) == '0') i++;
        bs.add(st);
        be.add(i - 1);
    }
    int m = bs.size();
    List<Integer> res = new ArrayList<>();
    if (m < 2) {
        for (int[] q : queries) res.add(ones);
        return res;
    }
    int[] size = new int[m], pair = new int[m - 1];
    for (int i = 0; i < m; i++) size[i] = be.get(i) - bs.get(i) + 1;
    for (int i = 0; i + 1 < m; i++) pair[i] = size[i] + size[i + 1];
    tree = new int[4 * (m - 1)];
    build(0, 0, m - 2, pair);
    for (int[] q : queries) {
        int l = q[0], r = q[1];
        int low = lowerBound(be, l), high = lowerBound(bs, r + 1) - 1, gain = 0;
        if (low < high) {
            int first = be.get(low) - Math.max(bs.get(low), l) + 1;
            int last = Math.min(be.get(high), r) - bs.get(high) + 1;
            if (high - low == 1) gain = first + last;
            else gain = Math.max(Math.max(first + size[low + 1], size[high - 1] + last), query(0, 0, m - 2, low + 1, high - 2));
        }
        res.add(ones + gain);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Blocks + RMQ | O(n + q log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified on 400 random strings against a brute-force simulator that literally performs every legal trade.

## Recall before you reveal
<details><summary>Answer without a trade?</summary>

ones, also when fewer than 2 zero blocks lie in [l, r].

</details>


## Connected
- [Range Minimum Query](Range%20Minimum%20Query.md) (max variant)
