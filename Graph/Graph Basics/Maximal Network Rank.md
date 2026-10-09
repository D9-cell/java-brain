---
topic: Graph Basics
pattern: [Degree, Pairs]
source: LeetCode 1615
difficulty: Medium
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Maximal Network Rank

> [!TIP]
> **🧠 Memory hook**
> Two radio towers: their reach is the sum of their links, but a shared link only counts once.
> **Mantra: deg(a) + deg(b) − shared**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=15) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
The network rank of two cities is the number of roads touching either. Return the maximum over all pairs.

## Key insight
Rank = degree(a) + degree(b), minus 1 if a direct road joins them (it was counted twice). Only the highest degrees can win, so a degree-bucket version avoids the O(n²) pair loop.

## Approach 1: All pairs
```java
// Tries every pair: rank is degree(a) + degree(b), minus one when they share a road
public int maximalNetworkRankPairs(int n, int[][] roads) {
    int[] degree = new int[n];
    boolean[][] direct = new boolean[n][n];
    for (int[] r : roads) {
        degree[r[0]]++;
        degree[r[1]]++;
        direct[r[0]][r[1]] = direct[r[1]][r[0]] = true;
    }
    int best = 0;
    for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) best = Math.max(best, degree[i] + degree[j] - (direct[i][j] ? 1 : 0));
    return best;
}
```

## Approach 2: Only the top degrees
```java
// Counts how many nodes have the biggest and second biggest degree, then only checks the roads among those
public int maximalNetworkRank(int n, int[][] roads) {
    int[] degree = new int[n];
    for (int[] r : roads) {
        degree[r[0]]++;
        degree[r[1]]++;
    }
    int max1 = 0, max2 = 0, c1 = 0, c2 = 0;
    for (int d : degree) {
        if (d > max1) { max2 = max1; c2 = c1; max1 = d; c1 = 1; }
        else if (d == max1) c1++;
        else if (d > max2) { max2 = d; c2 = 1; }
        else if (d == max2) c2++;
    }
    if (c1 > 1) {
        long pairs = (long) c1 * (c1 - 1) / 2, linked = 0;
        for (int[] r : roads) if (degree[r[0]] == max1 && degree[r[1]] == max1) linked++;
        return 2 * max1 - (linked == pairs ? 1 : 0);
    }
    int linked = 0;
    for (int[] r : roads) if ((degree[r[0]] == max1 && degree[r[1]] == max2) || (degree[r[1]] == max1 && degree[r[0]] == max2)) linked++;
    return max1 + max2 - (linked == c2 ? 1 : 0);
}
```

| Approach | Time | Space |
|---|---|---|
| All pairs | O(n² + E) | O(n²) |
| Only the top degrees | O(n + E) | O(n) |

## Recall before you reveal
<details><summary>Why subtract 1?</summary>

The road between the pair is counted once in each degree.

</details>


<details><summary>How does the fast version work?</summary>

It counts nodes at the max and second-max degree and checks only whether all candidate pairs are directly linked.

</details>


## Connected
- [Maximum Total Importance of Roads](Maximum%20Total%20Importance%20of%20Roads.md)
