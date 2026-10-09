---
topic: Bit Magic
pattern: [XOR property]
source: LeetCode 3702
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Longest Subsequence With Non-Zero Bitwise XOR

> [!TIP]
> **🧠 Memory hook**
> If the total XOR is 0, drop one non-zero element.
> **Mantra: n, n − 1, OR 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=25) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Longest subsequence whose XOR is not zero.

## Key insight
Total XOR ≠ 0 → take all. Total 0 → removing a non-zero x leaves XOR x ≠ 0. All zeros → 0.

## Approach: Observation
```java
// Whole array if its XOR ≠ 0; else drop one non-zero element (n − 1); all zeros → 0
public int longestSubsequence(int[] nums) {
    int xor = 0;
    boolean allZero = true;
    for (int x : nums) { xor ^= x; if (x != 0) allZero = false; }
    if (allZero) return 0;
    return xor == 0 ? nums.length - 1 : nums.length;
}
```

| Approach | Time | Space |
|---|---|---|
| Observation | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against all subsequences.

## Recall before you reveal
<details><summary>All zeros?</summary>

0.

</details>

