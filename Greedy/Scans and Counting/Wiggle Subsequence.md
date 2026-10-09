---
topic: Scans and Counting
pattern: [Peaks and valleys, Sign changes]
source: LeetCode 376
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Wiggle Subsequence

> [!TIP]
> **🧠 Memory hook**
> Only the **turning points** matter: climb up, flip, climb down.
> **Mantra: up = down + 1 ON A RISE, down = up + 1 ON A FALL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=3) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest subsequence whose consecutive differences alternate in sign.

## Key insight
Keep `up` (longest ending with a rise) and `down` (longest ending with a fall). A rise sets `up = down + 1`; a fall sets `down = up + 1`; equal neighbours change nothing. Equivalent: count sign changes of the differences.

## Approach 1: up / down
```java
// Only the peaks and valleys matter: up = longest ending with a rise, down = longest ending with a fall
public int wiggleMaxLength(int[] nums) {
    int up = 1, down = 1;
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) up = down + 1;
        else if (nums[i] < nums[i - 1]) down = up + 1;
    }
    return Math.max(up, down);
}
```

## Approach 2: Sign changes
```java
// Count sign changes of the differences, ignoring zeros
public int wiggleMaxLengthSigns(int[] nums) {
    int len = 1, prev = 0;
    for (int i = 1; i < nums.length; i++) {
        int diff = Integer.compare(nums[i], nums[i - 1]);
        if (diff != 0 && diff != prev) { len++; prev = diff; }
    }
    return len;
}
```

| Approach | Time | Space |
|---|---|---|
| up / down | O(n) | O(1) |
| Sign changes | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why can a monotone stretch be shortened to its ends?</summary>

Only the endpoints of a straight climb matter for the next turn.

</details>


## Connected
- [Candy](Candy.md)
