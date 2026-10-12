---
topic: Subsequences Stacks and Greedy
pattern: [Stack, Suffix minimum]
source: LeetCode 2434
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Using a Robot to Print the Lexicographically Smallest String

> [!TIP]
> **🧠 Memory hook**
> Push each character onto t; **pop to paper while the top ≤ the smallest letter still unread** in s.
> **Mantra: minSuffix · push s[i] · WHILE top ≤ minSuffix[i+1]: print top**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=8) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
The robot moves the first character of s to the end of t, or writes the last character of t on paper. Return the lexicographically smallest paper string.

## Key insight
Writing the top is best unless a strictly smaller letter is still coming, in which case we should wait for it. The suffix minimum array answers that in O(1).

## Approach: Stack + suffix min
```java
// Push each char; pop to paper while the top is <= the smallest letter still unread
public String robotWithString(String s) {
    int n = s.length();
    char[] minSuffix = new char[n + 1];
    minSuffix[n] = 'z' + 1;
    for (int i = n - 1; i >= 0; i--) minSuffix[i] = (char) Math.min(s.charAt(i), minSuffix[i + 1]);
    StringBuilder t = new StringBuilder(), paper = new StringBuilder();
    for (int i = 0; i < n; i++) {
        t.append(s.charAt(i));
        while (t.length() > 0 && t.charAt(t.length() - 1) <= minSuffix[i + 1]) {
            paper.append(t.charAt(t.length() - 1));
            t.deleteCharAt(t.length() - 1);
        }
    }
    return paper.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Stack + suffix min | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why ≤ and not <?</summary>

An equal letter later gives no advantage; writing now is just as good.

</details>


<details><summary>What is t?</summary>

A stack.

</details>


## Connected
- [Remove Duplicate Letters](Remove%20Duplicate%20Letters.md)
