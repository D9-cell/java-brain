---
topic: DFS and Recursion
pattern: [Two trees together, Match a list downward]
source: LeetCode 1367
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Linked List in Binary Tree

> [!TIP]
> **🧠 Memory hook**
> Try to **lay the list along a downward path**, starting at every node.
> **Mantra: EVERY NODE IS A START, THEN MATCH DOWN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=37) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Does the linked list appear as a downward path in the binary tree?

## Key insight
For each tree node try to match the list from its head going down either child. A KMP-style failure table avoids restarting from scratch.

## Approach 1: Try every start
```java
// Try to start the match at every tree node
public boolean isSubPath(ListNode head, TreeNode root) {
    if (root == null) return false;
    return match(head, root) || isSubPath(head, root.left) || isSubPath(head, root.right);
}

// The list must continue straight down from this node
private boolean match(ListNode l, TreeNode n) {
    if (l == null) return true;
    if (n == null || n.val != l.val) return false;
    return match(l.next, n.left) || match(l.next, n.right);
}
```

## Approach 2: KMP along each path
```java
// KMP: run the failure table of the list along every root-to-leaf path, with state rollback on return
public boolean isSubPathKmp(ListNode head, TreeNode root) {
    List<Integer> pat = new ArrayList<>();
    for (ListNode c = head; c != null; c = c.next) pat.add(c.val);
    int[] fail = new int[pat.size()];
    for (int i = 1, k = 0; i < pat.size(); i++) {
        while (k > 0 && !pat.get(i).equals(pat.get(k))) k = fail[k - 1];
        if (pat.get(i).equals(pat.get(k))) k++;
        fail[i] = k;
    }
    return walk(root, 0, pat, fail);
}

// Moves the KMP state down the tree; each branch starts again from the state of its parent
private boolean walk(TreeNode n, int k, List<Integer> pat, int[] fail) {
    if (n == null) return false;
    while (k > 0 && n.val != pat.get(k)) k = fail[k - 1];
    if (n.val == pat.get(k)) k++;
    if (k == pat.size()) return true;
    return walk(n.left, k, pat, fail) || walk(n.right, k, pat, fail);
}
```

| Approach | Time | Space |
|---|---|---|
| Try every start | O(n · L) | O(h) |
| KMP along each path | O(n + L) | O(h + L) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why does the KMP version pass the state down?</summary>

Each branch continues from the matched length of its parent, so shared prefixes are not rescanned.

</details>


## Connected
- [Subtree of Another Tree](Subtree%20of%20Another%20Tree.md)
- [Linked List](../../Linked%20List/Linked%20List%20-%20Pattern%20Map.md)
