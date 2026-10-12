---
topic: Interval DP
pattern: [Split at operator, Two tables]
source: GfG Boolean Parenthesization
difficulty: Hard
companies: [Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Boolean Parenthesization

> [!TIP]
> **🧠 Memory hook**
> For every operand range keep **how many ways it is true and how many false**, then combine by the operator.
> **Mantra: AND: T·T · OR: total − F·F · XOR: T·F + F·T**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Interval%20DP/Interval%20DP%20Animations.html#p=5) · **Pattern hub:** [Interval DP - Pattern Map](Interval%20DP%20-%20Pattern%20Map.md)

## Problem
Given a boolean expression of T, F with & | ^, count the parenthesizations that evaluate to true (mod 1003).

## Key insight
Split at an operator between the ranges. Combining needs both true and false counts of both sides: AND is true only for T·T, OR is false only for F·F, XOR needs one of each.

## Approach: True / false tables
```java
public class BooleanParenthesization {
    static final int MOD = 1003;

    // t[i][j] / f[i][j] = ways operands i..j evaluate to true / false; split at an operator between them
    public int countWays(String expr) {
        int n = (expr.length() + 1) / 2;
        int[][] t = new int[n][n], f = new int[n][n];
        for (int i = 0; i < n; i++) {
            t[i][i] = expr.charAt(2 * i) == 'T' ? 1 : 0;
            f[i][i] = 1 - t[i][i];
        }
        for (int len = 2; len <= n; len++)
            for (int i = 0; i + len <= n; i++) {
                int j = i + len - 1;
                for (int k = i; k < j; k++) {
                    char op = expr.charAt(2 * k + 1);
                    int lt = t[i][k], lf = f[i][k], rt = t[k + 1][j], rf = f[k + 1][j];
                    int total = (lt + lf) * (rt + rf) % MOD, trueWays;
                    if (op == '&') trueWays = lt * rt % MOD;
                    else if (op == '|') trueWays = (total - lf * rf % MOD + MOD) % MOD;
                    else trueWays = (lt * rf + lf * rt) % MOD;
                    t[i][j] = (t[i][j] + trueWays) % MOD;
                    f[i][j] = (f[i][j] + total - trueWays + MOD) % MOD;
                }
            }
        return t[0][n - 1];
    }
}
```

| Approach | Time | Space |
|---|---|---|
| True / false tables | O(n³) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force recursion on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why track false too?</summary>

OR and XOR results depend on the false counts of the sides.

</details>


<details><summary>Why mod 1003?</summary>

The GfG statement asks for it.

</details>


## Connected
- [Matrix Chain Multiplication](Matrix%20Chain%20Multiplication.md)
- [Unique Binary Search Trees II](Unique%20Binary%20Search%20Trees%20II.md)
