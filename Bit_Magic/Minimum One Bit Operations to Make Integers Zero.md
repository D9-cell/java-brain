---
topic: Bit Magic
pattern: [Recurrence, Gray code]
source: LeetCode 1611
difficulty: Hard
companies: [LinkedIn]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Minimum One Bit Operations to Make Integers Zero

> [!TIP]
> **🧠 Memory hook**
> Clearing bit i costs 2^(i+1) − 1; lower set bits alternate in sign.
> **Mantra: +f(high) − f(next) + f(next) …**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=36) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Operations: flip bit 0, or flip bit i when bit i−1 is 1 and all lower bits are 0. Minimum ops to reach 0.

## Key insight
f(i) = 2·f(i−1) + 1 for a lone bit. Lower set bits are already partway along the path, so their costs alternate − and +.

## Approach: Alternating sum
```java
// f[i] = ops to clear a lone bit i = 2^(i+1) − 1; set bits from high to low alternate + and −
public int minimumOneBitOperations(int n) {
    long[] f = new long[32];
    f[0] = 1;
    for (int i = 1; i < 32; i++) f[i] = 2 * f[i - 1] + 1;
    long res = 0;
    int sign = 1;
    for (int i = 30; i >= 0; i--) {
        if ((n >> i & 1) == 0) continue;
        res += sign * f[i];
        sign = -sign;
    }
    return (int) res;
}
```

| Approach | Time | Space |
|---|---|---|
| Alternating sum | O(31) | O(32) |

> [!WARNING]
> **Java gotcha**
> Verified against BFS distances for n < 1024.

## Recall before you reveal
<details><summary>Closed form?</summary>

Inverse Gray code: n ^ (n>>1) ^ (n>>2) ^ …

</details>


## Connected
- [Gray Code](Gray%20Code.md)
