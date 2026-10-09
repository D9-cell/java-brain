---
topic: Stairs and Robbers
pattern: [Last-column argument, Linear recurrence]
source: LeetCode 790
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Domino and Tromino Tiling

> [!TIP]
> **🧠 Memory hook**
> Look at the **last column**: one vertical domino, two horizontals, or an L tromino pair that reaches back further.
> **Mantra: f(n) = 2·f(n−1) + f(n−3)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=14) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Count the tilings of a 2 × n board with dominoes and L-trominoes, modulo 1e9+7.

## Key insight
Case analysis on how the right end is covered gives `f(n) = f(n-1) + f(n-2) + 2 · (partial states)`, which simplifies to `f(n) = 2 f(n-1) + f(n-3)`. A two-state DP (full, one extra cell) shows where the 2 comes from.

## Approach 1: Recurrence
```java
// f(n) = 2 f(n-1) + f(n-3): a vertical domino or a tromino pair extends the shorter tilings
public int numTilings(int n) {
    if (n <= 2) return n;
    long a = 1, b = 1, c = 2;
    for (int i = 3; i <= n; i++) { long d = (2 * c + a) % MOD; a = b; b = c; c = d; }
    return (int) c;
}
```

## Approach 2: Full / partial states
```java
// States: full[i] = tilings of a 2 x i board; part[i] = tilings of 2 x i plus one extra cell sticking out in one row
public int numTilingsStates(int n) {
    long[] full = new long[n + 2], part = new long[n + 2];
    full[0] = 1;
    full[1] = 1;
    for (int i = 2; i <= n; i++) {
        full[i] = (full[i - 1] + full[i - 2] + 2 * part[i - 1]) % MOD;
        part[i] = (part[i - 1] + full[i - 2]) % MOD;
    }
    return (int) full[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Recurrence | O(n) | O(1) |
| Full / partial states | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against placing pieces on a 2 × n board. Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why is there a factor 2?</summary>

A tromino can cover the extra cell from above or below.

</details>


## Connected
- [Climbing Stairs](Climbing%20Stairs.md)
