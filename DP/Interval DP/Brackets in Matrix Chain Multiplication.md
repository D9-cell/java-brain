---
topic: Interval DP
pattern: [Split point, Rebuild the choice]
source: GfG Brackets in Matrix Chain Multiplication
difficulty: Hard
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Brackets in Matrix Chain Multiplication

> [!TIP]
> **🧠 Memory hook**
> Same table as Matrix Chain, but **remember the best k** and print by recursion.
> **Mantra: split[i][j] = best k · PRINT ( LEFT RIGHT )**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Interval%20DP/Interval%20DP%20Animations.html#p=1) · **Pattern hub:** [Interval DP - Pattern Map](Interval%20DP%20-%20Pattern%20Map.md)

## Problem
Print the bracketing of the cheapest matrix chain order, naming the matrices A, B, C, ...

## Key insight
While taking the minimum over k, store the arg-min in split[i][j]. Printing a range writes the matrix letter for a single matrix, otherwise "(" + left part + right part + ")".

## Approach: Table + split + print
```java
public class BracketsInMatrixChainMultiplication {
    private int[][] split;
    private StringBuilder out;
    private char name;

    // Bottom-up cost table that also remembers the best split, then prints the bracketing with matrices A, B, C, ...
    public String matrixChainOrder(int[] arr) {
        int n = arr.length;
        int[][] dp = new int[n][n];
        split = new int[n][n];
        for (int len = 2; len < n; len++)
            for (int i = 1; i + len - 1 < n; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                    if (cost < dp[i][j]) {
                        dp[i][j] = cost;
                        split[i][j] = k;
                    }
                }
            }
        out = new StringBuilder();
        name = 'A';
        print(1, n - 1);
        return out.toString();
    }

    // Writes matrix i alone, or "(" left part right part ")" split at the stored k
    private void print(int i, int j) {
        if (i == j) {
            out.append(name++);
            return;
        }
        out.append('(');
        print(i, split[i][j]);
        print(split[i][j] + 1, j);
        out.append(')');
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Table + split + print | O(n³) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force recursion on small random inputs when it was written.

## Recall before you reveal
<details><summary>Is the answer unique?</summary>

Not always; any order with the minimum cost is valid.

</details>


<details><summary>Why n² extra space?</summary>

split mirrors the cost table.

</details>


## Connected
- [Matrix Chain Multiplication](Matrix%20Chain%20Multiplication.md)
