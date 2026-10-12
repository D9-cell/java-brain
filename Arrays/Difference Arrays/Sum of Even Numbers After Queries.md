---
topic: Difference Arrays
pattern: [Running answer]
source: LeetCode 985
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Sum of Even Numbers After Queries

> [!TIP]
> **🧠 Memory hook**
> Keep the sum of even values. On an update: **remove the old value if it was even**, apply, **add the new value if it is even**.
> **Mantra: old even → even −= old · update · new even → even += new**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=13) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
Each query [val, index] adds val to nums[index]. After each query return the sum of the even values.

## Key insight
Only one element changes per query, so adjust the running answer instead of recomputing. Java's % on negatives gives 0 for even numbers, so the parity check still works.

## Approach: Running even sum
```java
// Keep the even sum; remove the old value if it was even, add the new value if it is even
public int[] sumEvenAfterQueries(int[] nums, int[][] queries) {
    int even = 0;
    for (int x : nums) if (x % 2 == 0) even += x;
    int[] out = new int[queries.length];
    for (int q = 0; q < queries.length; q++) {
        int i = queries[q][1];
        if (nums[i] % 2 == 0) even -= nums[i];
        nums[i] += queries[q][0];
        if (nums[i] % 2 == 0) even += nums[i];
        out[q] = even;
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Running even sum | O(n + q) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Negative numbers?</summary>

−4 % 2 == 0 in Java, so the check holds.

</details>


<details><summary>Why not recompute?</summary>

That is O(n) per query.

</details>


## Connected
- [Range Addition](Range%20Addition.md)
