---
topic: Counting Walks and Moves
pattern: [Probability DP, Scale the units]
source: LeetCode 808
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Soup Servings

> [!TIP]
> **🧠 Memory hook**
> Measure in **25 ml scoops**; after ~4800 ml A almost surely runs out first.
> **Mantra: p(a, b) = ¼ Σ p(a − 4, b), p(a − 3, b − 1), p(a − 2, b − 2), p(a − 1, b − 3)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=13) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Two soups start with n ml each. Each turn one of four servings is chosen with probability ¼: (100, 0), (75, 25), (50, 50), (25, 75) ml from (A, B). Return P(A empties first) + ½ P(both empty at the same turn).

## Key insight
All servings are multiples of 25, so count in scoops: m = ceil(n / 25). A state (a, b) averages its four children; base cases are both empty (½), only A empty (1), only B empty (0). Servings favour A, so for n > 4800 the answer is within 1e-5 of 1.

## Approach 1: Top-down memo
```java
// Top-down in units of 25 ml; large n converges to 1
public double soupServings(int n) {
    if (n > 4800) return 1.0;
    int m = (n + 24) / 25;
    Double[][] memo = new Double[m + 1][m + 1];
    return prob(m, m, memo);
}

// Probability for a units of A and b units of B left
private double prob(int a, int b, Double[][] memo) {
    if (a <= 0 && b <= 0) return 0.5;
    if (a <= 0) return 1.0;
    if (b <= 0) return 0.0;
    if (memo[a][b] != null) return memo[a][b];
    return memo[a][b] = 0.25 * (prob(a - 4, b, memo) + prob(a - 3, b - 1, memo) + prob(a - 2, b - 2, memo) + prob(a - 1, b - 3, memo));
}
```

## Approach 2: Bottom-up table
```java
// Bottom-up table over the same units
public double soupServingsTable(int n) {
    if (n > 4800) return 1.0;
    int m = (n + 24) / 25;
    double[][] dp = new double[m + 1][m + 1];
    for (int a = 0; a <= m; a++)
        for (int b = 0; b <= m; b++) {
            if (a == 0 && b == 0) dp[a][b] = 0.5;
            else if (a == 0) dp[a][b] = 1.0;
            else if (b == 0) dp[a][b] = 0.0;
            else dp[a][b] = 0.25 * (dp[Math.max(0, a - 4)][b] + dp[Math.max(0, a - 3)][Math.max(0, b - 1)] + dp[Math.max(0, a - 2)][Math.max(0, b - 2)] + dp[Math.max(0, a - 1)][Math.max(0, b - 3)]);
        }
    return dp[m][m];
}
```

| Approach | Time | Space |
|---|---|---|
| Top-down memo | O(m²) | O(m²) |
| Bottom-up table | O(m²) | O(m²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why the cut-off at 4800?</summary>

On average A loses 62.5 ml per turn and B 37.5 ml, so the probability tends to 1 fast.

</details>


<details><summary>Why scale by 25?</summary>

Shrinks the table 625 times.

</details>


## Connected
- [Knight Probability in Chessboard](Knight%20Probability%20in%20Chessboard.md)
