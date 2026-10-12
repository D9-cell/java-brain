---
topic: Pattern Matching
pattern: [Doubling trick, lps period]
source: LeetCode 459
difficulty: Easy
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Repeated Substring Pattern

> [!TIP]
> **🧠 Memory hook**
> s is a repetition iff s appears inside **(s + s) with the first and last characters removed**. KMP view: period **n − lps[n−1]** divides n.
> **Mantra: (s+s)[1..2n−1).contains(s) · OR lps > 0 && n % (n − lps) == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Pattern%20Matching/Pattern%20Matching%20Animations.html#p=2) · **Pattern hub:** [Pattern Matching - Pattern Map](Pattern%20Matching%20-%20Pattern%20Map.md)

## Problem
Return true if s can be built by repeating one of its substrings several times.

## Key insight
If s = u^k, shifting by |u| maps s onto itself, so s appears at that offset in s + s. Removing the ends rules out the trivial matches at 0 and n. The smallest period of s is n − lps[n − 1]; s is a repetition when that period divides n.

## Approach 1: Doubling
```java
// s is a repetition iff s appears in (s + s) with the first and last characters removed
public boolean repeatedSubstringPattern(String s) {
    String doubled = s + s;
    return doubled.substring(1, doubled.length() - 1).contains(s);
}
```

## Approach 2: lps period
```java
// KMP view: the period n - lps[n-1] must divide n and be shorter than n
public boolean repeatedSubstringPatternLps(String s) {
    int n = s.length();
    int[] lps = new int[n];
    for (int i = 1, len = 0; i < n; ) {
        if (s.charAt(i) == s.charAt(len)) lps[i++] = ++len;
        else if (len > 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
    int period = n - lps[n - 1];
    return lps[n - 1] > 0 && n % period == 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Doubling | O(n) with KMP search | O(n) |
| lps period | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why remove the ends?</summary>

Otherwise s always occurs at index 0.

</details>


<details><summary>"abab": lps?</summary>

lps[3] = 2, period 2 divides 4 → true.

</details>


## Connected
- [Rotate String](Rotate%20String.md)
- [Knuth-Morris-Pratt KMP String Matching Algorithm](Knuth-Morris-Pratt%20KMP%20String%20Matching%20Algorithm.md)
