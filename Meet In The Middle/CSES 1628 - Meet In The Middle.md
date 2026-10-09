---
topic: Meet In The Middle
pattern: [Meet in the middle, Binary search]
source: CSES 1628
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, mitm]
---
# CSES 1628 - Meet In The Middle

> [!TIP]
> **🧠 Memory hook**
> Dig the tunnel from both ends: each half enumerates 2^20 subsets, and binary search is the handshake where they meet.
> **Mantra: SPLIT, ENUMERATE, SORT ONE, SEARCH OTHER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Meet%20In%20The%20Middle/Meet%20In%20The%20Middle%20Animations.html#p=0) · **Pattern hub:** [Meet In The Middle - Pattern Map](Meet%20In%20The%20Middle%20-%20Pattern%20Map.md)

## Problem
Given n ≤ 40 numbers and x, count the subsets whose sum is exactly x.

## Key insight
Every subset = (a subset of the left half) + (a subset of the right half). For each left sum `s`, count the right sums equal to `x − s`. Sorting the right sums makes that count one equal-range binary search.

## Approach: Meet in the middle
```java
// All 2^len subset sums of a[from .. from+len)
static long[] subsetSums(long[] a, int from, int len) {
    long[] sums = new long[1 << len];
    for (int mask = 1; mask < (1 << len); mask++) {
        int low = Integer.numberOfTrailingZeros(mask);
        sums[mask] = sums[mask & (mask - 1)] + a[from + low];
    }
    return sums;
}

// First index with a[idx] >= key
static int lowerBound(long[] a, long key) {
    int lo = 0, hi = a.length;
    while (lo < hi) {
        int mid = (lo + hi) >>> 1;
        if (a[mid] < key) lo = mid + 1; else hi = mid;
    }
    return lo;
}

// Split in half, enumerate both halves, and for each left sum count right sums equal to x - left
static long count(long[] t, long x) {
    int n1 = t.length / 2, n2 = t.length - n1;
    long[] left = subsetSums(t, 0, n1), right = subsetSums(t, n1, n2);
    Arrays.sort(right);
    long cnt = 0;
    for (long s : left) cnt += lowerBound(right, x - s + 1) - lowerBound(right, x - s);
    return cnt;
}
```

| Approach | Time | Space |
|---|---|---|
| Meet in the middle | O(2^(n/2) · n) | O(2^(n/2)) |

> [!WARNING]
> **Java gotcha**
> CSES is strict about time in Java. Use `BufferedReader` + `StringTokenizer` (see `solveFromStdin`), `long[]` arrays instead of `List<Long>`, and the O(2^h) lowest-bit trick for subset sums. Run with `java CsesMeetInTheMiddle cses` to read stdin.

## Recall before you reveal
<details><summary>What size n signals MITM?</summary>

Roughly 30–45, when you need all subsets.

</details>


<details><summary>Count of x in a sorted array?</summary>

`lowerBound(x+1) − lowerBound(x)`.

</details>


<details><summary>Explain `sums[m] = sums[m & (m-1)] + a[tz(m)]`.</summary>

`m & (m−1)` removes the lowest set bit, a smaller mask already computed. Then add that one element.

</details>


## Connected
- [Closest Subsequence Sum](Closest%20Subsequence%20Sum.md) (closest instead of exact)
- [Partition Array Into Two Arrays to Minimize Sum Difference](Partition%20Array%20Into%20Two%20Arrays%20to%20Minimize%20Sum%20Difference.md)
