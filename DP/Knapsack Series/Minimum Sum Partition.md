---
topic: Knapsack Series
pattern: [Reduce to subset sum, Closest reachable]
source: GfG
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Minimum Sum Partition

> [!TIP]
> **🧠 Memory hook**
> The best split puts one side **as close to total / 2 as possible**.
> **Mantra: LARGEST REACHABLE s ≤ total / 2 → total − 2s**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=6) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Split the array into two subsets so that the absolute difference of their sums is minimum. Return that difference.

## Key insight
All reachable subset sums are known from a boolean row. The difference for S1 = s is total − 2s, minimised by the largest reachable s that is at most total / 2.

## Approach 1: Reachable sums
```java
// Reachable subset sums; the best S1 is the reachable sum closest to total / 2 from below
public int minDifference(int[] arr) {
    int total = Arrays.stream(arr).sum();
    boolean[] can = new boolean[total / 2 + 1];
    can[0] = true;
    for (int x : arr)
        for (int s = total / 2; s >= x; s--) can[s] |= can[s - x];
    for (int s = total / 2; ; s--) if (can[s]) return total - 2 * s;
}
```

## Approach 2: Memo over (i, s1)
```java
// Top-down: assign each element to the first subset or not
public int minDifferenceMemo(int[] arr) {
    int total = Arrays.stream(arr).sum();
    return go(arr, 0, 0, total, new Integer[arr.length][total + 1]);
}

// Smallest difference reachable from index i with s1 so far
private int go(int[] a, int i, int s1, int total, Integer[][] memo) {
    if (i == a.length) return Math.abs(total - 2 * s1);
    if (memo[i][s1] != null) return memo[i][s1];
    return memo[i][s1] = Math.min(go(a, i + 1, s1 + a[i], total, memo), go(a, i + 1, s1, total, memo));
}
```

| Approach | Time | Space |
|---|---|---|
| Reachable sums | O(n · total) | O(total) |
| Memo over (i, s1) | O(n · total) | O(n · total) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why stop at total / 2?</summary>

The other side mirrors any s above it.

</details>


<details><summary>Same problem in disguise?</summary>

Last Stone Weight II.

</details>


## Connected
- [Last Stone Weight II](Last%20Stone%20Weight%20II.md)
- [Partition Equal Subset Sum](Partition%20Equal%20Subset%20Sum.md)
