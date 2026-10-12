---
topic: Grid Shapes and Colorings
pattern: [Row type states, Counting]
source: LeetCode 1411
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Number of Ways to Paint N × 3 Grid

> [!TIP]
> **🧠 Memory hook**
> Only **two row shapes** matter: ABA (two colours) and ABC (three colours); counts per shape transition by fixed multipliers.
> **Mantra: ABA' = 3·ABA + 2·ABC · ABC' = 2·ABA + 2·ABC**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Shapes%20and%20Colorings/Grid%20Shapes%20and%20Colorings%20Animations.html#p=5) · **Pattern hub:** [Grid Shapes and Colorings - Pattern Map](Grid%20Shapes%20and%20Colorings%20-%20Pattern%20Map.md)

## Problem
Paint an n × 3 grid with 3 colours so no two adjacent cells (horizontally or vertically) share a colour. Return the count mod 10⁹ + 7.

## Key insight
A row is ABA (6 colourings) or ABC (6). Counting the legal rows under each type gives: ABA can be followed by 3 ABA and 2 ABC; ABC by 2 ABA and 2 ABC. So two numbers carry the whole state.

## Approach: Two running counts
```java
// Rows are either ABA or ABC (6 colourings each); the next row counts follow fixed multipliers
public int numOfWays(int n) {
    long aba = 6, abc = 6;
    for (int i = 2; i <= n; i++) {
        long nextAba = (3 * aba + 2 * abc) % MOD;
        long nextAbc = (2 * aba + 2 * abc) % MOD;
        aba = nextAba;
        abc = nextAbc;
    }
    return (int) ((aba + abc) % MOD);
}
```

| Approach | Time | Space |
|---|---|---|
| Two running counts | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random grids when it was written.

## Recall before you reveal
<details><summary>Why start at 6 and 6?</summary>

There are 6 colourings of each shape for the first row.

</details>


<details><summary>Check n = 1?</summary>

6 + 6 = 12 colourings of a single row.

</details>


## Connected
- [Painting a Grid With Three Different Colors](Painting%20a%20Grid%20With%20Three%20Different%20Colors.md)
- [Domino and Tromino Tiling](../Stairs%20and%20Robbers/Domino%20and%20Tromino%20Tiling.md)
