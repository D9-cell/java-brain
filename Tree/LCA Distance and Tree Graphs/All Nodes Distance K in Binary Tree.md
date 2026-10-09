---
topic: LCA Distance and Tree Graphs
pattern: [Parent map + BFS, Tree as a graph]
source: LeetCode 863
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# All Nodes Distance K in Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Give every node an **up arrow**, then ripple outward from the target for k steps.
> **Mantra: ADD PARENT LINKS, BFS K LEVELS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=3) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
Return the values of all nodes at distance k from the target node.

## Key insight
A tree edge only points down. Record parents, then BFS from the target over left, right and parent edges with a visited set; the queue after k rounds is the answer. A DFS version returns the distance to the target and collects the other side of each ancestor.

## Approach 1: Parent map + BFS
```java
// Record parents, then BFS outward from the target over left, right and parent edges
public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
    Map<TreeNode, TreeNode> parent = new HashMap<>();
    link(root, null, parent);
    Queue<TreeNode> q = new LinkedList<>();
    Set<TreeNode> seen = new HashSet<>(List.of(target));
    q.add(target);
    for (int d = 0; d < k && !q.isEmpty(); d++) {
        for (int i = q.size(); i > 0; i--) {
            TreeNode cur = q.poll();
            for (TreeNode nb : new TreeNode[]{cur.left, cur.right, parent.get(cur)}) if (nb != null && seen.add(nb)) q.add(nb);
        }
    }
    List<Integer> res = new ArrayList<>();
    for (TreeNode n : q) res.add(n.val);
    return res;
}

// Fills the parent map
private void link(TreeNode n, TreeNode p, Map<TreeNode, TreeNode> parent) {
    if (n == null) return;
    parent.put(n, p);
    link(n.left, n, parent);
    link(n.right, n, parent);
}
```

## Approach 2: DFS without parent map
```java
// No parent map: a DFS returns the distance to the target and collects nodes on the other side of each ancestor
public List<Integer> distanceKDfs(TreeNode root, TreeNode target, int k) {
    List<Integer> res = new ArrayList<>();
    find(root, target, k, res);
    return res;
}

// Returns the distance from n to the target when the target is inside n's subtree, otherwise -1
private int find(TreeNode n, TreeNode target, int k, List<Integer> res) {
    if (n == null) return -1;
    if (n == target) { collect(n, k, res); return 0; }
    int l = find(n.left, target, k, res);
    if (l >= 0) {
        if (l + 1 == k) res.add(n.val); else collect(n.right, k - l - 2, res);
        return l + 1;
    }
    int r = find(n.right, target, k, res);
    if (r >= 0) {
        if (r + 1 == k) res.add(n.val); else collect(n.left, k - r - 2, res);
        return r + 1;
    }
    return -1;
}

// Adds the nodes exactly d levels below n
private void collect(TreeNode n, int d, List<Integer> res) {
    if (n == null || d < 0) return;
    if (d == 0) { res.add(n.val); return; }
    collect(n.left, d - 1, res);
    collect(n.right, d - 1, res);
}
```

| Approach | Time | Space |
|---|---|---|
| Parent map + BFS | O(n) | O(n) |
| DFS without parent map | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why a visited set?</summary>

The parent edge leads back to where you came from.

</details>


## Connected
- [Amount of Time for Binary Tree to Be Infected](Amount%20of%20Time%20for%20Binary%20Tree%20to%20Be%20Infected.md)
- [Count the Nodes at Distance K from Leaf](../DFS%20and%20Recursion/Count%20the%20Nodes%20at%20Distance%20K%20from%20Leaf.md)
