---
topic: Bit Magic
pattern: [One bit at a time]
source: LeetCode 2275
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Largest Combination With Bitwise AND Greater Than Zero

> [!TIP]
> **🧠 Memory hook**
> Pick a column (bit) and invite everyone who has it.
> **Mantra: MAX OVER BITS OF COUNT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=10) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Size of the largest subset whose AND is positive.

## Key insight
AND > 0 means all chosen numbers share at least one bit; so answer = max over bits of how many numbers have it.

## Approach 1: Counter array
```java
// Approach 1: count per bit how many numbers have it set; the AND is > 0 iff all chosen share one bit
public int largestCombinationCounter(int[] candidates) {
    int[] cnt = new int[24];
    for (int x : candidates) for (int b = 0; b < 24; b++) if ((x >> b & 1) == 1) cnt[b]++;
    int best = 0;
    for (int c : cnt) best = Math.max(best, c);
    return best;
}
```

## Approach 2: Bit by bit
```java
// Approach 2: same idea bit by bit without the array
public int largestCombination(int[] candidates) {
    int best = 0;
    for (int b = 0; b < 24; b++) {
        int c = 0;
        for (int x : candidates) if ((x & (1 << b)) != 0) c++;
        best = Math.max(best, c);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Counter array | O(24·n) | O(24) |
| Bit by bit | O(24·n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against all subsets.

## Recall before you reveal
<details><summary>Why 24 bits?</summary>

Values ≤ 1e7.

</details>

