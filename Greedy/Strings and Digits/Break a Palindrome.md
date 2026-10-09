---
topic: Strings and Digits
pattern: [Leftmost change, First half only]
source: LeetCode 1328
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Break a Palindrome

> [!TIP]
> **🧠 Memory hook**
> Make the string as small as possible: **lower the first letter that is not `a`**, but only in the first half.
> **Mantra: FIRST NON-a IN THE FIRST HALF → a, ELSE LAST → b**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=0) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Replace exactly one character so the string is no longer a palindrome and is lexicographically smallest. Return "" if impossible.

## Key insight
Lowering the first non-`a` in the first half breaks the palindrome (its mirror stays). If the first half is all `a`, the only choice is to raise the last character to `b`. Length 1 is impossible.

## Approach: Single scan
```java
// Change the first non-'a' in the first half to 'a'; if the first half is all 'a', change the last character to 'b'
public String breakPalindrome(String palindrome) {
    int n = palindrome.length();
    if (n == 1) return "";
    char[] c = palindrome.toCharArray();
    for (int i = 0; i < n / 2; i++) if (c[i] != 'a') { c[i] = 'a'; return new String(c); }
    c[n - 1] = 'b';
    return new String(c);
}
```

| Approach | Time | Space |
|---|---|---|
| Single scan | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why only the first half?</summary>

The middle character of an odd palindrome mirrors itself; changing it keeps the string a palindrome.

</details>


## Connected
- [Maximum 69 Number](Maximum%2069%20Number.md)
