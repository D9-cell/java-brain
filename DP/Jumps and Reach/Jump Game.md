---
topic: Jumps and Reach
pattern: [Reach window, Greedy]
source: LeetCode 55
difficulty: Medium
companies: [Amazon, Microsoft, Google]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Jump Game

> [!TIP]
> **🧠 Memory hook**
> Walk forward carrying a **torch** that lights up to the farthest index reachable; if you step into darkness, you are stuck.
> **Mantra: i > reach → false; reach = max(reach, i + nums[i])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=0) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
nums[i] is the longest jump allowed from index i. Starting at index 0, can you reach the last index?

## Key insight
Reachable indexes always form a prefix: if you can reach j you can reach everything before it. So one number, the farthest reach, describes them all. The O(n²) DP (good[i] if some jump lands on a good index) shows why the greedy is safe.

## Approach 1: Farthest reach
```java
// Greedy: track the farthest index reachable so far
public boolean canJump(int[] nums) {
    int reach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > reach) return false;
        reach = Math.max(reach, i + nums[i]);
    }
    return true;
}
```

## Approach 2: DP from the right
```java
// DP from the right: good[i] if some jump from i lands on a good index
public boolean canJumpDp(int[] nums) {
    int n = nums.length;
    boolean[] good = new boolean[n];
    good[n - 1] = true;
    for (int i = n - 2; i >= 0; i--)
        for (int j = i + 1; j <= Math.min(n - 1, i + nums[i]) && !good[i]; j++) good[i] = good[j];
    return good[0];
}
```

| Approach | Time | Space |
|---|---|---|
| Farthest reach | O(n) | O(1) |
| DP from the right | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the reachable set a prefix?</summary>

From any reachable index you can also stop short, so every index before the farthest one is reachable.

</details>


<details><summary>Where does it fail?</summary>

At a zero that no earlier jump can pass.

</details>


## Connected
- [Jump Game II](Jump%20Game%20II.md)
- [Jump Game VII](Jump%20Game%20VII.md)
