---
topic: Strings and Subsequences
pattern: [Count by last character, Remove duplicates]
source: LeetCode 940
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Distinct Subsequences II

> [!TIP]
> **🧠 Memory hook**
> Every distinct subsequence is identified by **its last letter**; a new copy of c replaces the old "ends in c" bucket.
> **Mantra: fresh = total + 1; total += fresh − endsWith[c]; endsWith[c] = fresh**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Strings%20and%20Subsequences/Strings%20and%20Subsequences%20Animations.html#p=12) · **Pattern hub:** [Strings and Subsequences - Pattern Map](Strings%20and%20Subsequences%20-%20Pattern%20Map.md)

## Problem
Count the distinct non-empty subsequences of s, modulo 1e9+7.

## Key insight
Appending c to every distinct subsequence so far (plus the empty one) gives total + 1 subsequences ending in c. They include every older subsequence ending in c, so the old bucket is replaced, not added.

## Approach: 26 buckets
```java
// endsWith[c] = distinct subsequences ending in c; a new c replaces that count with (all + 1)
public int distinctSubseqII(String s) {
    long[] endsWith = new long[26];
    long total = 0;
    for (char ch : s.toCharArray()) {
        int c = ch - 'a';
        long fresh = (total + 1) % MOD;
        total = (total - endsWith[c] + fresh + MOD) % MOD;
        endsWith[c] = fresh;
    }
    return (int) total;
}
```

| Approach | Time | Space |
|---|---|---|
| 26 buckets | O(n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why replace, not add?</summary>

The new set ending in c contains the old one.

</details>


<details><summary>Modulo trap?</summary>

Add MOD before taking % after a subtraction.

</details>


## Connected
- [Distinct Subsequences](Distinct%20Subsequences.md)
- [Count Vowels Permutation](../Counting%20Walks%20and%20Moves/Count%20Vowels%20Permutation.md)
