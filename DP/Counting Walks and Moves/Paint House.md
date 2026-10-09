---
topic: Counting Walks and Moves
pattern: [State with memory, Last colour]
source: LeetCode 256
difficulty: Medium
companies: [LinkedIn]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Paint House

> [!TIP]
> **🧠 Memory hook**
> Walk down the street remembering **only the colour of the previous house**.
> **Mantra: cost[c] = price[c] + min(OTHER TWO COLOURS)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=3) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
n houses, 3 colours, `costs[i][c]` to paint house i with colour c. Neighbours must differ. Return the minimum total cost.

## Key insight
The best total ending with colour c at house i is its price plus the cheaper of the other two colours at house i − 1. Three rolling values carry the whole street.

## Approach 1: Three rolling values
```java
// Rolling row: best total if the current house gets colour 0, 1 or 2
public int minCost(int[][] costs) {
    int r = 0, g = 0, b = 0;
    for (int[] c : costs) {
        int nr = c[0] + Math.min(g, b), ng = c[1] + Math.min(r, b), nb = c[2] + Math.min(r, g);
        r = nr; g = ng; b = nb;
    }
    return Math.min(r, Math.min(g, b));
}
```

## Approach 2: Top-down memo
```java
// Top-down: cheapest way to paint houses i.. when house i - 1 has colour prev
public int minCostMemo(int[][] costs) {
    int[][] memo = new int[costs.length][4];
    for (int[] row : memo) Arrays.fill(row, -1);
    return paint(costs, 0, 3, memo);
}

// Tries every colour for house i except the previous one
private int paint(int[][] costs, int i, int prev, int[][] memo) {
    if (i == costs.length) return 0;
    if (memo[i][prev] >= 0) return memo[i][prev];
    int best = Integer.MAX_VALUE;
    for (int c = 0; c < 3; c++) if (c != prev) best = Math.min(best, costs[i][c] + paint(costs, i + 1, c, memo));
    return memo[i][prev] = best;
}
```

| Approach | Time | Space |
|---|---|---|
| Three rolling values | O(n) | O(1) |
| Top-down memo | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>With k colours?</summary>

Keep the smallest and second-smallest of the previous row to stay O(n · k).

</details>


<details><summary>Why only the previous colour?</summary>

The constraint only links neighbours.

</details>


## Connected
- [Student Attendance Record II](Student%20Attendance%20Record%20II.md)
- [House Robber](../Stairs%20and%20Robbers/House%20Robber.md)
