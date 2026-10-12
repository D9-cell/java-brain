---
topic: Prefix Sums Basics
pattern: [Running count]
source: LeetCode 2657
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find the Prefix Common Array of Two Arrays

> [!TIP]
> **🧠 Memory hook**
> A number becomes common when its **second copy** arrives (from either array). Count arrivals per number.
> **Mantra: ++seen[A[i]] == 2 → common++ · same for B[i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sums%20Basics/Prefix%20Sums%20Basics%20Animations.html#p=9) · **Pattern hub:** [Prefix Sums Basics - Pattern Map](Prefix%20Sums%20Basics%20-%20Pattern%20Map.md)

## Problem
A and B are permutations of 1..n. C[i] is the count of numbers present in both A[0..i] and B[0..i]. Return C.

## Key insight
Each number appears once in each permutation, so seeing it twice means it is in both prefixes.

## Approach: Seen counts
```java
// A number becomes common the moment its second copy (from either array) arrives
public int[] findThePrefixCommonArray(int[] A, int[] B) {
    int n = A.length, common = 0;
    int[] seen = new int[n + 1], out = new int[n];
    for (int i = 0; i < n; i++) {
        if (++seen[A[i]] == 2) common++;
        if (++seen[B[i]] == 2) common++;
        out[i] = common;
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Seen counts | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why == 2?</summary>

One copy comes from each array.

</details>


<details><summary>Bitmask version?</summary>

For n ≤ 50, OR masks and popcount the AND.

</details>


## Connected
- [Find Pivot Index](Find%20Pivot%20Index.md)
