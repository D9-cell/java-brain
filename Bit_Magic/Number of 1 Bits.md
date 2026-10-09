---
topic: Bit Magic
pattern: [x & (x−1)]
source: LeetCode 191
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Number of 1 Bits

> [!TIP]
> **🧠 Memory hook**
> Switch off the lowest lamp until dark.
> **Mantra: n &= n − 1, COUNT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=38) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Number of set bits (Hamming weight).

## Key insight
n & (n−1) removes one set bit per step.

## Approach 1: Shift 32 times
```java
// Approach 1: test the last bit and shift (unsigned), 32 times
public int hammingWeightShift(int n) {
    int c = 0;
    for (int i = 0; i < 32; i++, n >>>= 1) c += n & 1;
    return c;
}
```

## Approach 2: Drop lowest bit
```java
// Approach 2: n & (n − 1) removes the lowest 1 bit: loop once per set bit
public int hammingWeight(int n) {
    int c = 0;
    while (n != 0) { n &= n - 1; c++; }
    return c;
}
```

## Approach 3: Divide by 2
```java
// Approach 3: n % 2 and n / 2 (for non-negative n)
public int hammingWeightDivide(int n) {
    int c = 0;
    for (long x = Integer.toUnsignedLong(n); x > 0; x /= 2) c += (int) (x % 2);
    return c;
}
```

## Approach 4: Built-in
```java
// Approach 4: built-in
public int hammingWeightBuiltin(int n) {
    return Integer.bitCount(n);
}
```

| Approach | Time | Space |
|---|---|---|
| Shift 32 times | O(32) | O(1) |
| Drop lowest bit | O(set bits) | O(1) |
| Divide by 2 | O(log n) | O(1) |
| Built-in | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Four approaches agree on random ints, including negatives.

## Recall before you reveal
<details><summary>Negative input?</summary>

Java ints are signed: use >>> or the n & (n−1) loop.

</details>


## Connected
- [Counting Bits](Counting%20Bits.md)
- [Power of Two](Power%20of%20Two.md)
