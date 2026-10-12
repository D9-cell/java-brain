---
topic: Difference Arrays
pattern: [Candidate targets, Binary search]
source: LeetCode 3347
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximum Frequency of an Element After Performing Operations II

> [!TIP]
> **🧠 Memory hook**
> Values go up to 10⁹, so only test **promising targets**: every existing value (it has free copies) and **x + k** (its window starts exactly at x).
> **Mantra: sort · t in {x, x + k} · near = upper(t + k) − lower(t − k) · same = count of t**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=8) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
Same as part I with values up to 10⁹.

## Key insight
If the target is not an existing value, the score only depends on how many values are within k, and sliding the window right until its left edge hits a value never loses any. Binary search counts values in a range.

## Approach: Candidates + binary search
```java
// Only targets equal to some value, or value + k, can be best; count values within k by binary search
public int maxFrequency(int[] nums, int k, int numOperations) {
    int[] a = nums.clone();
    Arrays.sort(a);
    int best = 0;
    for (int x : a)
        for (long t : new long[]{x, (long) x + k}) {
            int near = upper(a, t + k) - lower(a, t - k);
            int same = upper(a, t) - lower(a, t);
            best = Math.max(best, same + Math.min(numOperations, near - same));
        }
    return best;
}

// First index with a[i] >= x
int lower(int[] a, long x) {
    int lo = 0, hi = a.length;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (a[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

// First index with a[i] > x
int upper(int[] a, long x) {
    int lo = 0, hi = a.length;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (a[mid] <= x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Candidates + binary search | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why x + k?</summary>

A window [t − k, t + k] can be shifted until its left end sits on some value.

</details>


<details><summary>Why also x itself?</summary>

Equal values need no operation.

</details>


## Connected
- [Maximum Frequency of an Element After Performing Operations I](Maximum%20Frequency%20of%20an%20Element%20After%20Performing%20Operations%20I.md)
