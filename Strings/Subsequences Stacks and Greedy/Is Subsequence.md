---
topic: Subsequences Stacks and Greedy
pattern: [Two pointers]
source: LeetCode 392
difficulty: Easy
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Is Subsequence

> [!TIP]
> **🧠 Memory hook**
> Walk t once; **advance in s on every match**. s is a subsequence iff its pointer reaches the end.
> **Mantra: s[i] == t[j] → i++ · RETURN i == |s|**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=0) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Return true if s is a subsequence of t (s can be obtained by deleting characters of t without reordering).

## Key insight
Matching each character of s as early as possible never hurts, because it leaves the most of t for the rest.

## Approach: Greedy pointers
```java
// Walk t once and advance in s whenever the characters match
public boolean isSubsequence(String s, String t) {
    int i = 0;
    for (int j = 0; j < t.length() && i < s.length(); j++)
        if (s.charAt(i) == t.charAt(j)) i++;
    return i == s.length();
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy pointers | O(|t|) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the earliest match safe?</summary>

Any later match leaves less of t.

</details>


<details><summary>Many queries of s?</summary>

Store the positions of each letter in t and binary search.

</details>


## Connected
- [Append Characters to String to Make Subsequence](Append%20Characters%20to%20String%20to%20Make%20Subsequence.md)
- [Make String a Subsequence Using Cyclic Increments](Make%20String%20a%20Subsequence%20Using%20Cyclic%20Increments.md)
