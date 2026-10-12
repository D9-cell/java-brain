---
topic: Search on the Answer Distances and K-th Values
pattern: [K-th value, Signs]
source: LeetCode 2040
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Kth Smallest Product of Two Sorted Arrays

> [!TIP]
> **🧠 Memory hook**
> Binary search the product value v. Count pairs with x·y ≤ v: for **x ≥ 0** that is a prefix of b, for **x < 0** a suffix of b.
> **Mantra: count(v) ≥ k → hi = mid · x ≥ 0: prefix bound · x < 0: suffix bound**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=4) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
nums1 and nums2 are sorted and may contain negatives. Return the k-th smallest product nums1[i] · nums2[j].

## Key insight
Multiplying by a negative x reverses b's order, so the pairs with x·y ≤ v form a suffix. Products fit in long (|v| ≤ 10¹⁰). Use floorDiv for the middle so negatives round correctly.

## Approach: Binary search + per-row bounds
```java
// Smallest value v with at least k products <= v; count per element of a with a binary search on b
public long kthSmallestProduct(int[] a, int[] b, long k) {
    long lo = -10_000_000_000L, hi = 10_000_000_000L;
    while (lo < hi) {
        long mid = Math.floorDiv(lo + hi, 2);
        if (countAtMost(a, b, mid) >= k) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

// Number of pairs (x, y) with x * y <= v
long countAtMost(int[] a, int[] b, long v) {
    long count = 0;
    int n = b.length;
    for (int x : a) {
        int lo = 0, hi = n;
        if (x >= 0) {
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if ((long) x * b[mid] <= v) lo = mid + 1;
                else hi = mid;
            }
            count += lo;
        } else {
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if ((long) x * b[mid] <= v) hi = mid;
                else lo = mid + 1;
            }
            count += n - lo;
        }
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + per-row bounds | O(n log m log range) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why a suffix for negative x?</summary>

x·b[j] decreases as b[j] increases.

</details>


<details><summary>Why floorDiv?</summary>

(lo + hi) / 2 rounds toward zero, which can loop forever on negatives.

</details>


## Connected
- [Find K-th Smallest Pair Distance](Find%20K-th%20Smallest%20Pair%20Distance.md)
