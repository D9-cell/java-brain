---
topic: Prefix Variants
pattern: [Prefix and suffix, Minimax]
source: LeetCode 2017
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Grid Game

> [!TIP]
> **🧠 Memory hook**
> Robot 1 turns down at column c. Robot 2 then gets **max(top row after c, bottom row before c)**. Robot 1 picks c to minimise that.
> **Mantra: top = suffix of row 0, bottom = prefix of row 1 · best = min over c of max(top, bottom)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=4) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
A 2 × n grid. Robot 1 moves right/down from the top-left to the bottom-right and collects points, zeroing them. Robot 2 does the same afterwards. Robot 1 minimises robot 2's total. Return it.

## Key insight
After robot 1's path only two segments remain, and robot 2 can take one of them, so it takes the larger.

## Approach: Running top and bottom
```java
// Robot 1 turns down at column c; robot 2 then takes the larger of top-right or bottom-left leftovers
public long gridGame(int[][] grid) {
    int n = grid[0].length;
    long top = 0, bottom = 0, best = Long.MAX_VALUE;
    for (int v : grid[0]) top += v;
    for (int c = 0; c < n; c++) {
        top -= grid[0][c];
        best = Math.min(best, Math.max(top, bottom));
        bottom += grid[1][c];
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Running top and bottom | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why not maximise robot 1's points?</summary>

The goal is to minimise robot 2, a different objective.

</details>


<details><summary>Why long?</summary>

Sums reach 5·10¹⁰.

</details>


## Connected
- [Maximum Sum of Two Non-Overlapping Subarrays](Maximum%20Sum%20of%20Two%20Non-Overlapping%20Subarrays.md)
