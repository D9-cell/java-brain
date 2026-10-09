---
topic: DFS and Recursion
pattern: [Bottom-up combine, Alternate directions]
source: LeetCode 1372
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Longest ZigZag Path in a Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Walk like a **drunk zigzag**: left, right, left… every straight step resets the count.
> **Mantra: KEEP THE TURN → +1, SAME SIDE → RESTART AT 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=6) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
A zigzag path alternates between left and right children. Return the length (in edges) of the longest one starting anywhere.

## Key insight
Each node returns two numbers: the longest zigzag that starts by going left, and the one that starts by going right. Going left continues with the child's right-start value.

## Approach 1: Bottom-up pair
```java
// Each node reports the zigzag length (in edges) starting with a left move and starting with a right move
public int longestZigZag(TreeNode root) {
    int[] best = {0};
    dfs(root, best);
    return best[0];
}

// Returns {length if the next move is left, length if the next move is right}
private int[] dfs(TreeNode n, int[] best) {
    if (n == null) return new int[]{-1, -1};
    int[] l = dfs(n.left, best), r = dfs(n.right, best);
    int goLeft = l[1] + 1, goRight = r[0] + 1;
    best[0] = Math.max(best[0], Math.max(goLeft, goRight));
    return new int[]{goLeft, goRight};
}
```

## Approach 2: Top-down with direction
```java
// Top-down: carry the current direction and the length so far
public int longestZigZagTopDown(TreeNode root) {
    int[] best = {0};
    walk(root, true, 0, best);
    walk(root, false, 0, best);
    return best[0];
}

// Keeping the direction extends the streak, switching direction restarts at 1
private void walk(TreeNode n, boolean wantLeft, int len, int[] best) {
    if (n == null) return;
    best[0] = Math.max(best[0], len);
    if (wantLeft) { walk(n.left, false, len + 1, best); walk(n.right, true, 1, best); }
    else { walk(n.right, true, len + 1, best); walk(n.left, false, 1, best); }
}
```

| Approach | Time | Space |
|---|---|---|
| Bottom-up pair | O(n) | O(h) |
| Top-down with direction | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why -1 for a null child?</summary>

So that `-1 + 1 = 0` edges for a leaf.

</details>


## Connected
- [Diameter of Binary Tree](Diameter%20of%20Binary%20Tree.md)
