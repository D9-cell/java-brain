---
topic: DFS and Recursion
pattern: [Bottom-up combine, Distance histogram]
source: LeetCode 1530
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Number of Good Leaf Nodes Pairs

> [!TIP]
> **🧠 Memory hook**
> Every subtree keeps a **histogram of how far its leaves are**; two children's histograms are matched at their parent.
> **Mantra: RETURN LEAF DISTANCE COUNTS, PAIR AT THE NODE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=20) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Count pairs of leaves whose shortest path length is at most `distance`.

## Key insight
Return an array `cnt[d]` = leaves exactly `d` edges below. At a node, a pair (left leaf at `a`, right leaf at `b`) has distance `a + b + 2`; count those within the limit and shift the histograms up by one.

## Approach: Histogram DFS
```java
// Each node returns how many leaves lie at each distance below it; pairs split across the two children are counted at the node
public int countPairs(TreeNode root, int distance) {
    int[] pairs = {0};
    dfs(root, distance, pairs);
    return pairs[0];
}

// cnt[d] = number of leaves exactly d edges below n
private int[] dfs(TreeNode n, int distance, int[] pairs) {
    int[] cnt = new int[distance + 1];
    if (n == null) return cnt;
    if (n.left == null && n.right == null) { cnt[0] = 1; return cnt; }
    int[] l = dfs(n.left, distance, pairs), r = dfs(n.right, distance, pairs);
    for (int a = 0; a < distance; a++) for (int b = 0; b < distance; b++) if (a + b + 2 <= distance) pairs[0] += l[a] * r[b];
    for (int d = 0; d < distance; d++) cnt[d + 1] = l[d] + r[d];
    return cnt;
}
```

| Approach | Time | Space |
|---|---|---|
| Histogram DFS | O(n · D²) | O(D · h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why `a + b + 2`?</summary>

One edge from the node to each child, plus the distances below the children.

</details>


## Connected
- [Diameter of Binary Tree](Diameter%20of%20Binary%20Tree.md)
- [Count the Nodes at Distance K from Leaf](Count%20the%20Nodes%20at%20Distance%20K%20from%20Leaf.md)
