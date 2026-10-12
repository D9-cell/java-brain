---
topic: Binary Search Basics
pattern: [Peak then two searches]
source: LeetCode 1095
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find in Mountain Array

> [!TIP]
> **🧠 Memory hook**
> **Find the peak**, then search the **rising half** (normal order), then the **falling half** (reversed order). Left first, so the smaller index wins.
> **Mantra: peak = slope search · search(0..peak, up) · ELSE search(peak+1..n−1, down)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=8) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
Find the minimum index of target in a mountain array accessed through get(i), using at most 100 calls.

## Key insight
Three binary searches use about 3 log n ≈ 45 calls. The direction flag flips the comparison for the decreasing half.

## Approach: Three searches
```java
// Find the peak, then search the rising side, then the falling side
public int findInMountainArray(int target, MountainArray m) {
    int n = m.length(), lo = 0, hi = n - 1;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (m.get(mid) < m.get(mid + 1)) lo = mid + 1;
        else hi = mid;
    }
    int peak = lo;
    int left = search(m, target, 0, peak, true);
    return left != -1 ? left : search(m, target, peak + 1, n - 1, false);
}

// Binary search on an increasing or decreasing slice
int search(MountainArray m, int target, int lo, int hi, boolean increasing) {
    while (lo <= hi) {
        int mid = (lo + hi) / 2, v = m.get(mid);
        if (v == target) return mid;
        if ((v < target) == increasing) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Three searches | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why search the left half first?</summary>

The minimum index is wanted.

</details>


<details><summary>Call budget?</summary>

About 3·14 = 42 for n = 10⁴.

</details>


## Connected
- [Peak Index in a Mountain Array](Peak%20Index%20in%20a%20Mountain%20Array.md)
- [Binary Search](Binary%20Search.md)
