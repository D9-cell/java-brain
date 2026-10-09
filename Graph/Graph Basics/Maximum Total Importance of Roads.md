---
topic: Graph Basics
pattern: [Degree, Greedy]
source: LeetCode 2285
difficulty: Medium
companies: [Adobe]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Maximum Total Importance of Roads

> [!TIP]
> **🧠 Memory hook**
> Hand the biggest trophies to the busiest cities.
> **Mantra: SORT BY DEGREE, LABEL 1..n**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=16) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Assign the values 1..n to cities. A road is worth the sum of its two cities. Maximise the total.

## Key insight
A city adds its value once per road, so total = Σ degree × value. The rearrangement inequality says to pair the largest degrees with the largest values.

## Approach: Sort degrees
```java
// Give the biggest labels to the busiest cities: sort degrees and weight them 1..n
public long maximumImportance(int n, int[][] roads) {
    int[] degree = new int[n];
    for (int[] r : roads) {
        degree[r[0]]++;
        degree[r[1]]++;
    }
    Arrays.sort(degree);
    long sum = 0;
    for (int i = 0; i < n; i++) sum += (long) degree[i] * (i + 1);
    return sum;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort degrees | O(E + n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Use `long` for the sum.

## Recall before you reveal
<details><summary>Why is greedy right?</summary>

Rearrangement inequality: matching sorted with sorted maximises a sum of products.

</details>


<details><summary>Why long?</summary>

Values reach 5·10^4 and degrees 10^5, so the sum overflows int.

</details>


## Connected
- [Maximal Network Rank](Maximal%20Network%20Rank.md)
