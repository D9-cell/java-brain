---
topic: Stairs and Robbers
pattern: [Last-piece argument, Wildcard multipliers]
source: LeetCode 639
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Decode Ways II

> [!TIP]
> **🧠 Memory hook**
> Same recurrence, but `*` can be any digit 1–9, so each case **multiplies by a count**.
> **Mantra: single(c) · dp[i−1] + pair(a, b) · dp[i−2]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=12) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Decode Ways where `*` stands for any digit 1–9. Return the number of ways modulo 1e9+7.

## Key insight
Precompute how many ways a single character decodes (`*` → 9, `0` → 0, else 1) and how many ways two characters form a code 10–26 (`**` → 15, `1*` → 9, `2*` → 6, `*d` → 2 if d ≤ 6 else 1).

## Approach 1: Rolling variables
```java
// Same recurrence as Decode Ways, but '*' is any digit 1-9: count how many single and pair combinations a (possibly starred) pattern allows
public int numDecodings(String s) {
    long prev2 = 1, prev1 = single(s.charAt(0));
    for (int i = 1; i < s.length(); i++) {
        long cur = (prev1 * single(s.charAt(i)) + prev2 * pair(s.charAt(i - 1), s.charAt(i))) % MOD;
        prev2 = prev1;
        prev1 = cur;
    }
    return (int) prev1;
}

// Ways a single character decodes
private long single(char c) { return c == '*' ? 9 : c == '0' ? 0 : 1; }

// Ways the two characters decode as one letter 10-26
private long pair(char a, char b) {
    if (a == '*' && b == '*') return 15;
    if (a == '*') return b <= '6' ? 2 : 1;
    if (b == '*') return a == '1' ? 9 : a == '2' ? 6 : 0;
    int v = (a - '0') * 10 + (b - '0');
    return v >= 10 && v <= 26 ? 1 : 0;
}
```

## Approach 2: Top-down memo
```java
// Top-down memo on the start index
public int numDecodingsMemo(String s) {
    long[] memo = new long[s.length() + 1];
    Arrays.fill(memo, -1);
    return (int) go(s, 0, memo);
}

// Ways to decode s[i..]
private long go(String s, int i, long[] memo) {
    if (i == s.length()) return 1;
    if (memo[i] != -1) return memo[i];
    long res = single(s.charAt(i)) * go(s, i + 1, memo);
    if (i + 1 < s.length()) res += pair(s.charAt(i), s.charAt(i + 1)) * go(s, i + 2, memo);
    return memo[i] = res % MOD;
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
<details><summary>Why `**` = 15?</summary>

11–19 (9 codes) and 21–26 (6 codes).

</details>


## Connected
- [Decode Ways](Decode%20Ways.md)
