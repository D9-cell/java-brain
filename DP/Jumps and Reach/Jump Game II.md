---
topic: Jumps and Reach
pattern: [BFS by layers, Greedy]
source: LeetCode 45
difficulty: Medium
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Jump Game II

> [!TIP]
> **🧠 Memory hook**
> Jumps are **BFS levels**: everything reachable with t jumps is one window; the next window ends at the farthest reach from it.
> **Mantra: i == end → jumps++, end = far**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=1) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
Return the minimum number of jumps to reach the last index (it is always reachable).

## Key insight
Index 0 is level 0. The indexes reachable with one jump are 1..nums[0], and so on: each level is a contiguous window. While scanning a window, record the farthest reach; when the scan hits the window end, one more jump opens the next window.

## Approach 1: Greedy levels
```java
// Greedy BFS: each jump count covers a window of indexes; the next window ends at the farthest reach
public int jump(int[] nums) {
    int jumps = 0, end = 0, far = 0;
    for (int i = 0; i < nums.length - 1; i++) {
        far = Math.max(far, i + nums[i]);
        if (i == end) { jumps++; end = far; }
    }
    return jumps;
}
```

## Approach 2: DP from the right
```java
// DP: dp[i] = fewest jumps from i to the end
public int jumpDp(int[] nums) {
    int n = nums.length;
    int[] dp = new int[n];
    Arrays.fill(dp, Integer.MAX_VALUE / 2);
    dp[n - 1] = 0;
    for (int i = n - 2; i >= 0; i--)
        for (int j = i + 1; j <= Math.min(n - 1, i + nums[i]); j++) dp[i] = Math.min(dp[i], 1 + dp[j]);
    return dp[0];
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy levels | O(n) | O(1) |
| DP from the right | O(n · max jump) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why stop the loop at n − 2?</summary>

Arriving at the last index needs no further jump.

</details>


<details><summary>Why is this BFS?</summary>

Every jump count is a level, and levels are contiguous windows.

</details>


## Connected
- [Jump Game](Jump%20Game.md)
- [Minimum Number of Taps to Open to Water a Garden](../../Greedy/Intervals%20and%20Scheduling/Minimum%20Number%20of%20Taps%20to%20Open%20to%20Water%20a%20Garden.md)
