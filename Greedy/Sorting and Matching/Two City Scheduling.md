---
topic: Sorting and Matching
pattern: [Sort by a difference]
source: LeetCode 1029
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Two City Scheduling

> [!TIP]
> **🧠 Memory hook**
> Send everyone to city B, then **pay the extra** for the n people for whom A is the best deal.
> **Mantra: SORT BY costA − costB**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=4) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Exactly n of the 2n people fly to city A and the rest to city B. Minimise the total cost.

## Key insight
The relative advantage of A for person i is `costA - costB`. Sort by it: the n smallest go to A. Equivalent: start with all in B and add the n smallest differences.

## Approach 1: Sort by difference
```java
// Sort people by (costA - costB): the n most negative go to city A, the rest to city B
public int twoCitySchedCost(int[][] costs) {
    Arrays.sort(costs, (x, y) -> (x[0] - x[1]) - (y[0] - y[1]));
    int n = costs.length / 2, total = 0;
    for (int i = 0; i < n; i++) total += costs[i][0] + costs[i + n][1];
    return total;
}
```

## Approach 2: Start in B, add switches
```java
// Start with everyone in city B and pay the extra (A - B) for the n best switches
public int twoCitySchedCostSwitch(int[][] costs) {
    int total = 0;
    int[] diff = new int[costs.length];
    for (int i = 0; i < costs.length; i++) { total += costs[i][1]; diff[i] = costs[i][0] - costs[i][1]; }
    Arrays.sort(diff);
    for (int i = 0; i < costs.length / 2; i++) total += diff[i];
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort by difference | O(n log n) | O(1) |
| Start in B, add switches | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why not sort by costA alone?</summary>

The same cost can be a bargain for A and a disaster for B; the difference captures the trade-off.

</details>


## Connected
- [Boats to Save People](Boats%20to%20Save%20People.md)
- [Fractional Knapsack](Fractional%20Knapsack.md)
