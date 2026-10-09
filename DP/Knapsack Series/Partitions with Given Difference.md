---
topic: Knapsack Series
pattern: [Reduce to subset sum, Counting]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Partitions with Given Difference

> [!TIP]
> **🧠 Memory hook**
> Two equations, two unknowns: **S1 + S2 = total, S1 − S2 = d** → S2 = (total − d) / 2.
> **Mantra: COUNT SUBSETS WITH SUM (total − d) / 2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=4) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Count the ways to split the array into two subsets S1 and S2 (S1 ≥ S2) with S1 − S2 = d. Answer modulo 1e9+7.

## Key insight
Fix the smaller subset: its sum must be (total − d) / 2, which has to be a non-negative integer. Then it is Count Subsets with Sum.

## Approach: Count subsets
```java
// S2 = (total - d) / 2, then count subsets with that sum
public int countPartitions(int[] arr, int d) {
    int total = Arrays.stream(arr).sum();
    if (total < d || (total - d) % 2 == 1) return 0;
    int target = (total - d) / 2;
    long[] ways = new long[target + 1];
    ways[0] = 1;
    for (int x : arr)
        for (int s = target; s >= x; s--) ways[s] = (ways[s] + ways[s - x]) % MOD;
    return (int) ways[target];
}
```

| Approach | Time | Space |
|---|---|---|
| Count subsets | O(n · total) | O(total) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>When is the answer 0 immediately?</summary>

total < d or total − d is odd.

</details>


<details><summary>Why count the smaller side?</summary>

Its target is smaller, so the table is smaller.

</details>


## Connected
- [Count Subsets with Sum](Count%20Subsets%20with%20Sum.md)
- [Target Sum](Target%20Sum.md)
