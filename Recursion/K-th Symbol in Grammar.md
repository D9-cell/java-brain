---
topic: Recursion
pattern: [Self-similar string]
source: LeetCode 779
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# K-th Symbol in Grammar

> [!TIP]
> **🧠 Memory hook**
> A photocopier: each row is the previous row plus an inverted copy.
> **Mantra: k ≤ HALF → SAME, ELSE FLIP OF k−HALF**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=6) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Row 1 is "0"; replace 0→01, 1→10. Return the k-th symbol of row n.

## Key insight
Row n = row n−1 + complement(row n−1). The first half copies; the second half flips position k − half.

## Approach: Recursion on halves
```java
// Row n = row n-1 followed by its complement: first half copies, second half flips
public int kthGrammar(int n, int k) {
    if (n == 1) return 0;
    int mid = 1 << (n - 2);
    if (k <= mid) return kthGrammar(n - 1, k);
    return 1 - kthGrammar(n - 1, k - mid);
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion on halves | O(n) | O(n) |

## Recall before you reveal
<details><summary>One-liner?</summary>

`Integer.bitCount(k - 1) & 1`.

</details>


## Connected
- [Find Kth Bit in Nth Binary String](Find%20Kth%20Bit%20in%20Nth%20Binary%20String.md)
