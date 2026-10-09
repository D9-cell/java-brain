---
topic: BST and Construction
pattern: [Depth from dashes, Stack of the current path]
source: LeetCode 1028
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Recover a Tree From Preorder Traversal

> [!TIP]
> **🧠 Memory hook**
> The number of **dashes is the depth**: pop the stack until it matches, then attach.
> **Mantra: POP TO DEPTH, ATTACH LEFT THEN RIGHT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=18) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
A preorder traversal prints each node preceded by `depth` dashes. Rebuild the tree (a single child is a left child).

## Key insight
Keep a stack of the current root path. For a node at depth `d`, pop until the stack has `d` nodes; the top is its parent: take the left slot first, then the right.

## Approach 1: Stack
```java
// A value written after d dashes sits at depth d; a stack holds the current root path
public TreeNode recoverFromPreorder(String s) {
    Deque<TreeNode> st = new ArrayDeque<>();
    for (int i = 0; i < s.length(); ) {
        int depth = 0;
        while (s.charAt(i) == '-') { depth++; i++; }
        int j = i;
        while (j < s.length() && Character.isDigit(s.charAt(j))) j++;
        TreeNode n = new TreeNode(Integer.parseInt(s.substring(i, j)));
        i = j;
        while (st.size() > depth) st.pop();
        if (!st.isEmpty()) { if (st.peek().left == null) st.peek().left = n; else st.peek().right = n; }
        st.push(n);
    }
    return st.peekLast();
}
```

## Approach 2: Recursive descent
```java
// Recursive descent with a shared index and the expected depth
public TreeNode recoverFromPreorderRecursive(String s) { return build(s, new int[]{0}, 0); }

// Reads the next node if it has exactly `depth` dashes in front of it
private TreeNode build(String s, int[] i, int depth) {
    int d = 0;
    while (i[0] + d < s.length() && s.charAt(i[0] + d) == '-') d++;
    if (i[0] >= s.length() || d != depth) return null;
    i[0] += d;
    int j = i[0];
    while (j < s.length() && Character.isDigit(s.charAt(j))) j++;
    TreeNode n = new TreeNode(Integer.parseInt(s.substring(i[0], j)));
    i[0] = j;
    n.left = build(s, i, depth + 1);
    n.right = build(s, i, depth + 1);
    return n;
}
```

| Approach | Time | Space |
|---|---|---|
| Stack | O(n) | O(h) |
| Recursive descent | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why parse the whole number before counting dashes again?</summary>

Node values have several digits; dashes only appear between nodes.

</details>


## Connected
- [Construct Binary Tree from String](Construct%20Binary%20Tree%20from%20String.md)
