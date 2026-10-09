---
topic: Bit Magic
pattern: [x & (x−1)]
source: LeetCode 231
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Power of Two

> [!TIP]
> **🧠 Memory hook**
> A power of two has a single lit lamp.
> **Mantra: n > 0 && (n & (n−1)) == 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=19) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Is n a power of two?

## Key insight
Dropping the lowest set bit leaves 0 only when there was exactly one.

## Approach 1: Divide by 2
```java
// Approach 1: keep dividing by 2 while even
public boolean isPowerOfTwoDivide(int n) {
    if (n <= 0) return false;
    while (n % 2 == 0) n /= 2;
    return n == 1;
}
```

## Approach 2: n & (n−1)
```java
// Approach 2: a power of two has a single 1 bit, and n & (n − 1) clears it
public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
```

## Approach 3: Popcount
```java
// Approach 3: popcount == 1
public boolean isPowerOfTwoBitCount(int n) {
    return n > 0 && Integer.bitCount(n) == 1;
}
```

| Approach | Time | Space |
|---|---|---|
| Divide by 2 | O(log n) | O(1) |
| n & (n−1) | O(1) | O(1) |
| Popcount | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Three approaches agree on [−5000, 70000).

## Recall before you reveal
<details><summary>MIN_VALUE?</summary>

Not a power: n > 0 check.

</details>


## Connected
- [Number of 1 Bits](Number%20of%201%20Bits.md)
