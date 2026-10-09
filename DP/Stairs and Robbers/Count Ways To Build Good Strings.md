---
topic: Stairs and Robbers
pattern: [Last-piece argument, Length counting]
source: LeetCode 2466
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Count Ways To Build Good Strings

> [!TIP]
> **🧠 Memory hook**
> Strings are built by appending a block of **`zero` zeros or `one` ones**; count by length.
> **Mantra: dp[len] = dp[len − zero] + dp[len − one]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=15) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Return the number of different strings with length in [low, high] built by repeatedly appending `zero` zeros or `one` ones, modulo 1e9+7.

## Key insight
The last appended block is either the zero block or the one block, so the counts of the shorter lengths add up. Sum dp over the allowed range.

## Approach 1: Bottom-up
```java
// dp[len] = ways to build a string of length len by appending `zero` zeros or `one` ones; sum dp over [low, high]
public int countGoodStrings(int low, int high, int zero, int one) {
    int[] dp = new int[high + 1];
    dp[0] = 1;
    int total = 0;
    for (int len = 1; len <= high; len++) {
        if (len >= zero) dp[len] = (dp[len] + dp[len - zero]) % MOD;
        if (len >= one) dp[len] = (dp[len] + dp[len - one]) % MOD;
        if (len >= low) total = (total + dp[len]) % MOD;
    }
    return total;
}
```

## Approach 2: Top-down memo
```java
// Top-down recursion with memo over the current length
public int countGoodStringsMemo(int low, int high, int zero, int one) {
    int[] memo = new int[high + 1];
    Arrays.fill(memo, -1);
    return go(0, low, high, zero, one, memo);
}

// Number of good strings reachable from a string of the given length
private int go(int len, int low, int high, int zero, int one, int[] memo) {
    if (len > high) return 0;
    if (memo[len] != -1) return memo[len];
    int res = len >= low ? 1 : 0;
    res = (res + go(len + zero, low, high, zero, one, memo)) % MOD;
    res = (res + go(len + one, low, high, zero, one, memo)) % MOD;
    return memo[len] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| Bottom-up | O(high) | O(high) |
| Top-down memo | O(high) | O(high) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why count lengths, not strings?</summary>

The number of strings of a given length depends only on how many ways reach that length.

</details>


## Connected
- [Climbing Stairs](Climbing%20Stairs.md)
