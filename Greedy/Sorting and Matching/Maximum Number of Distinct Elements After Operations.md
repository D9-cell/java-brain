---
topic: Sorting and Matching
pattern: [Sort, Lowest free value]
source: LeetCode 3397
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Number of Distinct Elements After Operations

> [!TIP]
> **🧠 Memory hook**
> Each number may move by at most `k`: give it the **lowest free slot** in its window.
> **Mantra: SORT, PICK max(prev + 1, x − k), IF ≤ x + k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=15) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
You may add an integer in [−k, k] to each element once. Return the maximum number of distinct values.

## Key insight
Sort. Process in order and assign each element the smallest value in `[x-k, x+k]` that is greater than the previous assigned value; if none exists the element duplicates something.

## Approach: Sort + sweep
```java
// Sort; give every element the smallest value in [x - k, x + k] that is larger than the previous chosen value
public int maxDistinctElements(int[] nums, int k) {
    Arrays.sort(nums);
    long prev = Long.MIN_VALUE;
    int count = 0;
    for (int x : nums) {
        long pick = Math.max(prev + 1, (long) x - k);
        if (pick <= (long) x + k) { prev = pick; count++; }
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + sweep | O(n log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why sort first?</summary>

The windows then start in increasing order, so earlier choices never block later ones unnecessarily.

</details>


## Connected
- [Maximum Element After Decreasing and Rearranging](Maximum%20Element%20After%20Decreasing%20and%20Rearranging.md)
