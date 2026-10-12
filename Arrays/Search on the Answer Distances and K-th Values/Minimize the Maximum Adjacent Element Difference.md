---
topic: Search on the Answer Distances and K-th Values
pattern: [Minimise the maximum, Two candidate values]
source: LeetCode 3357
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimize the Maximum Adjacent Element Difference

> [!TIP]
> **🧠 Memory hook**
> Guess d. The best pair is **x = smallest neighbour + d** and **y = largest neighbour − d**. Each gap of −1s needs one value near both ends, or (if long enough and |x − y| ≤ d) one value per end.
> **Mantra: base = max known gap · x = mn + d, y = mx − d · each run: single value fits both ends, or two values when length ≥ 2 and |x − y| ≤ d**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=9) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
Replace every −1 with x or y (one pair of positive integers chosen once). Minimise the maximum absolute difference between adjacent elements.

## Key insight
Neighbours of missing values span [mn, mx]. The lowest neighbour forces some value ≤ mn + d and the highest some value ≥ mx − d, so those two choices are the most flexible. Runs touching the array ends have only one neighbour.

## Approach: Binary search + run checks
```java
// Binary search d; with x = min neighbour + d and y = max neighbour - d check every gap of -1s
public int minDifference(int[] nums) {
    int n = nums.length, base = 0, mn = Integer.MAX_VALUE, mx = Integer.MIN_VALUE;
    for (int i = 0; i + 1 < n; i++)
        if (nums[i] != -1 && nums[i + 1] != -1) base = Math.max(base, Math.abs(nums[i] - nums[i + 1]));
    for (int i = 0; i < n; i++) {
        if (nums[i] == -1) continue;
        boolean nearGap = (i > 0 && nums[i - 1] == -1) || (i + 1 < n && nums[i + 1] == -1);
        if (nearGap) {
            mn = Math.min(mn, nums[i]);
            mx = Math.max(mx, nums[i]);
        }
    }
    if (mn == Integer.MAX_VALUE) return base;
    int lo = base, hi = mx - mn;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (ok(nums, mid, mn + mid, mx - mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

// Each run of -1s needs one value near both ends, or two values (if x and y are within d)
boolean ok(int[] nums, int d, int x, int y) {
    int n = nums.length;
    for (int i = 0; i < n; ) {
        if (nums[i] != -1) {
            i++;
            continue;
        }
        int j = i;
        while (j < n && nums[j] == -1) j++;
        int a = i > 0 ? nums[i - 1] : -1, b = j < n ? nums[j] : -1;
        boolean single = fits(a, x, d) && fits(b, x, d) || fits(a, y, d) && fits(b, y, d);
        boolean pair = j - i >= 2 && Math.abs(x - y) <= d && (fits(a, x, d) && fits(b, y, d) || fits(a, y, d) && fits(b, x, d));
        if (!single && !pair) return false;
        i = j;
    }
    return true;
}

// A missing neighbour fits anything
boolean fits(int neighbour, int v, int d) {
    return neighbour == -1 || Math.abs(neighbour - v) <= d;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + run checks | O(n log range) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against an exhaustive search over all (x, y) pairs and assignments.

## Recall before you reveal
<details><summary>Why x = mn + d?</summary>

It is as high as possible while still serving the smallest neighbour.

</details>


<details><summary>Why does a long run allow two values?</summary>

It can switch from x to y in the middle if they are within d.

</details>


## Connected
- [Minimize the Maximum Difference of Pairs](Minimize%20the%20Maximum%20Difference%20of%20Pairs.md)
