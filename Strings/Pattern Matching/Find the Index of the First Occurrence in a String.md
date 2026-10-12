---
topic: Pattern Matching
pattern: [KMP]
source: LeetCode 28
difficulty: Easy
companies: [Meta, Microsoft, Apple]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find the Index of the First Occurrence in a String

> [!TIP]
> **🧠 Memory hook**
> KMP with an **early return** at the first full match.
> **Mantra: lps(needle) · scan haystack · j == m → i − m**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Pattern%20Matching/Pattern%20Matching%20Animations.html#p=1) · **Pattern hub:** [Pattern Matching - Pattern Map](Pattern%20Matching%20-%20Pattern%20Map.md)

## Problem
Return the index of the first occurrence of needle in haystack, or -1.

## Key insight
haystack.indexOf(needle) works and is fine in practice, but its worst case is O(n · m); KMP guarantees O(n + m).

## Approach: KMP
```java
// KMP: build lps for needle, scan haystack once
public int strStr(String haystack, String needle) {
    int m = needle.length();
    int[] lps = new int[m];
    for (int i = 1, len = 0; i < m; ) {
        if (needle.charAt(i) == needle.charAt(len)) lps[i++] = ++len;
        else if (len > 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
    for (int i = 0, j = 0; i < haystack.length(); ) {
        if (haystack.charAt(i) == needle.charAt(j)) {
            i++;
            j++;
            if (j == m) return i - m;
        } else if (j > 0) j = lps[j - 1];
        else i++;
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| KMP | O(n + m) | O(m) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>When does indexOf hurt?</summary>

Inputs like "aaaa…ab" with needle "aaab".

</details>


<details><summary>Return value?</summary>

i − m, the start of the match.

</details>


## Connected
- [Knuth-Morris-Pratt KMP String Matching Algorithm](Knuth-Morris-Pratt%20KMP%20String%20Matching%20Algorithm.md)
- [Repeated Substring Pattern](Repeated%20Substring%20Pattern.md)
