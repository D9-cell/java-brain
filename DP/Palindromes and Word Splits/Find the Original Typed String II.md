---
topic: Palindromes and Word Splits
pattern: [Complement counting, Prefix sums]
source: LeetCode 3333
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Find the Original Typed String II

> [!TIP]
> **🧠 Memory hook**
> Each run of g equal letters could have been **1..g** keys; count all choices, then remove those that are too short.
> **Mantra: ANSWER = Π g − #(LENGTH < k) VIA PREFIX-SUM DP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=12) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
Alice may have held keys too long, so each run of equal letters in `word` comes from a run of 1..g letters. Count the possible original strings of length at least k (mod 1e9+7).

## Key insight
The total number of originals is the product of run lengths. If there are at least k runs, all of them are long enough. Otherwise count the choices with total length < k: a DP over runs where each run adds 1..g to the length, using prefix sums so each run costs O(k).

## Approach: Complement + prefix sums
```java
// All choices = product of run lengths; subtract those shorter than k with a prefix-sum DP over runs
public int possibleStringCount(String word, int k) {
    List<Integer> runs = new ArrayList<>();
    for (int i = 0; i < word.length(); ) { int j = i; while (j < word.length() && word.charAt(j) == word.charAt(i)) j++; runs.add(j - i); i = j; }
    long total = 1;
    for (int g : runs) total = total * g % MOD;
    if (runs.size() >= k) return (int) total;
    long[] dp = new long[k];
    dp[0] = 1;
    for (int g : runs) {
        long[] next = new long[k], prefix = new long[k + 1];
        for (int len = 0; len < k; len++) prefix[len + 1] = (prefix[len] + dp[len]) % MOD;
        for (int len = 1; len < k; len++) next[len] = (prefix[len] - prefix[Math.max(0, len - g)] + MOD) % MOD;
        dp = next;
    }
    long shorter = 0;
    for (long v : dp) shorter += v;
    return (int) (((total - shorter) % MOD + MOD) % MOD);
}
```

| Approach | Time | Space |
|---|---|---|
| Complement + prefix sums | O(n + runs · k) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why the complement?</summary>

Lengths < k are a small range (k ≤ 2000).

</details>


<details><summary>When is no DP needed?</summary>

runs ≥ k.

</details>


## Connected
- [Find All Possible Stable Binary Arrays II](Find%20All%20Possible%20Stable%20Binary%20Arrays%20II.md)
- [K Inverse Pairs Array](../Counting%20Walks%20and%20Moves/K%20Inverse%20Pairs%20Array.md)
