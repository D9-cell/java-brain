---
topic: Strings and Subsequences
pattern: [Counting grid, Skip or use]
source: LeetCode 115
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Distinct Subsequences

> [!TIP]
> **🧠 Memory hook**
> Count the ways to **cross out letters of s** so that t remains.
> **Mantra: ways[j] += ways[j − 1] IF s[i] == t[j − 1] (j DOWN)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=11) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Count the distinct index subsequences of s that spell t.

## Key insight
For each char of s: it can be skipped (ways unchanged) or, if it equals t[j − 1], used to extend every way of forming t[0..j − 1). One row scanned backwards keeps "previous row" values.

## Approach 1: One counting row
```java
// ways[j] = ways to form t[0..j) from the prefix of s seen so far; j scanned backwards
public int numDistinct(String s, String t) {
    long[] ways = new long[t.length() + 1];
    ways[0] = 1;
    for (char c : s.toCharArray())
        for (int j = t.length(); j >= 1; j--)
            if (t.charAt(j - 1) == c) ways[j] += ways[j - 1];
    return (int) ways[t.length()];
}
```

## Approach 2: Top-down memo
```java
// Top-down over (i, j): use s[i] for t[j] or skip s[i]
public int numDistinctMemo(String s, String t) {
    Integer[][] memo = new Integer[s.length()][t.length()];
    return go(s, t, 0, 0, memo);
}

// Ways to form t[j..] from s[i..]
private int go(String s, String t, int i, int j, Integer[][] memo) {
    if (j == t.length()) return 1;
    if (s.length() - i < t.length() - j) return 0;
    if (memo[i][j] != null) return memo[i][j];
    int r = go(s, t, i + 1, j, memo);
    if (s.charAt(i) == t.charAt(j)) r += go(s, t, i + 1, j + 1, memo);
    return memo[i][j] = r;
}
```

| Approach | Time | Space |
|---|---|---|
| One counting row | O(|s| · |t|) | O(|t|) |
| Top-down memo | O(|s| · |t|) | O(|s| · |t|) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Base case?</summary>

ways[0] = 1: the empty t is formed once.

</details>


<details><summary>Why backwards?</summary>

Each char of s is used at most once per way.

</details>


## Connected
- [Distinct Subsequences II](Distinct%20Subsequences%20II.md)
- [Number of Ways to Form a Target String Given a Dictionary](Number%20of%20Ways%20to%20Form%20a%20Target%20String%20Given%20a%20Dictionary.md)
