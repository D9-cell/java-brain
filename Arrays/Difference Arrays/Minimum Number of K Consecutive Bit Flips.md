---
topic: Difference Arrays
pattern: [Lazy sweep, Flip window]
source: LeetCode 995
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Number of K Consecutive Bit Flips

> [!TIP]
> **🧠 Memory hook**
> Sweep left to right; the leftmost 0 can only be fixed by a flip **starting here**. Track active flips and when each one ends.
> **Mantra: active −= endAt[i] · (nums[i] + active) even → flip, endAt[i + k]++ · out of room → −1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=11) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
A k-bit flip inverts k consecutive bits. Return the minimum number of flips to turn every bit into 1, or -1.

## Key insight
Flips commute and flipping twice cancels, so each start position is used at most once and the greedy choice is forced. The difference array records when a flip stops affecting bits.

## Approach: Greedy with flip counts
```java
// Sweep left to right; a 0 (after the active flips) must start a flip here; flips end k later
public int minKBitFlips(int[] nums, int k) {
    int n = nums.length, active = 0, flips = 0;
    int[] endAt = new int[n + 1];
    for (int i = 0; i < n; i++) {
        active -= endAt[i];
        if ((nums[i] + active) % 2 == 0) {
            if (i + k > n) return -1;
            flips++;
            active++;
            endAt[i + k]++;
        }
    }
    return flips;
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy with flip counts | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the greedy forced?</summary>

Only a flip starting at i can still change bit i.

</details>


<details><summary>O(1) space version?</summary>

Mark started flips in nums itself.

</details>


## Connected
- [Zero Array Transformation II](Zero%20Array%20Transformation%20II.md)
