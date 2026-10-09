---
topic: Knapsack Series
pattern: [Knapsack over the difference, Three choices]
source: LeetCode 956
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Tallest Billboard

> [!TIP]
> **🧠 Memory hook**
> Track the **height difference** between the two supports, and the tallest shorter side for each difference.
> **Mantra: ROD → TALLER SIDE: dp[d + r] · → SHORTER SIDE: dp[|d − r|] += min(d, r) · OR UNUSED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=14) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Weld rods into two supports of equal height (each rod used at most once, on one side). Return the largest possible height, or 0.

## Key insight
The state "left height, right height" is too big, but only the difference and the shorter height matter. Each rod goes on the taller side (difference grows), on the shorter side (difference shrinks or flips and the shorter side grows), or nowhere.

## Approach: dp over difference
```java
// dp[diff] = tallest shorter side for a height difference diff
public int tallestBillboard(int[] rods) {
    int sum = Arrays.stream(rods).sum();
    int[] dp = new int[sum + 1];
    Arrays.fill(dp, -1);
    dp[0] = 0;
    for (int r : rods) {
        int[] next = dp.clone();
        for (int d = 0; d <= sum; d++) {
            if (dp[d] < 0) continue;
            if (d + r <= sum) next[d + r] = Math.max(next[d + r], dp[d]);
            int nd = Math.abs(d - r);
            next[nd] = Math.max(next[nd], dp[d] + Math.min(d, r));
        }
        dp = next;
    }
    return dp[0];
}
```

| Approach | Time | Space |
|---|---|---|
| dp over difference | O(n · sum) | O(sum) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why store the shorter side?</summary>

Taller = shorter + diff, so one number suffices.

</details>


<details><summary>Why copy the array per rod?</summary>

Each rod must be used once; reading the old dp prevents reuse.

</details>


## Connected
- [Partition Equal Subset Sum](Partition%20Equal%20Subset%20Sum.md)
- [Last Stone Weight II](Last%20Stone%20Weight%20II.md)
