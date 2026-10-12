---
topic: Subsequences Stacks and Greedy
pattern: [Two pointers]
source: LeetCode 2486
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Append Characters to String to Make Subsequence

> [!TIP]
> **🧠 Memory hook**
> Match as much of **t's prefix** inside s as possible; the **unmatched tail** of t must be appended.
> **Mantra: greedy match t in s · RETURN |t| − matched**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=1) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Return the minimum number of characters to append to the end of s so that t becomes a subsequence of s.

## Key insight
Appended characters can only cover a suffix of t. The longest prefix of t that is already a subsequence of s is found greedily.

## Approach: Greedy pointers
```java
// Match as much of t as possible inside s; the unmatched tail must be appended
public int appendCharacters(String s, String t) {
    int j = 0;
    for (int i = 0; i < s.length() && j < t.length(); i++)
        if (s.charAt(i) == t.charAt(j)) j++;
    return t.length() - j;
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy pointers | O(|s|) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why only a suffix of t?</summary>

Appended letters come after all of s.

</details>


<details><summary>Same as Is Subsequence?</summary>

Yes, but we keep the matched length.

</details>


## Connected
- [Is Subsequence](Is%20Subsequence.md)
