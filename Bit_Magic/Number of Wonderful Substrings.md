---
topic: Bit Magic
pattern: [Prefix parity mask]
source: LeetCode 1915
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Number of Wonderful Substrings

> [!TIP]
> **🧠 Memory hook**
> Parity masks: equal or one lamp apart.
> **Mantra: PREFIX MASK, COUNT SAME + 10 NEIGHBOURS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=42) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Substrings (letters a–j) with at most one letter of odd frequency.

## Key insight
A substring's parities = XOR of two prefix masks; it is wonderful if they are equal or differ in one bit.

## Approach: Mask counts
```java
// Prefix parity mask over a..j; a substring has ≤ 1 odd letter ⇔ prefix masks are equal or differ in one bit
public long wonderfulSubstrings(String word) {
    long[] cnt = new long[1024];
    cnt[0] = 1;
    int mask = 0;
    long res = 0;
    for (char c : word.toCharArray()) {
        mask ^= 1 << (c - 'a');
        res += cnt[mask];
        for (int b = 0; b < 10; b++) res += cnt[mask ^ (1 << b)];
        cnt[mask]++;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Mask counts | O(10·n) | O(1024) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Why 1024?</summary>

2^10 masks.

</details>


## Connected
- [Longest Balanced Substring II](../HashMap/Longest%20Balanced%20Substring%20II.md)
