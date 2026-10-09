---
topic: BST and Construction
pattern: [Recursive descent, Parsing with an index]
source: LeetCode 536
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Construct Binary Tree from String

> [!TIP]
> **🧠 Memory hook**
> A number, then up to two **bracketed subtrees**: parse it like an expression.
> **Mantra: NUMBER, ( LEFT ), ( RIGHT )**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=17) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Build a tree from a string like `4(2(3)(1))(6(5))`. A single child is always the left child.

## Key insight
Read an optionally negative number, then if the next char is `(` parse a subtree and skip `)`; do it again for the right child. A stack version creates a node per number and pops on `)`.

## Approach 1: Recursive descent
```java
// Grammar: number, then up to two parenthesised subtrees (left first)
public TreeNode str2tree(String s) {
    if (s.isEmpty()) return null;
    return parse(s, new int[]{0});
}

// Reads a number and the optional "(...)" groups, advancing the shared index
private TreeNode parse(String s, int[] i) {
    int start = i[0];
    if (s.charAt(i[0]) == '-') i[0]++;
    while (i[0] < s.length() && Character.isDigit(s.charAt(i[0]))) i[0]++;
    TreeNode n = new TreeNode(Integer.parseInt(s.substring(start, i[0])));
    if (i[0] < s.length() && s.charAt(i[0]) == '(') { i[0]++; n.left = parse(s, i); i[0]++; }
    if (i[0] < s.length() && s.charAt(i[0]) == '(') { i[0]++; n.right = parse(s, i); i[0]++; }
    return n;
}
```

## Approach 2: Stack
```java
// Stack version: '(' starts a child, ')' closes it, digits build the number
public TreeNode str2treeStack(String s) {
    Deque<TreeNode> st = new ArrayDeque<>();
    TreeNode root = null;
    for (int i = 0; i < s.length(); ) {
        char c = s.charAt(i);
        if (c == ')') { st.pop(); i++; continue; }
        if (c == '(') { i++; continue; }
        int j = i + 1;
        while (j < s.length() && Character.isDigit(s.charAt(j))) j++;
        TreeNode n = new TreeNode(Integer.parseInt(s.substring(i, j)));
        if (root == null) root = n;
        else if (st.peek().left == null) st.peek().left = n; else st.peek().right = n;
        st.push(n);
        i = j;
    }
    return root;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive descent | O(n) | O(h) |
| Stack | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why a shared index?</summary>

The recursion must continue where the child stopped reading.

</details>


<details><summary>What about negative numbers?</summary>

Treat a leading `-` as part of the number.

</details>


## Connected
- [Recover a Tree From Preorder Traversal](Recover%20a%20Tree%20From%20Preorder%20Traversal.md)
