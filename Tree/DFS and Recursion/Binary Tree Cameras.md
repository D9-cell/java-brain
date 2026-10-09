---
topic: DFS and Recursion
pattern: [Greedy states, Tree DP]
source: LeetCode 968
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Binary Tree Cameras

> [!TIP]
> **🧠 Memory hook**
> Cameras see their **parent and children**. Put them on the parents of leaves, never on leaves.
> **Mantra: LEAF PARENT GETS THE CAMERA**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=5) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Place the fewest cameras so that every node is monitored (a camera watches itself, its parent and its children).

## Key insight
Bottom-up greedy with three states: 0 not covered, 1 has a camera, 2 covered without one. If any child is 0 the node needs a camera. Equivalent DP keeps three costs per node.

## Approach 1: State machine greedy
```java
// Greedy with three states per node: 0 = not covered, 1 = has a camera, 2 = covered without a camera
public int minCameraCover(TreeNode root) {
    int[] cameras = {0};
    return state(root, cameras) == 0 ? cameras[0] + 1 : cameras[0];
}

// A node with an uncovered child must get a camera; a node next to a camera is covered
private int state(TreeNode n, int[] cameras) {
    if (n == null) return 2;
    int l = state(n.left, cameras), r = state(n.right, cameras);
    if (l == 0 || r == 0) { cameras[0]++; return 1; }
    if (l == 1 || r == 1) return 2;
    return 0;
}
```

## Approach 2: Covered set greedy
```java
// Greedy with a set of covered nodes: put a camera on the parent of every uncovered child
public int minCameraCoverSet(TreeNode root) {
    Set<TreeNode> covered = new HashSet<>();
    covered.add(null);
    int[] count = {0};
    dfs(root, null, covered, count);
    return count[0];
}

// Post-order walk that places a camera on the node when it, its parent or a child is still uncovered
private void dfs(TreeNode n, TreeNode parent, Set<TreeNode> covered, int[] count) {
    if (n == null) return;
    dfs(n.left, n, covered, count);
    dfs(n.right, n, covered, count);
    if ((parent == null && !covered.contains(n)) || !covered.contains(n.left) || !covered.contains(n.right)) {
        count[0]++;
        covered.add(n);
        covered.add(parent);
        covered.add(n.left);
        covered.add(n.right);
    }
}
```

## Approach 3: Tree DP with three costs
```java
// DP returning {camera here, covered by a child camera, covered by either with minimum cameras}
public int minCameraCoverDp(TreeNode root) {
    int[] a = dp(root);
    return Math.min(a[0], a[1]);
}

// Costs: a[0] camera on n, a[1] n covered by a child, a[2] n covered by anyone including its parent
private int[] dp(TreeNode n) {
    if (n == null) return new int[]{1000, 0, 0};
    int[] l = dp(n.left), r = dp(n.right);
    int withCam = 1 + Math.min(l[0], Math.min(l[1], l[2]) ) + Math.min(r[0], Math.min(r[1], r[2]));
    int byChild = Math.min(l[0] + Math.min(r[0], r[1]), r[0] + Math.min(l[0], l[1]));
    int byParent = l[1] + r[1];
    return new int[]{withCam, byChild, byParent};
}
```

| Approach | Time | Space |
|---|---|---|
| State machine greedy | O(n) | O(h) |
| Covered set greedy | O(n) | O(n) |
| Tree DP with three costs | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against trying every subset of nodes. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why never place a camera on a leaf?</summary>

Its parent covers the same nodes and more.

</details>


<details><summary>What if the root ends up uncovered?</summary>

Add one camera at the root.

</details>


## Connected
- [Distribute Coins in Binary Tree](Distribute%20Coins%20in%20Binary%20Tree.md)
- [Tree DP: rob the tree](../../DP/Stairs%20and%20Robbers/House%20Robber%20III.md)
