---
topic: Sorting and Matching
pattern: [Sort by ratio]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Fractional Knapsack

> [!TIP]
> **🧠 Memory hook**
> You may take **fractions**, so fill the bag with the best value per kilo first.
> **Mantra: SORT BY VALUE / WEIGHT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=12) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Maximise the total value in a knapsack of given capacity when items can be split.

## Key insight
Sort by `value / weight` descending. Take whole items; for the first item that does not fit take the fraction that fills the bag.

## Approach: Ratio sort
```java
// Sort items by value per weight and take whole items, then a fraction of the first one that does not fit
public double fractionalKnapsack(int[] values, int[] weights, int capacity) {
    Integer[] idx = new Integer[values.length];
    for (int i = 0; i < idx.length; i++) idx[i] = i;
    Arrays.sort(idx, (a, b) -> Double.compare((double) values[b] / weights[b], (double) values[a] / weights[a]));
    double total = 0;
    for (int i : idx) {
        if (capacity == 0) break;
        int take = Math.min(weights[i], capacity);
        total += (double) values[i] * take / weights[i];
        capacity -= take;
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Ratio sort | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does this fail for 0/1 knapsack?</summary>

Without splitting, a high-ratio item can block a better combination.

</details>


## Connected
- [Two City Scheduling](Two%20City%20Scheduling.md)
