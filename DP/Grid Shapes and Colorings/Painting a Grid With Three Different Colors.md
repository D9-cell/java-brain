---
topic: Grid Shapes and Colorings
pattern: [Column pattern states, Compatibility graph]
source: LeetCode 1931
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Painting a Grid With Three Different Colors

> [!TIP]
> **🧠 Memory hook**
> m ≤ 5, so list every valid **column coloring** (at most 48) and count walks of length n over compatible columns.
> **Mantra: dp[col][pattern] = Σ dp[col−1][compatible pattern]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Grid%20Shapes%20and%20Colorings/Grid%20Shapes%20and%20Colorings%20Animations.html#p=6) · **Pattern hub:** [Grid Shapes and Colorings - Pattern Map](Grid%20Shapes%20and%20Colorings%20-%20Pattern%20Map.md)

## Problem
Paint an m × n grid with 3 colours so no two adjacent cells match. Return the count mod 10⁹ + 7.

## Key insight
A valid column has no equal vertical neighbours: 3 · 2^(m−1) patterns. Two columns may be adjacent when they differ in every row. Precompute the compatible pairs once and run the DP over columns.

## Approach: Patterns + transitions
```java
// Every valid column of height m is a state; two columns can sit side by side if no row matches
public int colorTheGrid(int m, int n) {
    List<int[]> cols = new ArrayList<>();
    build(m, new int[m], 0, cols);
    int s = cols.size();
    List<List<Integer>> next = new ArrayList<>();
    for (int a = 0; a < s; a++) {
        List<Integer> ok = new ArrayList<>();
        for (int b = 0; b < s; b++) if (compatible(cols.get(a), cols.get(b))) ok.add(b);
        next.add(ok);
    }
    long[] dp = new long[s];
    Arrays.fill(dp, 1);
    for (int col = 1; col < n; col++) {
        long[] nd = new long[s];
        for (int a = 0; a < s; a++) for (int b : next.get(a)) nd[b] = (nd[b] + dp[a]) % MOD;
        dp = nd;
    }
    long total = 0;
    for (long v : dp) total += v;
    return (int) (total % MOD);
}

// Lists every column colouring with no two vertical neighbours alike
private void build(int m, int[] cur, int row, List<int[]> out) {
    if (row == m) {
        out.add(cur.clone());
        return;
    }
    for (int c = 0; c < 3; c++) {
        if (row > 0 && cur[row - 1] == c) continue;
        cur[row] = c;
        build(m, cur, row + 1, out);
    }
}

// Whether two adjacent columns differ in every row
private boolean compatible(int[] a, int[] b) {
    for (int i = 0; i < a.length; i++) if (a[i] == b[i]) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Patterns + transitions | O(n · P²) | O(P²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random grids when it was written.

## Recall before you reveal
<details><summary>Why is P small?</summary>

m ≤ 5 gives at most 3 · 16 = 48 patterns.

</details>


<details><summary>Starting vector?</summary>

Every pattern has 1 way for the first column.

</details>


## Connected
- [Number of Ways to Paint N × 3 Grid](Number%20of%20Ways%20to%20Paint%20N%20%C3%97%203%20Grid.md)
