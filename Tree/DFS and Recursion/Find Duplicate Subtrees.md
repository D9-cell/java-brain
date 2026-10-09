---
topic: DFS and Recursion
pattern: [Fingerprint subtrees, Hash map of serializations]
source: LeetCode 652
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Find Duplicate Subtrees

> [!TIP]
> **🧠 Memory hook**
> Give every subtree a **fingerprint**; the second time one appears, it is a duplicate.
> **Mantra: SERIALIZE, COUNT, REPORT AT 2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=25) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Return one root of every group of duplicate subtrees (same structure and values).

## Key insight
Serialize each subtree in post-order with null markers. A map counts the strings and reports the node when the count becomes exactly 2. Replacing strings by small integer ids makes each step O(1).

## Approach 1: String keys
```java
// Serialize every subtree as "left,val,right"; the second time a string shows up, report that node once
public List<TreeNode> findDuplicateSubtrees(TreeNode root) {
    Map<String, Integer> seen = new HashMap<>();
    List<TreeNode> res = new ArrayList<>();
    serialize(root, seen, res);
    return res;
}

// Postorder string with markers for null so different shapes never collide
private String serialize(TreeNode n, Map<String, Integer> seen, List<TreeNode> res) {
    if (n == null) return "#";
    String key = "(" + serialize(n.left, seen, res) + "," + n.val + "," + serialize(n.right, seen, res) + ")";
    if (seen.merge(key, 1, Integer::sum) == 2) res.add(n);
    return key;
}
```

## Approach 2: Integer ids
```java
// Same idea with small integer ids instead of long strings, so each node costs O(1)
public List<TreeNode> findDuplicateSubtreesIds(TreeNode root) {
    Map<String, Integer> ids = new HashMap<>();
    Map<Integer, Integer> count = new HashMap<>();
    List<TreeNode> res = new ArrayList<>();
    idOf(root, ids, count, res);
    return res;
}

// Returns the id of the subtree, creating a new id for each unseen (left id, value, right id) triple
private int idOf(TreeNode n, Map<String, Integer> ids, Map<Integer, Integer> count, List<TreeNode> res) {
    if (n == null) return 0;
    String triple = idOf(n.left, ids, count, res) + "," + n.val + "," + idOf(n.right, ids, count, res);
    int id = ids.computeIfAbsent(triple, k -> ids.size() + 1);
    if (count.merge(id, 1, Integer::sum) == 2) res.add(n);
    return id;
}
```

| Approach | Time | Space |
|---|---|---|
| String keys | O(n²) | O(n²) |
| Integer ids | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why report at count == 2?</summary>

So a shape appearing three times is still reported once.

</details>


<details><summary>Why null markers?</summary>

Without them different shapes can serialize to the same text.

</details>


## Connected
- [Subtree of Another Tree](Subtree%20of%20Another%20Tree.md)
- [Flip Equivalent Binary Trees](Flip%20Equivalent%20Binary%20Trees.md)
