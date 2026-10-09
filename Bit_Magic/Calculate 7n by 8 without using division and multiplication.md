---
topic: Bit Magic
pattern: [Shifts]
source: Microsoft puzzle
difficulty: Easy
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Calculate 7n by 8 without using division and multiplication

> [!TIP]
> **🧠 Memory hook**
> Shifting by 3 is multiplying or dividing by 8.
> **Mantra: (n << 3) − n, THEN >> 3 (+7 FOR CEIL)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=2) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Compute ⌈7n/8⌉ with shifts and subtraction only.

## Key insight
7n = 8n − n = (n << 3) − n. Dividing by 8 is >> 3 (a floor); for the ceiling add 7 first.

## Approach 1: Floor (as in the C++ file)
```java
// The C++ file's formula: ((n << 3) − n) >> 3 = ⌊7n/8⌋ (the floor, not the ceiling the question asks for)
public static int sevenEighthsFloor(int n) {
    return ((n << 3) - n) >> 3;
}
```

## Approach 2: Ceiling (what was asked)
```java
// Ceiling: add 7 before shifting, since ⌈a/8⌉ = ⌊(a + 7)/8⌋
public static int sevenEighthsCeil(int n) {
    return (((n << 3) - n) + 7) >> 3;
}
```

| Approach | Time | Space |
|---|---|---|
| Floor (as in the C++ file) | O(1) | O(1) |
| Ceiling (what was asked) | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> The original C++ claims ⌈7n/8⌉ but computes ⌊7n/8⌋ (n = 9 gives 7, not 8). Both versions are verified for n in [−1000, 1000].

## Recall before you reveal
<details><summary>Ceil from floor?</summary>

⌈a/8⌉ = ⌊(a+7)/8⌋.

</details>

