---
topic: Binary Search Basics
pattern: [Upper bound]
source: LeetCode 744
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find Smallest Letter Greater Than Target

> [!TIP]
> **🧠 Memory hook**
> Find the **first letter > target** (upper bound). If none, **wrap around** to letters[0].
> **Mantra: first i with letters[i] > target · lo % n**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=2) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
letters is sorted. Return the smallest letter strictly greater than target, wrapping around to the first letter if there is none.

## Key insight
The half-open search with hi = n can return n when nothing is bigger; taking it mod n gives the wrap.

## Approach: Upper bound
```java
// Upper bound of target; wrap to the first letter when nothing is bigger
public char nextGreatestLetter(char[] letters, char target) {
    int lo = 0, hi = letters.length;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (letters[mid] <= target) lo = mid + 1;
        else hi = mid;
    }
    return letters[lo % letters.length];
}
```

| Approach | Time | Space |
|---|---|---|
| Upper bound | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why ≤ in the check?</summary>

Equal letters are not greater, so skip them.

</details>


<details><summary>Why % n?</summary>

Index n means "none", which wraps to 0.

</details>


## Connected
- [Find First and Last Position of Element in Sorted Array](Find%20First%20and%20Last%20Position%20of%20Element%20in%20Sorted%20Array.md)
