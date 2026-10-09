---
topic: Heap
pattern: [Prefix/suffix heaps]
source: LeetCode 2163
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Minimum Difference in Sums After Removal of Elements

> [!TIP]
> **🧠 Memory hook**
> Cut the line: the left part keeps its cheapest n, the right part its richest n.
> **Mantra: PREFIX n SMALLEST, SUFFIX n LARGEST, TRY EVERY SPLIT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=17) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Remove n of 3n elements so (sum of first n) − (sum of last n) of the rest is minimal.

## Key insight
For each split point, the best is (n smallest of the prefix) − (n largest of the suffix). Max-heap builds prefix sums, min-heap suffix sums.

## Approach: Two heaps
```java
// left[i] = smallest sum of n items from nums[0..i] (max-heap); right[i] = largest sum of n from nums[i..] (min-heap)
public long minimumDifference(int[] nums) {
    int N = nums.length, n = N / 3;
    long[] left = new long[N], right = new long[N];
    PriorityQueue<Integer> maxH = new PriorityQueue<>(Collections.reverseOrder()), minH = new PriorityQueue<>();
    long s = 0;
    for (int i = 0; i < N; i++) {
        maxH.offer(nums[i]);
        s += nums[i];
        if (maxH.size() > n) s -= maxH.poll();
        left[i] = s;
    }
    s = 0;
    for (int i = N - 1; i >= 0; i--) {
        minH.offer(nums[i]);
        s += nums[i];
        if (minH.size() > n) s -= minH.poll();
        right[i] = s;
    }
    long best = Long.MAX_VALUE;
    for (int i = n - 1; i < 2 * n; i++) best = Math.min(best, left[i] - right[i + 1]);
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Two heaps | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Split range?</summary>

i in [n−1, 2n−1].

</details>

