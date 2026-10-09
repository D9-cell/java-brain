---
topic: Jumps and Reach
pattern: [Sliding-window maximum, Monotonic deque]
source: LeetCode 1696
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Jump Game VI

> [!TIP]
> **🧠 Memory hook**
> Each landing takes the **best score among the last k landings**: a sliding-window maximum.
> **Mantra: dp[i] = nums[i] + max(dp[i−k..i−1]) VIA DECREASING DEQUE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=3) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
Start at index 0 and jump forward 1..k steps at a time until index n − 1. Your score is the sum of the values you land on. Return the maximum score.

## Key insight
The recurrence is a window maximum. Keep indexes in a deque with decreasing dp values: drop the front when it leaves the window, drop the back while it is not better than the new value.

## Approach 1: Monotonic deque
```java
// dp[i] = nums[i] + max of the last k dp values, kept in a decreasing deque
public int maxResult(int[] nums, int k) {
    int n = nums.length;
    int[] dp = new int[n];
    Deque<Integer> dq = new ArrayDeque<>();
    dp[0] = nums[0];
    dq.add(0);
    for (int i = 1; i < n; i++) {
        if (dq.peekFirst() < i - k) dq.pollFirst();
        dp[i] = nums[i] + dp[dq.peekFirst()];
        while (!dq.isEmpty() && dp[dq.peekLast()] <= dp[i]) dq.pollLast();
        dq.addLast(i);
    }
    return dp[n - 1];
}
```

## Approach 2: Plain window scan
```java
// Plain DP scanning the last k values
public int maxResultSlow(int[] nums, int k) {
    int n = nums.length;
    int[] dp = new int[n];
    dp[0] = nums[0];
    for (int i = 1; i < n; i++) {
        dp[i] = Integer.MIN_VALUE;
        for (int j = Math.max(0, i - k); j < i; j++) dp[i] = Math.max(dp[i], dp[j] + nums[i]);
    }
    return dp[n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Monotonic deque | O(n) | O(k) |
| Plain window scan | O(n · k) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why can a smaller back element be dropped?</summary>

The new one is better and stays in the window longer.

</details>


<details><summary>Heap alternative?</summary>

A max-heap with lazy removal: O(n log n).

</details>


## Connected
- [Sliding Window Maximum](../../Sliding%20Window/Sliding%20Window%20Maximum.md)
- [Constrained Subsequence Sum](../../Heap/Constrained%20Subsequence%20Sum.md)
- [Jump Game VII](Jump%20Game%20VII.md)
