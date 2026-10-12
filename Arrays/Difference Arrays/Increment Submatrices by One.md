---
topic: Difference Arrays
pattern: [2-D difference]
source: LeetCode 2536
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Increment Submatrices by One

> [!TIP]
> **🧠 Memory hook**
> Four marks per rectangle: **+1 at (r1,c1), −1 at (r1,c2+1) and (r2+1,c1), +1 at (r2+1,c2+1)**. Then a 2-D prefix sum.
> **Mantra: corner marks · out[i][j] = d + up + left − diag**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=2) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
Start with an n × n zero matrix. Each query adds 1 to a submatrix. Return the final matrix.

## Key insight
The 2-D prefix of the four marks is exactly 1 inside the rectangle and 0 outside, by inclusion–exclusion.

## Approach: 2-D difference array
```java
// 2-D difference array: four corner marks per query, then prefix sums in both directions
public int[][] rangeAddQueries(int n, int[][] queries) {
    int[][] diff = new int[n + 1][n + 1];
    for (int[] q : queries) {
        diff[q[0]][q[1]]++;
        diff[q[0]][q[3] + 1]--;
        diff[q[2] + 1][q[1]]--;
        diff[q[2] + 1][q[3] + 1]++;
    }
    int[][] out = new int[n][n];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) {
            out[i][j] = diff[i][j];
            if (i > 0) out[i][j] += out[i - 1][j];
            if (j > 0) out[i][j] += out[i][j - 1];
            if (i > 0 && j > 0) out[i][j] -= out[i - 1][j - 1];
        }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| 2-D difference array | O(n² + q) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why +1 at the far corner?</summary>

Both −1 marks removed that region twice.

</details>


<details><summary>Row-wise version?</summary>

A 1-D difference per row, O(n · q).

</details>


## Connected
- [Range Addition](Range%20Addition.md)
- [Maximum Side Length of a Square with Sum Less than or Equal to Threshold](../Prefix%20Variants/Maximum%20Side%20Length%20of%20a%20Square%20with%20Sum%20Less%20than%20or%20Equal%20to%20Threshold.md)
