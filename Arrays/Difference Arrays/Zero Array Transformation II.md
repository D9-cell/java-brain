---
topic: Difference Arrays
pattern: [Lazy sweep]
source: LeetCode 3356
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Zero Array Transformation II

> [!TIP]
> **🧠 Memory hook**
> Sweep indexes. While index i is still short, **apply the next query** (only the part from i onward matters) into the difference array. The number applied is the answer.
> **Mantra: WHILE cover + diff[i] < nums[i]: apply queries[k++] · out of queries → −1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=5) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
Each query [l, r, val] can lower each index in the range by up to val. Return the minimum k so that the first k queries can make nums all zeros, or -1.

## Key insight
Queries must be used in order. Earlier indexes are already satisfied, so a query only adds coverage from max(l, i). Binary search on k with a difference array is the alternative.

## Approach: Lazy sweep
```java
// Sweep indexes; while index i is short, apply more queries in order and record their ranges
public int minZeroArray(int[] nums, int[][] queries) {
    int n = nums.length, k = 0;
    int[] diff = new int[n + 1];
    for (int i = 0, cover = 0; i < n; i++) {
        while (cover + diff[i] < nums[i]) {
            if (k == queries.length) return -1;
            int[] q = queries[k++];
            if (q[1] < i) continue;
            diff[Math.max(q[0], i)] += q[2];
            diff[q[1] + 1] -= q[2];
        }
        cover += diff[i];
    }
    return k;
}
```

| Approach | Time | Space |
|---|---|---|
| Lazy sweep | O(n + q) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why start the range at max(l, i)?</summary>

Indexes before i are done; marking them would be wrong.

</details>


<details><summary>Binary search version?</summary>

Check k queries with a difference array: O((n + q) log q).

</details>


## Connected
- [Zero Array Transformation I](Zero%20Array%20Transformation%20I.md)
- [Minimum Number of K Consecutive Bit Flips](Minimum%20Number%20of%20K%20Consecutive%20Bit%20Flips.md)
