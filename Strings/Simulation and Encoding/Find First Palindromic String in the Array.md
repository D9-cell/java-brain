---
topic: Simulation and Encoding
pattern: [Two pointers]
source: LeetCode 2108
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find First Palindromic String in the Array

> [!TIP]
> **🧠 Memory hook**
> Check each word with **two pointers** moving inward; return the first that survives.
> **Mantra: l, r inward while equal · l ≥ r → palindrome**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=18) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
Return the first palindromic string in words, or "".

## Key insight
Two pointers check a palindrome without building a reversed copy.

## Approach: Two pointers
```java
// Two pointers per word; return the first palindrome
public String firstPalindrome(String[] words) {
    for (String w : words) {
        int l = 0, r = w.length() - 1;
        while (l < r && w.charAt(l) == w.charAt(r)) {
            l++;
            r--;
        }
        if (l >= r) return w;
    }
    return "";
}
```

| Approach | Time | Space |
|---|---|---|
| Two pointers | O(total length) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against the LeetCode samples.

## Recall before you reveal
<details><summary>Why l ≥ r?</summary>

The pointers met without a mismatch.

</details>


<details><summary>Copy-based check?</summary>

new StringBuilder(w).reverse().equals(w), with extra memory.

</details>


## Connected
- [Shortest Palindrome](../Pattern%20Matching/Shortest%20Palindrome.md)
