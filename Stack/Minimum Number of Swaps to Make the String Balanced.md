---
topic: Stack
pattern: [Matching counter]
source: LeetCode 1963
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Minimum Number of Swaps to Make the String Balanced

> [!TIP]
> **🧠 Memory hook**
> After cancelling pairs, `]]][[[` is left; one swap fixes two pairs.
> **Mantra: CANCEL PAIRS, ceil(u / 2)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=17) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Minimum swaps to make the bracket string balanced.

## Key insight
Unmatched brackets form "]…][…[" with u of each; each swap fixes two → ceil(u/2).

## Approach: Counter
```java
// Cancel matched pairs; u unmatched '[' remain (and u unmatched ']'); one swap fixes two of them → ceil(u / 2)
public int minSwaps(String s) {
    int open = 0;
    for (char c : s.toCharArray()) {
        if (c == '[') open++;
        else if (open > 0) open--;
    }
    return (open + 1) / 2;
}
```

| Approach | Time | Space |
|---|---|---|
| Counter | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified with BFS over all swaps for every balanced-count string of length ≤ 8.

## Recall before you reveal
<details><summary>Formula?</summary>

(u + 1) / 2.

</details>

