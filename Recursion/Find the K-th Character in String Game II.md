---
topic: Recursion
pattern: [Self-similar string, Walk back]
source: LeetCode 3307
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Find the K-th Character in String Game II

> [!TIP]
> **🧠 Memory hook**
> A word that doubles every day: the second half is a (shifted) copy of the first; walk back to the letter's origin.
> **Mantra: FIND DOUBLING, k − len/2, SHIFT IF op = 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=21) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Start "a"; op 0 appends a copy, op 1 appends a +1 shifted copy. Return the k-th character.

## Key insight
Find the first doubling whose length reaches k: k is in that copy's second half, at k − len/2 of the earlier word. Shift if that operation was 1.

## Approach: Recursion
```java
// Find the first operation whose result reaches k; k sits in its second half, so map it back and maybe shift
public char kthCharacter(long k, int[] operations) {
    if (k == 1) return 'a';
    long len = 1;
    int op = 0;
    long newK = k;
    for (int i = 0; i < operations.length; i++) {
        len *= 2;
        if (len >= k) {
            op = operations[i];
            newK = k - len / 2;
            break;
        }
    }
    char c = kthCharacter(newK, operations);
    return op == 0 ? c : (char) ('a' + (c - 'a' + 1) % 26);
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion | O(log k) | O(log k) |

## Recall before you reveal
<details><summary>Wrap-around?</summary>

('z' + 1) → 'a' via % 26.

</details>


<details><summary>Iterative alternative?</summary>

Count the 1-ops over the set bits of k−1.

</details>


## Connected
- [K-th Symbol in Grammar](K-th%20Symbol%20in%20Grammar.md)
