---
topic: Stairs and Robbers
pattern: [Last-number argument, Digit strings]
source: LeetCode 1416
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Restore The Array

> [!TIP]
> **🧠 Memory hook**
> Cut the digit string into numbers in `[1, k]`; the **last number** is a suffix of at most ten digits.
> **Mantra: dp[i] = Σ dp[j] over valid last numbers s[j..i)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=17) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
A digit string was an array of integers in [1, k] with the commas removed. Count the possible arrays, modulo 1e9+7.

## Key insight
dp[i] = ways to split the first i digits. Extend backwards from i while the number stays ≤ k (at most 10 digits) and does not start with 0.

## Approach 1: Bottom-up
```java
// dp[i] = ways to split the first i digits into numbers in [1, k] without leading zeros
public int numberOfArrays(String s, int k) {
    int n = s.length();
    int[] dp = new int[n + 1];
    dp[0] = 1;
    for (int i = 1; i <= n; i++) {
        long value = 0, pow = 1;
        for (int j = i - 1; j >= 0; j--) {
            value += (s.charAt(j) - '0') * pow;
            if (value > k) break;
            pow *= 10;
            if (s.charAt(j) != '0') dp[i] = (dp[i] + dp[j]) % MOD;
        }
    }
    return dp[n];
}
```

## Approach 2: Top-down memo
```java
// Top-down: ways to split the suffix starting at i
public int numberOfArraysMemo(String s, int k) {
    int[] memo = new int[s.length() + 1];
    Arrays.fill(memo, -1);
    return go(s, k, 0, memo);
}

// Tries every next number starting at i
private int go(String s, int k, int i, int[] memo) {
    if (i == s.length()) return 1;
    if (s.charAt(i) == '0') return 0;
    if (memo[i] != -1) return memo[i];
    long value = 0;
    int res = 0;
    for (int j = i; j < s.length(); j++) {
        value = value * 10 + (s.charAt(j) - '0');
        if (value > k) break;
        res = (res + go(s, k, j + 1, memo)) % MOD;
    }
    return memo[i] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| Bottom-up | O(n log k) | O(n) |
| Top-down memo | O(n log k) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why at most ~10 steps back?</summary>

k ≤ 10⁹, so a number has at most 10 digits.

</details>


## Connected
- [Decode Ways](Decode%20Ways.md)
