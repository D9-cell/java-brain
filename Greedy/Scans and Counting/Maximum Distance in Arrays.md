---
topic: Scans and Counting
pattern: [Carry min and max]
source: LeetCode 624
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Distance in Arrays

> [!TIP]
> **🧠 Memory hook**
> Only each array's **first and last** element can be an extreme.
> **Mantra: COMPARE THE NEW ENDS WITH GLOBAL MIN / MAX FROM EARLIER ARRAYS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=4) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Each array is sorted. Pick one element from two different arrays to maximise their absolute difference.

## Key insight
Walk the arrays keeping the minimum first element and maximum last element seen so far. For each new array compare its ends with those (different arrays are guaranteed), then update.

## Approach 1: Running min / max
```java
// Each array is sorted, so only its first (min) and last (max) matter; compare them with the extremes seen in earlier arrays
public int maxDistance(List<List<Integer>> arrays) {
    int min = arrays.get(0).get(0), max = arrays.get(0).get(arrays.get(0).size() - 1), best = 0;
    for (int i = 1; i < arrays.size(); i++) {
        List<Integer> a = arrays.get(i);
        int lo = a.get(0), hi = a.get(a.size() - 1);
        best = Math.max(best, Math.max(Math.abs(hi - min), Math.abs(max - lo)));
        min = Math.min(min, lo);
        max = Math.max(max, hi);
    }
    return best;
}
```

## Approach 2: All pairs of ends
```java
// Keep the two smallest first-elements and the two largest last-elements (with their owners); pick the best pair from different arrays
public int maxDistanceTwoBest(List<List<Integer>> arrays) {
    int n = arrays.size();
    int[] mins = new int[n], maxs = new int[n];
    for (int i = 0; i < n; i++) { mins[i] = arrays.get(i).get(0); maxs[i] = arrays.get(i).get(arrays.get(i).size() - 1); }
    int best = 0;
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (i != j) best = Math.max(best, Math.abs(maxs[j] - mins[i]));
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Running min / max | O(k) | O(1) |
| All pairs of ends | O(k²) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why update min/max after the comparison?</summary>

The two elements must come from different arrays.

</details>


## Connected
- [Maximum Value of an Ordered Triplet I](Maximum%20Value%20of%20an%20Ordered%20Triplet%20I.md)
