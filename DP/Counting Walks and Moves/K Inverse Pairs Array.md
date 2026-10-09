---
topic: Counting Walks and Moves
pattern: [Count by the last addition, Sliding window sum]
source: LeetCode 629
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# K Inverse Pairs Array

> [!TIP]
> **🧠 Memory hook**
> Insert the **largest number last**: placing it t spots from the end creates exactly t new inverse pairs.
> **Mantra: dp[i][j] = Σ dp[i−1][j−t], t = 0..i−1 (WINDOW SUM)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=18) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Count the permutations of 1..n with exactly k inverse pairs (i < j with a[i] > a[j]), modulo 1e9+7.

## Key insight
Build permutations by inserting n into a permutation of 1..n−1. The new number is bigger than all others, so it forms one pair with every number after it: 0 to n − 1 new pairs. That sum over a window of the previous row is maintained in O(1) per cell.

## Approach 1: Window-sum rows
```java
// dp[j] for i numbers; inserting number i creates 0..i-1 new pairs, summed with a sliding window
public int kInversePairs(int n, int k) {
    long[] dp = new long[k + 1];
    dp[0] = 1;
    for (int i = 2; i <= n; i++) {
        long[] next = new long[k + 1];
        long window = 0;
        for (int j = 0; j <= k; j++) {
            window = (window + dp[j]) % MOD;
            if (j - i >= 0) window = (window - dp[j - i] + MOD) % MOD;
            next[j] = window;
        }
        dp = next;
    }
    return (int) dp[k];
}
```

## Approach 2: Plain recurrence
```java
// Plain recurrence: dp[i][j] = sum of dp[i-1][j-t] for t in 0..min(j, i-1)
public int kInversePairsSlow(int n, int k) {
    long[][] dp = new long[n + 1][k + 1];
    dp[1][0] = 1;
    for (int i = 2; i <= n; i++)
        for (int j = 0; j <= k; j++)
            for (int t = 0; t <= Math.min(j, i - 1); t++) dp[i][j] = (dp[i][j] + dp[i - 1][j - t]) % MOD;
    return (int) dp[n][k];
}
```

| Approach | Time | Space |
|---|---|---|
| Window-sum rows | O(n · k) | O(k) |
| Plain recurrence | O(n · k · n) | O(n · k) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why insert the largest number?</summary>

Its pair count depends only on its position.

</details>


<details><summary>Window update?</summary>

Add dp[j], drop dp[j − i] once it leaves the window of size i.

</details>


## Connected
- [Number of Music Playlists](Number%20of%20Music%20Playlists.md)
- [Number of ZigZag Arrays I](Number%20of%20ZigZag%20Arrays%20I.md)
