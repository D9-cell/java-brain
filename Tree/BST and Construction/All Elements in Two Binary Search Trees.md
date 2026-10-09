---
topic: BST and Construction
pattern: [Inorder, Merge two sorted streams]
source: LeetCode 1305
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# All Elements in Two Binary Search Trees

> [!TIP]
> **🧠 Memory hook**
> Two sorted lists hiding in two trees: **merge them**.
> **Mantra: INORDER BOTH, MERGE LIKE MERGE SORT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=6) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Return all keys of two BSTs in ascending order.

## Key insight
Inorder gives each tree as a sorted list. Merge the lists, or merge lazily with two stacks holding the left spines.

## Approach 1: Lists + merge
```java
// Two sorted inorder lists merged like in merge sort
public List<Integer> getAllElements(TreeNode a, TreeNode b) {
    List<Integer> x = TreeNode.inorder(a), y = TreeNode.inorder(b), res = new ArrayList<>();
    int i = 0, j = 0;
    while (i < x.size() || j < y.size()) {
        if (j == y.size() || (i < x.size() && x.get(i) <= y.get(j))) res.add(x.get(i++)); else res.add(y.get(j++));
    }
    return res;
}
```

## Approach 2: Two stacks
```java
// Lazy merge: two stacks hold the left spines and the smaller top is taken each time
public List<Integer> getAllElementsStacks(TreeNode a, TreeNode b) {
    Deque<TreeNode> s1 = new ArrayDeque<>(), s2 = new ArrayDeque<>();
    List<Integer> res = new ArrayList<>();
    push(s1, a);
    push(s2, b);
    while (!s1.isEmpty() || !s2.isEmpty()) {
        Deque<TreeNode> from = s2.isEmpty() || (!s1.isEmpty() && s1.peek().val <= s2.peek().val) ? s1 : s2;
        TreeNode n = from.pop();
        res.add(n.val);
        push(from, n.right);
    }
    return res;
}

// Pushes the left spine of n
private void push(Deque<TreeNode> st, TreeNode n) { for (; n != null; n = n.left) st.push(n); }
```

| Approach | Time | Space |
|---|---|---|
| Lists + merge | O(n + m) | O(n + m) |
| Two stacks | O(n + m) | O(h1 + h2) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why does the lazy version use less memory?</summary>

It only stores a path from the root per tree, not all the keys.

</details>


## Connected
- [Binary Search Tree Iterator](Binary%20Search%20Tree%20Iterator.md)
- [Merge Two Sorted Lists](../../Linked%20List/Merge%20Two%20Sorted%20Lists.md)
