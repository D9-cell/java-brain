---
topic: Grid and BFS
pattern: [Flood fill, Shape signature]
source: LeetCode 694
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Number of Distinct Islands

> [!TIP]
> **🧠 Memory hook**
> Describe each island with the route a turtle walks around it; equal routes mean equal shapes.
> **Mantra: DFS PATH STRING, WITH BACKTRACK MARKS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=3) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
Count islands that are different shapes (translation allowed, rotation not).

## Key insight
Record the DFS as a string of moves, and append a marker for every backtrack. The markers matter: without them two different shapes can produce the same move list.

## Approach: DFS path signature
```java
// Records the DFS walk of each island as a string; equal strings mean equal shapes
public int countDistinctIslands(int[][] grid) {
    Set<String> shapes = new HashSet<>();
    for (int i = 0; i < grid.length; i++) {
        for (int j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == 1) {
                StringBuilder sb = new StringBuilder("X");
                walk(grid, i, j, 'S', sb);
                shapes.add(sb.toString());
            }
        }
    }
    return shapes.size();
}

// Appends the move letter on entry and 'O' on every exit, so the string also encodes where the walk backed up
private void walk(int[][] g, int i, int j, char move, StringBuilder sb) {
    if (i < 0 || i >= g.length || j < 0 || j >= g[0].length || g[i][j] != 1) return;
    g[i][j] = 0;
    sb.append(move);
    walk(g, i + 1, j, 'D', sb);
    walk(g, i - 1, j, 'U', sb);
    walk(g, i, j - 1, 'L', sb);
    walk(g, i, j + 1, 'R', sb);
    sb.append('O');
}
```

| Approach | Time | Space |
|---|---|---|
| DFS path signature | O(m · n) | O(m · n) |

> [!WARNING]
> **Java gotcha**
> This is a premium LeetCode problem, so the sample is from its description.

## Recall before you reveal
<details><summary>Why add a character on backtracking?</summary>

It encodes the tree shape, not just the order of moves.

</details>


<details><summary>Alternative signature?</summary>

Subtract the island's top-left cell from every cell and store the sorted coordinates.

</details>


## Connected
- [Number of Islands](Number%20of%20Islands.md)
