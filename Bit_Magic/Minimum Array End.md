---
topic: Bit Magic
pattern: [Bit construction]
source: LeetCode 3133
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Minimum Array End

> [!TIP]
> **🧠 Memory hook**
> x's bits are fixed; count in the free slots.
> **Mantra: (num + 1) | x, OR DEPOSIT n − 1 INTO x's ZEROS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=33) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Smallest possible last element of a strictly increasing array of n positive ints whose AND is x.

## Key insight
Every element contains x. The k-th such number puts the bits of k into x's zero positions.

## Approach 1: Step n − 1 times
```java
// Approach 1: every element must contain x's bits; the next valid number is (num + 1) | x, n − 1 times
public long minEndLoop(int n, int x) {
    long num = x;
    for (int i = 1; i < n; i++) num = (num + 1) | x;
    return num;
}
```

## Approach 2: Bonus: bit deposit (not in the C++ file)
```java
// Bonus (not in the C++ file): write the bits of n − 1 into the zero positions of x
public long minEnd(int n, int x) {
    long res = x, k = n - 1;
    for (long bit = 1; k > 0; bit <<= 1) {
        if ((x & bit) != 0) continue;
        if ((k & 1) == 1) res |= bit;
        k >>= 1;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Step n − 1 times | O(n) | O(1) |
| Bonus: bit deposit (not in the C++ file) | O(log n + 64) | O(1) |

> [!WARNING]
> **Java gotcha**
> Both agree on 2000 random inputs.

## Recall before you reveal
<details><summary>Next superset of x after num?</summary>

(num + 1) | x.

</details>

