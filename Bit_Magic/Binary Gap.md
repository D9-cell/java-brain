---
topic: Bit Magic
pattern: [Bit scan]
source: LeetCode 868
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Binary Gap

> [!TIP]
> **🧠 Memory hook**
> Distance between neighbouring lit lamps.
> **Mantra: REMEMBER THE PREVIOUS 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=12) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Longest distance between two adjacent 1 bits.

## Key insight
Scan the bits remembering the last 1 position.

## Approach 1: 32-bit scan
```java
// Approach 1: scan the 32 bits, remembering the position of the previous 1
public int binaryGap(int n) {
    int prev = -1, best = 0;
    for (int i = 0; i < 32; i++) {
        if ((n >> i & 1) == 0) continue;
        if (prev != -1) best = Math.max(best, i - prev);
        prev = i;
    }
    return best;
}
```

## Approach 2: Shift loop
```java
// Approach 2: shift n right until it is 0, counting the distance since the last 1
public int binaryGapShift(int n) {
    int best = 0, dist = -32;
    for (; n > 0; n >>= 1) {
        if ((n & 1) == 1) { best = Math.max(best, dist); dist = 0; }
        dist++;
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| 32-bit scan | O(32) | O(1) |
| Shift loop | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified for n < 5000.

## Recall before you reveal
<details><summary>Only one 1?</summary>

0.

</details>

