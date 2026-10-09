---
topic: Heap
pattern: [k sorted lists, Sparse table]
source: LeetCode 3691
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Maximum Total Subarray Value II

> [!TIP]
> **🧠 Memory hook**
> Each start index offers a sorted menu: widest first.
> **Mantra: SEED [l, n−1], POP k, PUSH [l, r−1]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=15) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Pick k distinct subarrays maximising the total of (max − min).

## Key insight
For fixed l, value(l, r) is non-decreasing in r. Seed [l, n−1] for every l, pop k times, push [l, r−1]. Sparse tables answer range max/min in O(1).

## Approach: Heap + sparse table
```java
// Sparse tables for O(1) range max / min
private void build(int[] a) {
    int n = a.length, K = 32 - Integer.numberOfLeadingZeros(n);
    mx = new int[K][n];
    mn = new int[K][n];
    lg = new int[n + 1];
    for (int i = 2; i <= n; i++) lg[i] = lg[i / 2] + 1;
    mx[0] = a.clone();
    mn[0] = a.clone();
    for (int j = 1; j < K; j++)
        for (int i = 0; i + (1 << j) <= n; i++) {
            mx[j][i] = Math.max(mx[j - 1][i], mx[j - 1][i + (1 << (j - 1))]);
            mn[j][i] = Math.min(mn[j - 1][i], mn[j - 1][i + (1 << (j - 1))]);
        }
}

// value(l, r) = max - min over a[l..r]
private long value(int l, int r) {
    int j = lg[r - l + 1];
    return (long) Math.max(mx[j][l], mx[j][r - (1 << j) + 1]) - Math.min(mn[j][l], mn[j][r - (1 << j) + 1]);
}

// For a fixed l the value grows with r, so start every l at r = n-1 and pop the best k, pushing (l, r-1)
public long maxTotalValue(int[] nums, int k) {
    int n = nums.length;
    build(nums);
    PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(b[0], a[0]));
    for (int l = 0; l < n; l++) pq.offer(new long[]{value(l, n - 1), l, n - 1});
    long total = 0;
    while (k-- > 0) {
        long[] t = pq.poll();
        total += t[0];
        int l = (int) t[1], r = (int) t[2];
        if (r > l) pq.offer(new long[]{value(l, r - 1), l, r - 1});
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Heap + sparse table | O((n + k) log n) | O(n log n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Why distinct?</summary>

Each (l, r) is pushed at most once.

</details>


## Connected
- [Find K Pairs with Smallest Sums](Find%20K%20Pairs%20with%20Smallest%20Sums.md)
