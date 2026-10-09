---
topic: Bit Magic
pattern: [All-ones numbers]
source: LeetCode 3370
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Smallest Number With All Set Bits

> [!TIP]
> **🧠 Memory hook**
> Grow a row of lit lamps: 1, 3, 7, 15…
> **Mantra: x = (x << 1) | 1 WHILE x < n**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=22) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Smallest x ≥ n whose binary form is all ones.

## Key insight
All-ones numbers are 2^k − 1; take the first one ≥ n.

## Approach 1: Count up
```java
// Approach 1: count up from n until x & (x + 1) == 0 (x is all ones)
public int smallestNumberLoop(int n) {
    int x = n;
    while ((x & (x + 1)) != 0) x++;
    return x;
}
```

## Approach 2: Grow ones
```java
// Approach 2: build 1, 3, 7, 15, … until it reaches n
public int smallestNumber(int n) {
    int x = 1;
    while (x < n) x = (x << 1) | 1;
    return x;
}
```

## Approach 3: Bit length
```java
// Approach 3: as many ones as n has bits
public int smallestNumberConstant(int n) {
    return (1 << (32 - Integer.numberOfLeadingZeros(n))) - 1;
}
```

| Approach | Time | Space |
|---|---|---|
| Count up | O(result − n) | O(1) |
| Grow ones | O(log n) | O(1) |
| Bit length | O(1) | O(1) |

## Recall before you reveal
<details><summary>All-ones test?</summary>

x & (x + 1) == 0.

</details>

