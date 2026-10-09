---
topic: Scans and Counting
pattern: [Expand around k, Larger neighbour first]
source: LeetCode 1793
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Score of a Good Subarray

> [!TIP]
> **🧠 Memory hook**
> Grow a window from `k` and always step towards the **taller neighbour**, so the minimum drops slowly.
> **Mantra: EXPAND TO THE LARGER SIDE, SCORE = min · length**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=9) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
A subarray [i..j] is good if i ≤ k ≤ j. Its score is `min(nums[i..j]) * (j - i + 1)`. Return the maximum score.

## Key insight
Start with `[k, k]`. At each step extend to the side with the larger next value, update the running minimum and the best score. Alternatively test each distinct value as the minimum and extend while elements stay at least that large.

## Approach 1: Greedy expansion
```java
// Start with [k, k] and always expand towards the larger neighbour, so the minimum drops as slowly as possible
public int maximumScore(int[] nums, int k) {
    int n = nums.length, i = k, j = k, min = nums[k], best = min;
    while (i > 0 || j < n - 1) {
        if (i == 0) j++;
        else if (j == n - 1) i--;
        else if (nums[i - 1] > nums[j + 1]) i--;
        else j++;
        min = Math.min(min, Math.min(nums[i], nums[j]));
        best = Math.max(best, min * (j - i + 1));
    }
    return best;
}
```

## Approach 2: Try each threshold
```java
// For each threshold height m = nums[x], extend as far as elements stay at least m around k (only thresholds that include k)
public int maximumScoreThresholds(int[] nums, int k) {
    int n = nums.length, best = 0;
    for (int t = 0; t < n; t++) {
        int m = nums[t];
        if (m > nums[k]) continue;
        int i = k, j = k;
        while (i > 0 && nums[i - 1] >= m) i--;
        while (j < n - 1 && nums[j + 1] >= m) j++;
        best = Math.max(best, m * (j - i + 1));
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy expansion | O(n) | O(1) |
| Try each threshold | O(n²) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the larger neighbour the right choice?</summary>

Taking the smaller one would lower the minimum earlier without any benefit.

</details>


## Connected
- [Trapping Rain Water](../../Stack/Trapping%20Rain%20Water%20%28using%20stack%29.md)
