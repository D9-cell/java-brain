---
topic: Backtracking
pattern: [Take/skip with constraint]
source: LeetCode 2597
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# The Number of Beautiful Subsets

> [!TIP]
> **🧠 Memory hook**
> A party where guests whose ages differ by exactly k refuse to meet.
> **Mantra: TAKE IF x±k NOT TAKEN (COUNT MAP)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=31) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Number of non-empty subsets with no two elements differing by k.

## Key insight
Take x only if neither x−k nor x+k is currently taken; a count map handles duplicates.

## Approach: Backtracking
```java
// Take nums[i] only if neither x-k nor x+k is currently taken (count map handles duplicates)
private int solve(int[] a, int i, int k, Map<Integer, Integer> taken) {
    if (i == a.length) return 1;
    int ways = solve(a, i + 1, k, taken);
    if (taken.getOrDefault(a[i] - k, 0) == 0 && taken.getOrDefault(a[i] + k, 0) == 0) {
        taken.merge(a[i], 1, Integer::sum);
        ways += solve(a, i + 1, k, taken);
        taken.merge(a[i], -1, Integer::sum);
    }
    return ways;
}

// Subtract 1 for the empty subset
public int beautifulSubsets(int[] nums, int k) { return solve(nums, 0, k, new HashMap<>()) - 1; }
```

| Approach | Time | Space |
|---|---|---|
| Backtracking | O(2^n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration (bitmasks / all assignments) on random inputs when it was written.

## Recall before you reveal
<details><summary>Faster idea?</summary>

Group by value mod k; DP on each chain (house-robber style).

</details>

