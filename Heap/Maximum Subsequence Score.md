---
topic: Heap
pattern: [Sort + heap]
source: LeetCode 2542
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Maximum Subsequence Score

> [!TIP]
> **🧠 Memory hook**
> The weakest member's rating multiplies the team total.
> **Mantra: SORT nums2 ↓, MIN-HEAP KEEPS k LARGEST nums1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=14) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Choose k indices maximising (sum of nums1) × (min of nums2).

## Key insight
Sorting by nums2 descending makes the current element the minimum; keep the k largest nums1 so far.

## Approach: Sort + min-heap
```java
// Sort by nums2 desc: the current nums2 is the minimum; keep the k largest nums1 so far in a min-heap
public long maxScore(int[] nums1, int[] nums2, int k) {
    int n = nums1.length;
    Integer[] idx = new Integer[n];
    for (int i = 0; i < n; i++) idx[i] = i;
    Arrays.sort(idx, (a, b) -> nums2[b] - nums2[a]);
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    long sum = 0, best = 0;
    for (int t = 0; t < n; t++) {
        int i = idx[t];
        pq.offer(nums1[i]);
        sum += nums1[i];
        if (pq.size() > k) sum -= pq.poll();
        if (pq.size() == k) best = Math.max(best, sum * nums2[i]);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + min-heap | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Twin problem?</summary>

Minimum Cost to Hire K Workers.

</details>


## Connected
- [Minimum Cost to Hire K Workers](Minimum%20Cost%20to%20Hire%20K%20Workers.md)
