---
topic: LCA Distance and Tree Graphs
pattern: [Parent map + BFS, Farthest node]
source: LeetCode 2385
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Amount of Time for Binary Tree to Be Infected

> [!TIP]
> **🧠 Memory hook**
> Infection spreads one edge per minute, so the answer is the **farthest distance** from the start.
> **Mantra: FARTHEST NODE FROM START**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=4) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
The start node is infected at minute 0 and infects its neighbours every minute. How long until the whole tree is infected?

## Key insight
Convert the tree to an undirected graph and BFS from the start; the number of BFS levels minus one is the time. A one-pass DFS tracks the distance to the start when it is inside the subtree.

## Approach 1: Graph BFS
```java
// Convert the tree to an undirected graph; the infection time is the farthest distance from the start node
public int amountOfTime(TreeNode root, int start) {
    Map<Integer, List<Integer>> g = new HashMap<>();
    build(root, null, g);
    Queue<Integer> q = new LinkedList<>(List.of(start));
    Set<Integer> seen = new HashSet<>(List.of(start));
    int minutes = -1;
    while (!q.isEmpty()) {
        minutes++;
        for (int i = q.size(); i > 0; i--) for (int nb : g.get(q.poll())) if (seen.add(nb)) q.add(nb);
    }
    return minutes;
}

// Adds tree edges in both directions
private void build(TreeNode n, TreeNode p, Map<Integer, List<Integer>> g) {
    if (n == null) return;
    g.computeIfAbsent(n.val, k -> new ArrayList<>());
    if (p != null) { g.get(n.val).add(p.val); g.get(p.val).add(n.val); }
    build(n.left, n, g);
    build(n.right, n, g);
}
```

## Approach 2: One-pass DFS
```java
// One DFS: if the start is below, a node reports (negative) depth to it and checks the other side
public int amountOfTimeOnePass(TreeNode root, int start) {
    int[] best = {0};
    depth(root, start, best);
    return best[0];
}

// Positive result = height of a subtree without the start; negative = -(distance to start) when the start is inside
private int depth(TreeNode n, int start, int[] best) {
    if (n == null) return 0;
    int l = depth(n.left, start, best), r = depth(n.right, start, best);
    if (n.val == start) { best[0] = Math.max(l, r); return -1; }
    if (l >= 0 && r >= 0) return Math.max(l, r) + 1;
    int dist = Math.abs(l < 0 ? l : r), other = l < 0 ? r : l;
    best[0] = Math.max(best[0], dist + other);
    return -(dist + 1);
}
```

| Approach | Time | Space |
|---|---|---|
| Graph BFS | O(n) | O(n) |
| One-pass DFS | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why `minutes` starts at -1?</summary>

The first level is the start itself and takes zero minutes.

</details>


## Connected
- [All Nodes Distance K in Binary Tree](All%20Nodes%20Distance%20K%20in%20Binary%20Tree.md)
- [Kill Process](Kill%20Process.md)
