---
topic: Subsequences Stacks and Greedy
pattern: [Greedy start, Length cap]
source: LeetCode 3403
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find the Lexicographically Largest String From the Box I

> [!TIP]
> **🧠 Memory hook**
> A piece can be at most **n − (friends − 1)** long. Try every start, take the longest allowed piece, keep the **largest**.
> **Mantra: friends == 1 → word · maxLen = n − f + 1 · best = max over i of word[i..i+maxLen)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=10) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Split word into numFriends non-empty pieces in every possible way and put all pieces in a box. Return the lexicographically largest string in the box.

## Key insight
For a fixed start, a longer piece is never smaller, so use the longest allowed. Every start can have such a piece in some split. The O(n) version finds the largest suffix with two pointers.

## Approach: Try every start
```java
// Best start is the largest suffix; take as much of it as the other friends allow
public String answerString(String word, int numFriends) {
    if (numFriends == 1) return word;
    int n = word.length(), maxLen = n - numFriends + 1;
    String best = "";
    for (int i = 0; i < n; i++) {
        String cand = word.substring(i, Math.min(n, i + maxLen));
        if (cand.compareTo(best) > 0) best = cand;
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Try every start | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why numFriends == 1 special?</summary>

The only piece is the whole word.

</details>


<details><summary>Why is longer better?</summary>

A string is smaller than any extension of it.

</details>


## Connected
- [Orderly Queue](Orderly%20Queue.md)
