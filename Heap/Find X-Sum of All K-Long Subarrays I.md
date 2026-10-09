---
topic: Heap
pattern: [Sliding window + heap]
source: LeetCode 3318
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Find X-Sum of All K-Long Subarrays I

> [!TIP]
> **🧠 Memory hook**
> Score each window by its top x favourites.
> **Mantra: SLIDE FREQ MAP, HEAP TOP x**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=33) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
For each window of size k, sum value×count over its x most frequent values (ties: larger value).

## Key insight
Maintain counts while sliding; per window, heap the (value, count) pairs and take the top x.

## Approach: Window + heap
```java
// Slide a frequency map; for each window pour it into a max-heap (freq desc, value desc) and sum the top x
public int[] findXSum(int[] nums, int k, int x) {
    int n = nums.length;
    int[] ans = new int[n - k + 1];
    Map<Integer, Integer> f = new HashMap<>();
    for (int i = 0; i < n; i++) {
        f.merge(nums[i], 1, Integer::sum);
        if (i >= k) f.merge(nums[i - k], -1, Integer::sum);
        if (i < k - 1) continue;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] != b[1] ? b[1] - a[1] : b[0] - a[0]);
        f.forEach((v, c) -> { if (c > 0) pq.offer(new int[]{v, c}); });
        int sum = 0;
        for (int t = 0; t < x && !pq.isEmpty(); t++) { int[] p = pq.poll(); sum += p[0] * p[1]; }
        ans[i - k + 1] = sum;
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Window + heap | O(n·k log k) | O(k) |

## Recall before you reveal
<details><summary>Tie rule?</summary>

Larger value wins.

</details>

