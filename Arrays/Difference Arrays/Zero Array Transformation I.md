---
topic: Difference Arrays
pattern: [Coverage count]
source: LeetCode 3355
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Zero Array Transformation I

> [!TIP]
> **🧠 Memory hook**
> Each query can lower every index it covers by 1, so index i needs **coverage ≥ nums[i]**. Coverage comes from a difference array.
> **Mantra: diff marks per query · cover ≥ nums[i] for all i**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=4) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
For each query [l, r] you may decrement any subset of indexes in the range by 1. Return true if nums can become all zeros after all queries.

## Key insight
Indexes are independent: each just needs enough queries covering it.

## Approach: Coverage counts
```java
// Each query can lower every covered index by 1, so index i needs coverage >= nums[i]
public boolean isZeroArray(int[] nums, int[][] queries) {
    int n = nums.length;
    int[] diff = new int[n + 1];
    for (int[] q : queries) {
        diff[q[0]]++;
        diff[q[1] + 1]--;
    }
    for (int i = 0, cover = 0; i < n; i++) {
        cover += diff[i];
        if (cover < nums[i]) return false;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Coverage counts | O(n + q) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why are indexes independent?</summary>

Each query chooses its subset freely.

</details>


<details><summary>Part II?</summary>

Values per query and the minimum prefix of queries.

</details>


## Connected
- [Zero Array Transformation II](Zero%20Array%20Transformation%20II.md)
