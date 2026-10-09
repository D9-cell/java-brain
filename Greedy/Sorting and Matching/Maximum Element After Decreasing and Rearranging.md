---
topic: Sorting and Matching
pattern: [Sort, Staircase cap]
source: LeetCode 1846
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Element After Decreasing and Rearranging

> [!TIP]
> **🧠 Memory hook**
> Build a **staircase** that starts at 1 and rises by at most 1 each step.
> **Mantra: cur = min(cur + 1, x)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=10) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
You may reduce elements and reorder them so that the first element is 1 and adjacent differences are at most 1. Return the largest possible value.

## Key insight
Sort ascending. Each element can be at most one more than its predecessor and at most its own value: `cur = min(cur + 1, x)`. A counting version caps values at n.

## Approach 1: Sort + staircase
```java
// Sort; the first value must be 1 and each next value can grow by at most 1, bounded by what is available
public int maximumElementAfterDecrementingAndRearranging(int[] arr) {
    Arrays.sort(arr);
    int cur = 0;
    for (int x : arr) cur = Math.min(cur + 1, x);
    return cur;
}
```

## Approach 2: Counting
```java
// Counting version: cap every value at n and sweep the counts
public int maximumElementCounting(int[] arr) {
    int n = arr.length;
    int[] cnt = new int[n + 1];
    for (int x : arr) cnt[Math.min(x, n)]++;
    int cur = 0;
    for (int v = 1; v <= n; v++) cur = Math.min(cur + cnt[v], v);
    return cur;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + staircase | O(n log n) | O(1) |
| Counting | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why cap values at n?</summary>

The staircase cannot be higher than the number of elements.

</details>


## Connected
- [Maximum Ice Cream Bars](Maximum%20Ice%20Cream%20Bars.md)
