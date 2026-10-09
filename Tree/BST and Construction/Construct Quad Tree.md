---
topic: BST and Construction
pattern: [Split into four, Uniform check]
source: LeetCode 427
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Construct Quad Tree

> [!TIP]
> **🧠 Memory hook**
> A square of one colour is **one leaf**; otherwise split it into four quadrants.
> **Mantra: UNIFORM → LEAF, ELSE FOUR QUADRANTS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=23) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Build a quad tree for a 2ⁿ × 2ⁿ grid of 0/1 cells.

## Key insight
Check whether the square is uniform (O(n²) per call, O(n² log n) total). Bottom-up, build the four children first and collapse them into one leaf when all four are equal leaves, which avoids rescanning.

## Approach 1: Check, then split
```java
// If the square is uniform it is one leaf; otherwise split into four quadrants and recurse
public Node construct(int[][] grid) { return build(grid, 0, 0, grid.length); }

// Builds the node for the n x n square at (r, c)
private Node build(int[][] g, int r, int c, int n) {
    if (same(g, r, c, n)) return new Node(g[r][c] == 1, true);
    Node node = new Node(true, false);
    int h = n / 2;
    node.topLeft = build(g, r, c, h);
    node.topRight = build(g, r, c + h, h);
    node.bottomLeft = build(g, r + h, c, h);
    node.bottomRight = build(g, r + h, c + h, h);
    return node;
}

// True if every cell of the square equals the first one
private boolean same(int[][] g, int r, int c, int n) {
    for (int i = r; i < r + n; i++) for (int j = c; j < c + n; j++) if (g[i][j] != g[r][c]) return false;
    return true;
}
```

## Approach 2: Build, then merge
```java
// Bottom-up: build the four children first and merge them when all are equal leaves
public Node constructMerge(int[][] grid) { return merge(grid, 0, 0, grid.length); }

// Single cell is a leaf; four equal leaves collapse into one leaf
private Node merge(int[][] g, int r, int c, int n) {
    if (n == 1) return new Node(g[r][c] == 1, true);
    int h = n / 2;
    Node a = merge(g, r, c, h), b = merge(g, r, c + h, h), d = merge(g, r + h, c, h), e = merge(g, r + h, c + h, h);
    if (a.isLeaf && b.isLeaf && d.isLeaf && e.isLeaf && a.val == b.val && b.val == d.val && d.val == e.val) return new Node(a.val, true);
    Node node = new Node(true, false);
    node.topLeft = a;
    node.topRight = b;
    node.bottomLeft = d;
    node.bottomRight = e;
    return node;
}
```

| Approach | Time | Space |
|---|---|---|
| Check, then split | O(n² log n) | O(log n) |
| Build, then merge | O(n²) | O(log n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Value of an internal node?</summary>

Any; LeetCode ignores it.

</details>


## Connected
- [Maximum Depth of N-ary Tree](Maximum%20Depth%20of%20N-ary%20Tree.md)
