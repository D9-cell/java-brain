---
topic: Topological Sort
pattern: [Two topological sorts]
source: LeetCode 2392
difficulty: Hard
companies: [Apple]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, topological-sort]
---
# Build a Matrix With Conditions

> [!TIP]
> **🧠 Memory hook**
> Rows and columns are independent puzzles: solve each as an ordering and read positions off.
> **Mantra: SORT ROWS, SORT COLUMNS, PLACE v AT (rowPos, colPos)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Topological%20Sort/Topological%20Sort%20Animations.html#p=5) · **Pattern hub:** [Topological Sort - Pattern Map](Topological%20Sort%20-%20Pattern%20Map.md)

## Problem
Place 1..k in a k × k matrix so that listed numbers are above / left of others. Return the matrix or an empty one.

## Key insight
The conditions on rows and on columns do not interact. Topologically sort the numbers for rows and again for columns; if either sort fails (cycle) it is impossible. Number v goes to row = its position in the row order, column = its position in the column order.

## Approach 1: Kahn twice
```java
// Topologically sort the rows and the columns separately; a number's row is its position in the row order, its column its position in the column order
public int[][] buildMatrix(int k, int[][] rowConditions, int[][] colConditions) {
    List<Integer> rows = topo(k, rowConditions), cols = topo(k, colConditions);
    if (rows.isEmpty() || cols.isEmpty()) return new int[0][];
    int[] rowOf = new int[k + 1], colOf = new int[k + 1];
    for (int i = 0; i < k; i++) { rowOf[rows.get(i)] = i; colOf[cols.get(i)] = i; }
    int[][] matrix = new int[k][k];
    for (int v = 1; v <= k; v++) matrix[rowOf[v]][colOf[v]] = v;
    return matrix;
}

// Kahn's algorithm on numbers 1..k; returns an empty list when the conditions contain a cycle
private List<Integer> topo(int k, int[][] conditions) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i <= k; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[k + 1];
    for (int[] c : conditions) { adj.get(c[0]).add(c[1]); indegree[c[1]]++; }
    Queue<Integer> que = new ArrayDeque<>();
    for (int i = 1; i <= k; i++) if (indegree[i] == 0) que.add(i);
    List<Integer> order = new ArrayList<>();
    while (!que.isEmpty()) {
        int u = que.poll();
        order.add(u);
        for (int v : adj.get(u)) if (--indegree[v] == 0) que.add(v);
    }
    return order.size() == k ? order : new ArrayList<>();
}
```

## Approach 2: DFS twice
```java
// DFS version of the same ordering (reverse finish order)
public int[][] buildMatrixDfs(int k, int[][] rowConditions, int[][] colConditions) {
    List<Integer> rows = topoDfs(k, rowConditions), cols = topoDfs(k, colConditions);
    if (rows.isEmpty() || cols.isEmpty()) return new int[0][];
    int[] rowOf = new int[k + 1], colOf = new int[k + 1];
    for (int i = 0; i < k; i++) { rowOf[rows.get(i)] = i; colOf[cols.get(i)] = i; }
    int[][] matrix = new int[k][k];
    for (int v = 1; v <= k; v++) matrix[rowOf[v]][colOf[v]] = v;
    return matrix;
}

// Reverse finish order with cycle detection
private List<Integer> topoDfs(int k, int[][] conditions) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i <= k; i++) adj.add(new ArrayList<>());
    for (int[] c : conditions) adj.get(c[0]).add(c[1]);
    int[] state = new int[k + 1];
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 1; i <= k; i++) if (state[i] == 0 && !visit(adj, i, state, stack)) return new ArrayList<>();
    return new ArrayList<>(stack);
}

// False on a cycle
private boolean visit(List<List<Integer>> adj, int u, int[] state, Deque<Integer> stack) {
    state[u] = 1;
    for (int v : adj.get(u)) {
        if (state[v] == 1) return false;
        if (state[v] == 0 && !visit(adj, v, state, stack)) return false;
    }
    state[u] = 2;
    stack.push(u);
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Kahn twice | O(k + conditions) | O(k²) |
| DFS twice | O(k + conditions) | O(k²) |

## Recall before you reveal
<details><summary>Why can rows and columns be solved separately?</summary>

A number has one row and one column and the conditions mention only one of them at a time.

</details>


<details><summary>Does every number get its own row and column?</summary>

Yes, the matrix is k × k with each of 1..k once, a permutation matrix.

</details>


## Connected
- [Course Schedule II](Course%20Schedule%20II.md)
