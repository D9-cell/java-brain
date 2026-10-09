---
topic: Stairs and Robbers
pattern: [Last-piece argument, Strings]
source: LeetCode 91
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Decode Ways

> [!TIP]
> **🧠 Memory hook**
> The last character is either decoded **alone** or **with its neighbour**.
> **Mantra: dp[i] = (s[i−1] ≠ 0 ? dp[i−1] : 0) + (10 ≤ s[i−2..i−1] ≤ 26 ? dp[i−2] : 0)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=11) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Letters A–Z map to 1–26. Return the number of ways to decode a digit string.

## Key insight
Split by the last piece: a single digit 1–9, or a two-digit number 10–26. Zero can only be part of 10 or 20.

## Approach 1: Rolling variables
```java
// dp[i] = ways to decode the first i characters: a single digit 1-9 and/or a two-digit 10-26 at the end
public int numDecodings(String s) {
    int n = s.length();
    int prev2 = 1, prev1 = s.charAt(0) == '0' ? 0 : 1;
    for (int i = 2; i <= n; i++) {
        int cur = 0;
        if (s.charAt(i - 1) != '0') cur += prev1;
        int two = (s.charAt(i - 2) - '0') * 10 + (s.charAt(i - 1) - '0');
        if (two >= 10 && two <= 26) cur += prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}
```

## Approach 2: Top-down memo
```java
// Top-down recursion with memo on the start index
public int numDecodingsMemo(String s) { return go(s, 0, new int[s.length() + 1]); }

// Ways to decode s[i..]
private int go(String s, int i, int[] memo) {
    if (i == s.length()) return 1;
    if (s.charAt(i) == '0') return 0;
    if (memo[i] != 0) return memo[i] - 1;
    int res = go(s, i + 1, memo);
    if (i + 1 < s.length() && (s.charAt(i) == '1' || (s.charAt(i) == '2' && s.charAt(i + 1) <= '6'))) res += go(s, i + 2, memo);
    memo[i] = res + 1;
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Rolling variables | O(n) | O(1) |
| Top-down memo | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why does "06" give 0?</summary>

0 alone is invalid and "06" is not a legal two-digit code.

</details>


## Connected
- [Decode Ways II](Decode%20Ways%20II.md)
- [Climbing Stairs](Climbing%20Stairs.md)
