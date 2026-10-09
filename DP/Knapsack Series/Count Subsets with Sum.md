---
topic: Knapsack Series
pattern: [0-1 knapsack, Counting]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Count Subsets with Sum

> [!TIP]
> **🧠 Memory hook**
> Same table as Subset Sum, but **count** the ways instead of asking yes/no.
> **Mantra: ways[s] += ways[s − x]; s FROM target DOWN TO x**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=2) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Count the subsets whose sum equals target (elements may be 0). Answer modulo 1e9+7.

## Key insight
Replace OR with +. A zero element doubles every count, which the loop does automatically when it reaches s − 0 = s (the downward loop runs to x = 0 inclusive).

## Approach: Counting row
```java
// ways[s] = subsets of the items seen so far that sum to s
public int perfectSum(int[] arr, int target) {
    long[] ways = new long[target + 1];
    ways[0] = 1;
    for (int x : arr)
        for (int s = target; s >= x; s--) ways[s] = (ways[s] + ways[s - x]) % MOD;
    return (int) ways[target];
}
```

| Approach | Time | Space |
|---|---|---|
| Counting row | O(n · target) | O(target) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>What happens with zeros?</summary>

ways[s] += ways[s], so each zero doubles the count: it can be in or out.

</details>


<details><summary>Why not start counting at s = 1?</summary>

Then zeros would be ignored.

</details>


## Connected
- [Subset Sum Problem](Subset%20Sum%20Problem.md)
- [Partitions with Given Difference](Partitions%20with%20Given%20Difference.md)
- [Target Sum](Target%20Sum.md)
