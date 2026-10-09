---
topic: Sliding Window
pattern: [Monotonic deque, Prefix sum]
source: LeetCode 862
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Shortest Subarray with Sum at Least K

> [!TIP]
> **🧠 Memory hook**
> With negatives, keep a staircase of prefix sums in a deque.
> **Mantra: POP FRONT WHILE pre[j] − pre[front] ≥ K; KEEP DEQUE INCREASING**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=48) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Shortest subarray with sum ≥ K (negatives allowed), or −1.

## Key insight
Subarray (i, j] = pre[j] − pre[i]. Front: once a start works for j, no later end can do better with it, so pop. Back: a later, lower prefix is always a better start, so pop larger ones.

## Approach: Monotonic deque of prefixes
```java
// Negatives allowed: monotonic deque of prefix indices; pop the front while it closes a sum >= K
public int shortestSubarray(int[] nums, int K) {
    int n = nums.length, result = Integer.MAX_VALUE;
    long[] pre = new long[n];
    Deque<Integer> deq = new ArrayDeque<>();
    for (int j = 0; j < n; j++) {
        pre[j] = (j == 0 ? 0 : pre[j - 1]) + nums[j];
        if (pre[j] >= K) result = Math.min(result, j + 1);
        while (!deq.isEmpty() && pre[j] - pre[deq.peekFirst()] >= K) result = Math.min(result, j - deq.pollFirst());
        while (!deq.isEmpty() && pre[j] <= pre[deq.peekLast()]) deq.pollLast();
        deq.addLast(j);
    }
    return result == Integer.MAX_VALUE ? -1 : result;
}
```

| Approach | Time | Space |
|---|---|---|
| Monotonic deque of prefixes | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Prefix sums need long. Verified against O(n²) with negatives.

## Recall before you reveal
<details><summary>Why does popping the front not lose answers?</summary>

Later ends would only be longer with that start.

</details>


<details><summary>Positive-only version?</summary>

Minimum Size Subarray Sum.

</details>


## Connected
- [Minimum Size Subarray Sum](Minimum%20Size%20Subarray%20Sum.md)
- [Sliding Window Maximum](Sliding%20Window%20Maximum.md)
