---
topic: Sliding Window
pattern: [Longest window, HashMap]
source: LeetCode 2958
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Length of Longest Subarray With at Most K Frequency

> [!TIP]
> **🧠 Memory hook**
> A bouncer who only checks the newest guest.
> **Mantra: SHRINK WHILE count(nums[j]) > k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=28) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Longest subarray where every value appears at most k times.

## Key insight
Before adding nums[j] the window was fine, so only nums[j] can be over k.

## Approach 1: Shrink on the new value
```java
// Only nums[j] can break the rule, so shrink until its count is back to k
public int maxSubarrayLength(int[] nums, int k) {
    Map<Integer, Integer> win = new HashMap<>();
    int result = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        win.merge(nums[j], 1, Integer::sum);
        while (i < j && win.get(nums[j]) > k) win.merge(nums[i++], -1, Integer::sum);
        result = Math.max(result, j - i + 1);
    }
    return result;
}
```

## Approach 2: Culprit counter, no inner loop
```java
// No inner loop: count values above k (culprits) and slide by one while any exist
public int maxSubarrayLengthCulprit(int[] nums, int k) {
    Map<Integer, Integer> win = new HashMap<>();
    int result = 0, culprit = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        if (win.merge(nums[j], 1, Integer::sum) == k + 1) culprit++;
        if (culprit > 0 && win.merge(nums[i++], -1, Integer::sum) == k) culprit--;
        if (culprit == 0) result = Math.max(result, j - i + 1);
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Shrink on the new value | O(n) | O(n) |
| Culprit counter, no inner loop | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>What is a culprit?</summary>

A value currently at k + 1 copies.

</details>

