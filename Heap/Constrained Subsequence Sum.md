---
topic: Heap
pattern: [DP + heap, Sliding window max]
source: LeetCode 1425
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Constrained Subsequence Sum

> [!TIP]
> **🧠 Memory hook**
> A frog that can only jump up to k stones back remembers the best stone in reach.
> **Mantra: dp = num + max(0, best in window)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=10) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Max sum of a non-empty subsequence where consecutive chosen indices differ by at most k.

## Key insight
dp[i] = nums[i] + max(0, max dp[j] for i−k ≤ j < i). A max-heap (with stale-index removal) gives the window max.

## Approach: Max-heap
```java
// dp[i] = nums[i] + max(0, best dp in the last k); a max-heap of (dp, idx) drops indices that fell out of the window
public int constrainedSubsetSum(int[] nums, int k) {
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[0] - a[0]);
    int best = Integer.MIN_VALUE;
    for (int i = 0; i < nums.length; i++) {
        while (!pq.isEmpty() && pq.peek()[1] < i - k) pq.poll();
        int dp = nums[i] + (pq.isEmpty() ? 0 : Math.max(0, pq.peek()[0]));
        best = Math.max(best, dp);
        pq.offer(new int[]{dp, i});
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Max-heap | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an O(n·k) DP.

## Recall before you reveal
<details><summary>O(n)?</summary>

Monotonic deque.

</details>


## Connected
- [Sliding Window Maximum](../Sliding%20Window/Sliding%20Window%20Maximum.md) (monotonic deque, O(n))
