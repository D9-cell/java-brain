---
topic: Pattern Matching
pattern: [lps on s#rev(s)]
source: LeetCode 214
difficulty: Hard
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Shortest Palindrome

> [!TIP]
> **🧠 Memory hook**
> Find the **longest palindromic prefix** of s: it is the lps value at the end of **s + "#" + reverse(s)**. Put the reversed rest in front.
> **Mantra: lps(s # rev) · keep = last lps · rev[0..n−keep) + s**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Pattern%20Matching/Pattern%20Matching%20Animations.html#p=4) · **Pattern hub:** [Pattern Matching - Pattern Map](Pattern%20Matching%20-%20Pattern%20Map.md)

## Problem
Add characters in front of s to make the shortest possible palindrome. Return it.

## Key insight
A prefix of s is a palindrome iff it equals a suffix of reverse(s). The "#" stops the match from crossing into the other half. Everything after the palindromic prefix must be mirrored at the front.

## Approach: KMP on s#rev
```java
// lps of s + "#" + reverse(s) gives the longest palindromic prefix; mirror the rest in front
public String shortestPalindrome(String s) {
    String rev = new StringBuilder(s).reverse().toString();
    String t = s + "#" + rev;
    int[] lps = new int[t.length()];
    for (int i = 1, len = 0; i < t.length(); ) {
        if (t.charAt(i) == t.charAt(len)) lps[i++] = ++len;
        else if (len > 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
    int keep = lps[t.length() - 1];
    return rev.substring(0, s.length() - keep) + s;
}
```

| Approach | Time | Space |
|---|---|---|
| KMP on s#rev | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why "#"?</summary>

It keeps the prefix-suffix match within one copy.

</details>


<details><summary>Brute force?</summary>

Try every prefix as a palindrome: O(n²).

</details>


## Connected
- [Knuth-Morris-Pratt KMP String Matching Algorithm](Knuth-Morris-Pratt%20KMP%20String%20Matching%20Algorithm.md)
- [Find the Closest Palindrome](../Numbers%20as%20Strings/Find%20the%20Closest%20Palindrome.md)
