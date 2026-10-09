---
topic: Knapsack Series
pattern: [0-1 knapsack, Boolean reachability]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Subset Sum Problem

> [!TIP]
> **🧠 Memory hook**
> Knapsack where every item is worth nothing: just ask **which totals are reachable**.
> **Mantra: can[s] |= can[s − x]; s FROM sum DOWN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=1) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Given non-negative integers and a target sum, return true if some subset adds up to exactly sum.

## Key insight
can[s] is true when some subset of the processed items sums to s. Each new item x makes s reachable if s − x was reachable before. Downward scan keeps each item single-use.

## Approach 1: Boolean row
```java
// can[s] = some subset of the items seen so far sums to s (s scanned downward)
public boolean isSubsetSum(int[] arr, int sum) {
    boolean[] can = new boolean[sum + 1];
    can[0] = true;
    for (int x : arr)
        for (int s = sum; s >= x; s--) can[s] |= can[s - x];
    return can[sum];
}
```

## Approach 2: Top-down memo
```java
// Top-down: take or skip each element
public boolean isSubsetSumMemo(int[] arr, int sum) {
    return go(arr, 0, sum, new Boolean[arr.length][sum + 1]);
}

// Whether arr[i..] has a subset summing to left
private boolean go(int[] a, int i, int left, Boolean[][] memo) {
    if (left == 0) return true;
    if (i == a.length) return false;
    if (memo[i][left] != null) return memo[i][left];
    boolean r = go(a, i + 1, left, memo) || (a[i] <= left && go(a, i + 1, left - a[i], memo));
    return memo[i][left] = r;
}
```

| Approach | Time | Space |
|---|---|---|
| Boolean row | O(n · sum) | O(sum) |
| Top-down memo | O(n · sum) | O(n · sum) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Base case?</summary>

can[0] = true: the empty subset.

</details>


<details><summary>Faster in practice?</summary>

A bitset: shift-left by x and OR.

</details>


## Connected
- [0-1 Knapsack](0-1%20Knapsack.md)
- [Partition Equal Subset Sum](Partition%20Equal%20Subset%20Sum.md)
- [Count Subsets with Sum](Count%20Subsets%20with%20Sum.md)
