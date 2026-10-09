---
topic: LCA Distance and Tree Graphs
pattern: [Root of an edge list, Sum / XOR trick]
source: LeetCode 1506
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Find Root of N-Ary Tree

> [!TIP]
> **🧠 Memory hook**
> Every node except the root shows up as somebody's child, so **count appearances**.
> **Mantra: ROOT = ALL NODES − ALL CHILDREN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/LCA%20Distance%20and%20Tree%20Graphs/LCA%20Distance%20and%20Tree%20Graphs%20Animations.html#p=10) · **Pattern hub:** [LCA Distance and Tree Graphs - Pattern Map](LCA%20Distance%20and%20Tree%20Graphs%20-%20Pattern%20Map.md)

## Problem
You receive all nodes of an N-ary tree in arbitrary order. Return the root.

## Key insight
Add every node value once and subtract every child value: only the root value remains. XOR does the same without overflow, and a set of children works too.

## Approach 1: Sum difference
```java
// The root is the only node that is never a child: sum of all values minus sum of children values
public Node findRoot(List<Node> tree) {
    long sum = 0;
    for (Node n : tree) {
        sum += n.val;
        for (Node c : n.children) sum -= c.val;
    }
    for (Node n : tree) if (n.val == sum) return n;
    return null;
}
```

## Approach 2: XOR
```java
// Same idea with XOR, which cannot overflow
public Node findRootXor(List<Node> tree) {
    int x = 0;
    for (Node n : tree) {
        x ^= n.val;
        for (Node c : n.children) x ^= c.val;
    }
    for (Node n : tree) if (n.val == x) return n;
    return null;
}
```

## Approach 3: Set of children
```java
// Set of nodes that appear as a child; the root is the one missing
public Node findRootSet(List<Node> tree) {
    Set<Node> kids = new HashSet<>();
    for (Node n : tree) kids.addAll(n.children);
    for (Node n : tree) if (!kids.contains(n)) return n;
    return null;
}
```

| Approach | Time | Space |
|---|---|---|
| Sum difference | O(n) | O(1) |
| XOR | O(n) | O(1) |
| Set of children | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why is O(1) space possible?</summary>

Only a running sum or xor is stored.

</details>


<details><summary>When does the sum version break?</summary>

If values are not unique or the sum overflows; XOR needs unique values too.

</details>


## Connected
- [Create Binary Tree From Descriptions](Create%20Binary%20Tree%20From%20Descriptions.md)
