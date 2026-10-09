---
topic: Palindromes and Word Splits
pattern: [Count by last symbol, Subtract the overflow]
source: LeetCode 3130
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Find All Possible Stable Binary Arrays II

> [!TIP]
> **🧠 Memory hook**
> Append one symbol at a time, then **subtract the arrays whose last run just became limit + 1**.
> **Mantra: dp[i][j][0] = dp[i−1][j][0] + dp[i−1][j][1] − dp[i−limit−1][j][1]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=10) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
Same as version I with zero, one, limit up to 1000.

## Key insight
dp[i][j][b] counts stable arrays with i zeros and j ones ending in b. Appending a 0 to any array with i − 1 zeros is stable unless it creates a run of limit + 1 zeros; those are exactly the arrays ending in 1 with i − limit − 1 zeros, followed by limit + 1 zeros.

## Approach: Prefix subtraction
```java
// dp[i][j][b] = arrays with i zeros, j ones ending in b; subtract the ones whose last run just exceeded limit
public int numberOfStableArrays(int zero, int one, int limit) {
    long[][][] dp = new long[zero + 1][one + 1][2];
    for (int i = 1; i <= Math.min(zero, limit); i++) dp[i][0][0] = 1;
    for (int j = 1; j <= Math.min(one, limit); j++) dp[0][j][1] = 1;
    for (int i = 1; i <= zero; i++)
        for (int j = 1; j <= one; j++) {
            dp[i][j][0] = dp[i - 1][j][0] + dp[i - 1][j][1] - (i > limit ? dp[i - limit - 1][j][1] : 0);
            dp[i][j][1] = dp[i][j - 1][0] + dp[i][j - 1][1] - (j > limit ? dp[i][j - limit - 1][0] : 0);
            dp[i][j][0] = ((dp[i][j][0] % MOD) + MOD) % MOD;
            dp[i][j][1] = ((dp[i][j][1] % MOD) + MOD) % MOD;
        }
    return (int) ((dp[zero][one][0] + dp[zero][one][1]) % MOD);
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix subtraction | O(zero · one) | O(zero · one) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Base cases?</summary>

Only zeros (or only ones) up to limit long.

</details>


<details><summary>Modulo after subtraction?</summary>

Add MOD before %.

</details>


## Connected
- [Find All Possible Stable Binary Arrays I](Find%20All%20Possible%20Stable%20Binary%20Arrays%20I.md)
