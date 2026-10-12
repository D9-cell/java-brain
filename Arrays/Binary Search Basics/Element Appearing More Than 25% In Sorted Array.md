---
topic: Binary Search Basics
pattern: [Lower bound, Candidates]
source: LeetCode 1287
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Element Appearing More Than 25% In Sorted Array

> [!TIP]
> **🧠 Memory hook**
> A run longer than n/4 must cover index **n/4, n/2 or 3n/4**. Measure each candidate's run with **two lower bounds**.
> **Mantra: FOR pos in n/4, n/2, 3n/4: lb(x + 1) − lb(x) > n/4 → x**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=4) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
Exactly one integer occurs more than 25% of the time in a sorted array. Return it.

## Key insight
Any run of more than n/4 consecutive positions contains one of the three quarter points. Checking three candidates costs O(log n) instead of a linear scan.

## Approach: Quarter points
```java
// The answer must sit at n/4, n/2 or 3n/4; measure each candidate's run with two binary searches
public int findSpecialInteger(int[] arr) {
    int n = arr.length;
    for (int pos : new int[]{n / 4, n / 2, 3 * n / 4}) {
        int x = arr[pos];
        if (lowerBound(arr, x + 1) - lowerBound(arr, x) > n / 4) return x;
    }
    return arr[0];
}

// Smallest index whose value is >= x
int lowerBound(int[] a, int x) {
    int lo = 0, hi = a.length;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (a[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Quarter points | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Tests use arrays with exactly one qualifying value, as the problem guarantees. Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why those three positions?</summary>

They are n/4 apart, so a longer run cannot fit between them.

</details>


<details><summary>Simple version?</summary>

Check arr[i] == arr[i + n/4] in one pass, O(n).

</details>


## Connected
- [Find First and Last Position of Element in Sorted Array](Find%20First%20and%20Last%20Position%20of%20Element%20in%20Sorted%20Array.md)
