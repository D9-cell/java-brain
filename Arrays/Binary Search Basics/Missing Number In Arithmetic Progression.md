---
topic: Binary Search Basics
pattern: [Derived predicate]
source: LeetCode 1228
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Missing Number In Arithmetic Progression

> [!TIP]
> **🧠 Memory hook**
> The step is **(last − first) / n**. The first index where arr[i] ≠ first + i·d marks the gap.
> **Mantra: d = (last − first)/n · first i: arr[i] ≠ arr[0] + i·d · RETURN arr[0] + lo·d**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Binary%20Search%20Basics/Binary%20Search%20Basics%20Animations.html#p=9) · **Pattern hub:** [Binary Search Basics - Pattern Map](Binary%20Search%20Basics%20-%20Pattern%20Map.md)

## Problem
One value (not the first or last) was removed from an arithmetic progression. Return it.

## Key insight
With n values left, the full progression had n gaps of size d. Values before the removed one sit at their expected place, those after are shifted by one step.

## Approach: Binary search
```java
// Step d = (last - first) / n; find the first index whose value is off the progression
public int missingNumber(int[] arr) {
    int n = arr.length, d = (arr[n - 1] - arr[0]) / n;
    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] == arr[0] + mid * d) lo = mid + 1;
        else hi = mid;
    }
    return arr[0] + lo * d;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why divide by n and not n − 1?</summary>

The original sequence had n + 1 numbers, so n steps.

</details>


<details><summary>Decreasing progressions?</summary>

d is negative and the same formula works.

</details>


## Connected
- [Kth Missing Positive Number](Kth%20Missing%20Positive%20Number.md)
