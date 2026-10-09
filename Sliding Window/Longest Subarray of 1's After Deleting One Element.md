---
topic: Sliding Window
pattern: [Longest window]
source: LeetCode 1493
difficulty: Medium
companies: [Google, Meta]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Longest Subarray of 1's After Deleting One Element

> [!TIP]
> **🧠 Memory hook**
> The window may hold one pothole (a zero) that we pave over.
> **Mantra: NEW ZERO ⇒ i = lastZero + 1; ANSWER j − i**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=33) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Delete exactly one element; return the longest run of 1s.

## Key insight
The window may contain at most one zero. Its length minus the deleted element is j − i.

## Approach 1: Delete each zero
```java
// Delete each zero in turn and measure the longest run of ones
public int longestSubarrayBrute(int[] nums) {
    int n = nums.length, result = 0, zeros = 0;
    for (int skip = 0; skip < n; skip++) {
        if (nums[skip] != 0) continue;
        zeros++;
        for (int i = 0, cur = 0; i < n; i++) {
            if (i == skip) continue;
            cur = nums[i] == 1 ? cur + 1 : 0;
            result = Math.max(result, cur);
        }
    }
    return zeros == 0 ? n - 1 : result;
}
```

## Approach 2: Window with ≤ 1 zero
```java
// Window with at most one zero; its length minus the deleted element is j - i
public int longestSubarrayWindow(int[] nums) {
    int zeros = 0, best = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        if (nums[j] == 0) zeros++;
        while (zeros > 1) if (nums[i++] == 0) zeros--;
        best = Math.max(best, j - i);
    }
    return best;
}
```

## Approach 3: Jump past the last zero
```java
// On a new zero, jump i straight past the previous zero
public int longestSubarray(int[] nums) {
    int lastZero = -1, best = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        if (nums[j] == 0) {
            i = lastZero + 1;
            lastZero = j;
        }
        best = Math.max(best, j - i);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Delete each zero | O(n²) | O(1) |
| Window with ≤ 1 zero | O(n) | O(1) |
| Jump past the last zero | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> All three approaches agree on random arrays.

## Recall before you reveal
<details><summary>All ones?</summary>

You must still delete one: n − 1.

</details>


## Connected
- [Maximize the Confusion of an Exam](Maximize%20the%20Confusion%20of%20an%20Exam.md)
