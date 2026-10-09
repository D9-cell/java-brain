---
topic: Sliding Window
pattern: [Fixed window, Run length]
source: LeetCode 3254
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Find the Power of K-Size Subarrays I

> [!TIP]
> **🧠 Memory hook**
> Count the length of the staircase (+1 steps) ending here.
> **Mantra: RUN ≥ k ⇒ nums[j], ELSE −1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=20) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
For each window of size k: its max if the elements are consecutive and ascending, else −1.

## Key insight
The window is good exactly when the run of +1 steps ending at its right edge has length ≥ k.

## Approach 1: Run counter
```java
// Count the current run of +1 steps; a window is sorted-consecutive when the run ending at j is >= k
public int[] resultsArray(int[] nums, int k) {
    int n = nums.length, count = 1;
    int[] result = new int[n - k + 1];
    Arrays.fill(result, -1);
    for (int j = 1; j < k; j++) count = nums[j] == nums[j - 1] + 1 ? count + 1 : 1;
    if (count == k) result[0] = nums[k - 1];
    for (int i = 1, j = k; j < n; i++, j++) {
        count = nums[j] == nums[j - 1] + 1 ? count + 1 : 1;
        if (count >= k) result[i] = nums[j];
    }
    return result;
}
```

## Approach 2: Deque of the current run
```java
// Deque holds the current consecutive run (at most k); clear it when the chain breaks
public int[] resultsArrayDeque(int[] nums, int k) {
    Deque<Integer> deq = new ArrayDeque<>();
    int[] result = new int[nums.length - k + 1];
    for (int j = 0; j < nums.length; j++) {
        if (deq.size() == k) deq.pollFirst();
        if (!deq.isEmpty() && deq.peekLast() != nums[j] - 1) deq.clear();
        deq.addLast(nums[j]);
        if (j >= k - 1) result[j - k + 1] = deq.size() == k ? deq.peekLast() : -1;
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Run counter | O(n) | O(1) |
| Deque of the current run | O(n) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against checking each window.

## Recall before you reveal
<details><summary>Power when good?</summary>

The last element (the max).

</details>

