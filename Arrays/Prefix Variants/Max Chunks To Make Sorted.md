---
topic: Prefix Variants
pattern: [Prefix max]
source: LeetCode 769
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Max Chunks To Make Sorted

> [!TIP]
> **🧠 Memory hook**
> arr is a permutation of 0..n−1. A chunk can end at i exactly when the **running max equals i** (the prefix holds exactly 0..i).
> **Mantra: max = max(max, arr[i]) · max == i → chunks++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=9) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
Split arr into chunks, sort each chunk, and concatenate. Return the maximum number of chunks that gives the sorted array.

## Key insight
Prefix 0..i is a valid chunk boundary iff it contains exactly the values 0..i, which for a permutation means its maximum is i.

## Approach: Running max
```java
// For a permutation of 0..n-1, a chunk can end at i when the running max equals i
public int maxChunksToSorted(int[] arr) {
    int chunks = 0, max = 0;
    for (int i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i]);
        if (max == i) chunks++;
    }
    return chunks;
}
```

| Approach | Time | Space |
|---|---|---|
| Running max | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why max == i?</summary>

i + 1 distinct values with max i must be 0..i.

</details>


<details><summary>Duplicates allowed?</summary>

See part II.

</details>


## Connected
- [Max Chunks To Make Sorted II](Max%20Chunks%20To%20Make%20Sorted%20II.md)
