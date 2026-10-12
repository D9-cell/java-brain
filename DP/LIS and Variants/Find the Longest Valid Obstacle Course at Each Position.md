---
topic: LIS and Variants
pattern: [Tails array, Non-decreasing LIS]
source: LeetCode 1964
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Find the Longest Valid Obstacle Course at Each Position

> [!TIP]
> **🧠 Memory hook**
> An LIS that **allows equal values** answered for every prefix: the slot you land in is the answer.
> **Mantra: UPPER BOUND IN tails → ANSWER = SLOT + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=3) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
For each index i, return the length of the longest non-decreasing obstacle course ending at obstacles[i] using elements from 0..i.

## Key insight
Run the tails algorithm with an upper bound (first tail strictly greater). The landing slot + 1 is the longest course that ends at the current obstacle, because every shorter tail is at most the value.

## Approach: Tails with upper bound
```java
// Non-decreasing LIS: tails[] with an upper bound search, answer at i is its slot + 1
public int[] longestObstacleCourseAtEachPosition(int[] obstacles) {
    int n = obstacles.length, size = 0;
    int[] tails = new int[n], res = new int[n];
    for (int i = 0; i < n; i++) {
        int lo = 0, hi = size;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (tails[mid] <= obstacles[i]) lo = mid + 1;
            else hi = mid;
        }
        tails[lo] = obstacles[i];
        if (lo == size) size++;
        res[i] = lo + 1;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Tails with upper bound | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why upper bound?</summary>

Equal values may chain, so equals extend instead of replacing.

</details>


<details><summary>Why is the slot the answer?</summary>

tails[slot − 1] ≤ value means a course of length slot already exists below it.

</details>


## Connected
- [Longest Increasing Subsequence](Longest%20Increasing%20Subsequence.md)
