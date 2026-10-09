---
topic: Recursion
pattern: [Self-similar string, Mirror]
source: LeetCode 1545
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Find Kth Bit in Nth Binary String

> [!TIP]
> **🧠 Memory hook**
> A mirror with a tint: left copy, a bright middle 1, then the mirrored and inverted copy.
> **Mantra: LEFT → RECURSE, MID → 1, RIGHT → MIRROR + FLIP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=8) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
S1 = "0", Sn = Sn−1 + "1" + reverse(invert(Sn−1)). Return the k-th bit of Sn.

## Key insight
Three zones: k < mid → recurse; k == mid → '1'; k > mid → flip(f(n−1, len − k + 1)).

## Approach: Recursion on zones
```java
// S_n = S_{n-1} + "1" + reverse(invert(S_{n-1})): left half recurses, middle is '1', right half mirrors and flips
public char findKthBit(int n, int k) {
    if (n == 1) return '0';
    int len = (1 << n) - 1, mid = (len + 1) / 2;
    if (k < mid) return findKthBit(n - 1, k);
    if (k == mid) return '1';
    char c = findKthBit(n - 1, len - k + 1);
    return c == '0' ? '1' : '0';
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion on zones | O(n) | O(n) |

## Recall before you reveal
<details><summary>Mirror index?</summary>

len − k + 1.

</details>


## Connected
- [K-th Symbol in Grammar](K-th%20Symbol%20in%20Grammar.md)
