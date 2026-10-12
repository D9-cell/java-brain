---
topic: Words Parsing and Formatting
pattern: [Word boundaries, Two pointers]
source: LeetCode 557
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Reverse Words in a String III

> [!TIP]
> **🧠 Memory hook**
> Find each word between spaces and **reverse it in place**; word order stays.
> **Mantra: FOR each word [start, i): swap ends inward**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=3) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Reverse the characters of each word in s, keeping word order and spaces.

## Key insight
Treat the end of the string like a space so the last word is handled by the same branch.

## Approach: Reverse each word
```java
// Reverse each space-separated word in place
public String reverseWords(String s) {
    char[] a = s.toCharArray();
    int start = 0;
    for (int i = 0; i <= a.length; i++)
        if (i == a.length || a[i] == ' ') {
            for (int l = start, r = i - 1; l < r; l++, r--) {
                char t = a[l];
                a[l] = a[r];
                a[r] = t;
            }
            start = i + 1;
        }
    return new String(a);
}
```

| Approach | Time | Space |
|---|---|---|
| Reverse each word | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why i <= length?</summary>

The virtual space at the end flushes the last word.

</details>


<details><summary>Why a char array?</summary>

Strings are immutable in Java.

</details>


## Connected
- [Reverse Words in a String II](Reverse%20Words%20in%20a%20String%20II.md)
- [Reverse Prefix of Word](Reverse%20Prefix%20of%20Word.md)
