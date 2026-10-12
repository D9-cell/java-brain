---
topic: Subsequences Stacks and Greedy
pattern: [Two pointers]
source: LeetCode 2825
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Make String a Subsequence Using Cyclic Increments

> [!TIP]
> **🧠 Memory hook**
> A character of str1 can serve a needed letter if it **equals it or is one step before it** (z before a). Then greedy matching.
> **Mantra: c == need || (c + 1) % 26 == need → j++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=2) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
You may pick any set of indexes in str1 and increment each chosen letter once cyclically. Return true if str2 can then be a subsequence of str1.

## Key insight
Each position is either incremented or not, independently, so a position can match a letter or its successor. Greedy earliest matching still works.

## Approach: Greedy pointers
```java
// A character of str1 matches if it equals the needed one or becomes it after one increment
public boolean canMakeSubsequence(String str1, String str2) {
    int j = 0;
    for (int i = 0; i < str1.length() && j < str2.length(); i++) {
        char c = str1.charAt(i), need = str2.charAt(j);
        if (c == need || (c - 'a' + 1) % 26 == need - 'a') j++;
    }
    return j == str2.length();
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy pointers | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why at most one step?</summary>

Each index is incremented at most once.

</details>


<details><summary>Wrap-around?</summary>

z becomes a, hence % 26.

</details>


## Connected
- [Is Subsequence](Is%20Subsequence.md)
