---
topic: DFS and Recursion
pattern: [Path storage, Distance sets]
source: GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Count the Nodes at Distance K from Leaf

> [!TIP]
> **🧠 Memory hook**
> Look **k steps up** from every leaf, but count each node once.
> **Mantra: k BACK FROM EACH LEAF, DEDUPE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=41) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Count distinct nodes that are exactly k edges above some leaf (that leaf lies in their subtree).

## Key insight
Store each root-to-leaf path and take the node at index `len - 1 - k`, adding it to a set. One-pass alternative: each node returns the set of distances to the leaves below it and is counted once if `k` is in that set.

## Approach 1: Path + set
```java
// Store each root-to-leaf path; the node k steps above the leaf is a candidate, and a set removes duplicates shared by several leaves
public int printKDistantfromLeaf(TreeNode root, int k) {
    Set<TreeNode> hit = new HashSet<>();
    paths(root, new ArrayList<>(), k, hit);
    return hit.size();
}

// At a leaf, look k places back in the current path
private void paths(TreeNode n, List<TreeNode> path, int k, Set<TreeNode> hit) {
    if (n == null) return;
    path.add(n);
    if (n.left == null && n.right == null && path.size() - 1 - k >= 0) hit.add(path.get(path.size() - 1 - k));
    paths(n.left, path, k, hit);
    paths(n.right, path, k, hit);
    path.remove(path.size() - 1);
}
```

## Approach 2: Distance sets
```java
// One pass: every node returns the set of distances to the leaves below it and counts itself once if k is among them
public int countOnePass(TreeNode root, int k) {
    int[] count = {0};
    dist(root, k, count);
    return count[0];
}

// Returns the distinct distances (0 = the node itself is a leaf) to leaves in the subtree
private Set<Integer> dist(TreeNode n, int k, int[] count) {
    Set<Integer> d = new HashSet<>();
    if (n == null) return d;
    if (n.left == null && n.right == null) {
        d.add(0);
        if (k == 0) count[0]++;
        return d;
    }
    for (int x : dist(n.left, k, count)) d.add(x + 1);
    for (int x : dist(n.right, k, count)) d.add(x + 1);
    if (d.contains(k)) count[0]++;
    return d;
}
```

| Approach | Time | Space |
|---|---|---|
| Path + set | O(n · h) | O(n · h) |
| Distance sets | O(n · h) | O(h · h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why a set?</summary>

A node above several leaves would be counted once per leaf otherwise.

</details>


## Connected
- [Number of Good Leaf Nodes Pairs](Number%20of%20Good%20Leaf%20Nodes%20Pairs.md)
- [All Nodes Distance K in Binary Tree](../LCA%20Distance%20and%20Tree%20Graphs/All%20Nodes%20Distance%20K%20in%20Binary%20Tree.md)
