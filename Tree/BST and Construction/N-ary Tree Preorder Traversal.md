---
topic: BST and Construction
pattern: [Preorder, Reverse push]
source: LeetCode 589
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# N-ary Tree Preorder Traversal

> [!TIP]
> **🧠 Memory hook**
> Node first, then **each child in order**.
> **Mantra: NODE, THEN CHILDREN; STACK PUSHES CHILDREN REVERSED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=21) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Return the preorder traversal of an N-ary tree.

## Key insight
Recursive: add the value, then recurse over the children list. Iterative: push the children in reverse order so the leftmost child is popped first.

## Approach 1: Recursive
```java
// Preorder, recursive
public List<Integer> preorder(Node root) {
    List<Integer> res = new ArrayList<>();
    pre(root, res);
    return res;
}

// Node first, then children left to right
private void pre(Node n, List<Integer> res) {
    if (n == null) return;
    res.add(n.val);
    for (Node c : n.children) pre(c, res);
}
```

## Approach 2: Stack
```java
// Preorder with a stack: push children in reverse so the leftmost is popped first
public List<Integer> preorderIterative(Node root) {
    List<Integer> res = new ArrayList<>();
    Deque<Node> st = new ArrayDeque<>();
    if (root != null) st.push(root);
    while (!st.isEmpty()) {
        Node cur = st.pop();
        res.add(cur.val);
        for (int i = cur.children.size() - 1; i >= 0; i--) st.push(cur.children.get(i));
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive | O(n) | O(h) |
| Stack | O(n) | O(h) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why push children in reverse?</summary>

A stack pops the last pushed item first.

</details>


## Connected
- [N-ary Tree Level Order Traversal](N-ary%20Tree%20Level%20Order%20Traversal.md)
- [Maximum Depth of N-ary Tree](Maximum%20Depth%20of%20N-ary%20Tree.md)
