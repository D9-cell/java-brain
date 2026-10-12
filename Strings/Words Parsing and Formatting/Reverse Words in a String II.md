---
topic: Words Parsing and Formatting
pattern: [Reverse twice]
source: LeetCode 186
difficulty: Medium
companies: [Microsoft, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Reverse Words in a String II

> [!TIP]
> **🧠 Memory hook**
> **Reverse the whole array**, then **reverse each word** back. Word order flips, letters come out right.
> **Mantra: reverse(all) · reverse(each word)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=2) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Given a char array of words separated by single spaces, reverse the order of words in place.

## Key insight
Reversing the whole sequence puts the words in the right order but each one backwards; a second reverse per word fixes the letters. The same trick rotates an array.

## Approach: Two reversals
```java
// Reverse the whole array, then reverse each word back in place
public void reverseWords(char[] s) {
    reverse(s, 0, s.length - 1);
    int start = 0;
    for (int i = 0; i <= s.length; i++)
        if (i == s.length || s[i] == ' ') {
            reverse(s, start, i - 1);
            start = i + 1;
        }
}

// Reverses s[l..r] in place
void reverse(char[] s, int l, int r) {
    while (l < r) {
        char t = s[l];
        s[l++] = s[r];
        s[r--] = t;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Two reversals | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why does it work?</summary>

reverse(AB) = reverse(B) reverse(A).

</details>


<details><summary>Related?</summary>

Rotate Array uses the same three-reversal identity.

</details>


## Connected
- [Reverse Words in a String](Reverse%20Words%20in%20a%20String.md)
- [Rotate String](../Pattern%20Matching/Rotate%20String.md)
