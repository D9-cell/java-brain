---
topic: LCA Distance and Tree Graphs
pattern: [LCA by recursion, Parent map]
source: LeetCode 236, GeeksforGeeks
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Lowest Common Ancestor of a Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Send two scouts down; the first node that **hears from both sides** is the meeting point.
> **Mantra: FOUND ON BOTH SIDES → ME**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=0) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
Return the lowest node that has both p and q in its subtree (a node may be its own descendant).

## Key insight
Recurse: return the node if it is p or q; otherwise ask both children. Two non-null answers mean p and q are on different sides, so the current node is the LCA. One non-null answer is passed up.

## Approach 1: One recursion
```java
// If p and q are found in different subtrees the current node is the answer; otherwise pass up whichever was found
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode l = lowestCommonAncestor(root.left, p, q), r = lowestCommonAncestor(root.right, p, q);
    if (l != null && r != null) return root;
    return l != null ? l : r;
}
```

## Approach 2: Parent map + ancestor set
```java
// Store the root path of p and walk up from q until it hits that path
public TreeNode lowestCommonAncestorParents(TreeNode root, TreeNode p, TreeNode q) {
    Map<TreeNode, TreeNode> parent = new HashMap<>();
    Deque<TreeNode> st = new ArrayDeque<>();
    parent.put(root, null);
    st.push(root);
    while (!parent.containsKey(p) || !parent.containsKey(q)) {
        TreeNode n = st.pop();
        if (n.left != null) { parent.put(n.left, n); st.push(n.left); }
        if (n.right != null) { parent.put(n.right, n); st.push(n.right); }
    }
    Set<TreeNode> up = new HashSet<>();
    for (TreeNode x = p; x != null; x = parent.get(x)) up.add(x);
    TreeNode x = q;
    while (!up.contains(x)) x = parent.get(x);
    return x;
}
```

| Approach | Time | Space |
|---|---|---|
| One recursion | O(n) | O(h) |
| Parent map + ancestor set | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>What if p is an ancestor of q?</summary>

The recursion returns p as soon as it meets it; q is below, so p is the answer.

</details>


<details><summary>Does it assume both nodes exist?</summary>

Yes; otherwise one extra pass must confirm that.

</details>


## Connected
- [Lowest Common Ancestor of a Binary Search Tree](Lowest%20Common%20Ancestor%20of%20a%20Binary%20Search%20Tree.md)
- [Lowest Common Ancestor of Deepest Leaves](Lowest%20Common%20Ancestor%20of%20Deepest%20Leaves.md)
- [Min Distance between Two Given Nodes of a Binary Tree](Min%20Distance%20between%20Two%20Given%20Nodes%20of%20a%20Binary%20Tree.md)
