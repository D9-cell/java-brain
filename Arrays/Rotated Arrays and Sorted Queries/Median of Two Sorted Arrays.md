---
topic: Rotated Arrays and Sorted Queries
pattern: [Partition search]
source: LeetCode 4
difficulty: Hard
companies: [Google, Amazon, Microsoft, Apple]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Median of Two Sorted Arrays

> [!TIP]
> **🧠 Memory hook**
> Binary search **i = how many of the shorter array go to the left half**; j = half − i. Valid when **aLeft ≤ bRight and bLeft ≤ aRight**.
> **Mantra: i in [0, m] · j = half − i · aLeft > bRight → left · bLeft > aRight → right · ELSE median from the four borders**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=5) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
Return the median of two sorted arrays in O(log(min(m, n))).

## Key insight
The median splits the union into equal halves. Choosing i in the shorter array fixes j. Sentinels ±∞ handle empty sides. Odd total: max of the left borders; even: average of max-left and min-right.

## Approach: Partition binary search
```java
// Binary search how many elements the shorter array puts in the left half
public double findMedianSortedArrays(int[] a, int[] b) {
    if (a.length > b.length) return findMedianSortedArrays(b, a);
    int m = a.length, n = b.length, half = (m + n + 1) / 2;
    int lo = 0, hi = m;
    while (true) {
        int i = (lo + hi) / 2, j = half - i;
        int aLeft = i == 0 ? Integer.MIN_VALUE : a[i - 1], aRight = i == m ? Integer.MAX_VALUE : a[i];
        int bLeft = j == 0 ? Integer.MIN_VALUE : b[j - 1], bRight = j == n ? Integer.MAX_VALUE : b[j];
        if (aLeft > bRight) hi = i - 1;
        else if (bLeft > aRight) lo = i + 1;
        else {
            int left = Math.max(aLeft, bLeft);
            if ((m + n) % 2 == 1) return left;
            return (left + (double) Math.min(aRight, bRight)) / 2;
        }
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Partition binary search | O(log min(m, n)) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why search the shorter array?</summary>

It keeps j in range and the search shorter.

</details>


<details><summary>Why half = (m + n + 1) / 2?</summary>

The left half gets the extra element when the total is odd.

</details>


## Connected
- [Find Minimum in Rotated Sorted Array](Find%20Minimum%20in%20Rotated%20Sorted%20Array.md)
