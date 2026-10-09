---
topic: Stock and Kadane States
pattern: [2-D squash, Ordered prefix sums]
source: LeetCode 363
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Max Sum of Rectangle No Larger Than K

> [!TIP]
> **🧠 Memory hook**
> Squash a row band to 1-D, then ask for the **largest subarray sum ≤ k**: a sorted set of prefix sums answers it.
> **Mantra: best = prefix − seen.ceiling(prefix − k)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=11) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Return the maximum sum of a rectangle in the matrix such that the sum is at most k.

## Key insight
Kadane cannot respect an upper bound, but prefix sums can: a subarray sum is prefix[j] − prefix[i], and we want the smallest prefix[i] ≥ prefix[j] − k. A TreeSet of earlier prefixes gives it with `ceiling` in O(log C).

## Approach: Bands + TreeSet
```java
// Squash row bands into columns; on that array find the best subarray sum <= k with a TreeSet of prefix sums
public int maxSumSubmatrix(int[][] matrix, int k) {
    int rows = matrix.length, cols = matrix[0].length, best = Integer.MIN_VALUE;
    for (int top = 0; top < rows; top++) {
        int[] col = new int[cols];
        for (int bottom = top; bottom < rows; bottom++) {
            for (int c = 0; c < cols; c++) col[c] += matrix[bottom][c];
            TreeSet<Integer> seen = new TreeSet<>(List.of(0));
            int prefix = 0;
            for (int v : col) {
                prefix += v;
                Integer lowest = seen.ceiling(prefix - k);
                if (lowest != null) best = Math.max(best, prefix - lowest);
                seen.add(prefix);
            }
        }
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Bands + TreeSet | O(R² · C log C) | O(C) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why ceiling of prefix − k?</summary>

That is the smallest earlier prefix that keeps the sum within k.

</details>


<details><summary>Seed of the set?</summary>

0, so subarrays starting at column 0 count.

</details>


## Connected
- [Maximum Sum Rectangle](Maximum%20Sum%20Rectangle.md)
- Subarray Sum Equals K
