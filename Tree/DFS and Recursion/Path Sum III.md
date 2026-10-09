---
topic: DFS and Recursion
pattern: [Prefix sums on a tree, Hash map with backtracking]
source: LeetCode 437
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Path Sum III

> [!TIP]
> **🧠 Memory hook**
> Treat the root path like an array and use the **prefix-sum trick** from Subarray Sum Equals K.
> **Mantra: COUNT prefix − target, THEN ADD prefix**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/DFS%20and%20Recursion/DFS%20and%20Recursion%20Animations.html#p=15) · **Pattern hub:** [DFS and Recursion - Pattern Map](DFS%20and%20Recursion%20-%20Pattern%20Map.md)

## Problem
Count downward paths (starting and ending anywhere) whose values add up to the target.

## Key insight
A path ending here sums to `target` when an earlier prefix on the same root path equals `prefix - target`. Keep a map of prefix counts and remove the current prefix when leaving the node.

## Approach 1: Prefix sums + map
```java
// Prefix sums on the root path: a downward path ending here sums to target when prefix - target was seen above
public int pathSum(TreeNode root, int target) {
    Map<Long, Integer> seen = new HashMap<>();
    seen.put(0L, 1);
    return dfs(root, 0, target, seen);
}

// Counts paths ending at or below n; the map is restored on the way back up
private int dfs(TreeNode n, long prefix, int target, Map<Long, Integer> seen) {
    if (n == null) return 0;
    prefix += n.val;
    int count = seen.getOrDefault(prefix - target, 0);
    seen.merge(prefix, 1, Integer::sum);
    count += dfs(n.left, prefix, target, seen) + dfs(n.right, prefix, target, seen);
    seen.merge(prefix, -1, Integer::sum);
    return count;
}
```

## Approach 2: Start at every node
```java
// O(n^2) version: start a downward sum at every node
public int pathSumSlow(TreeNode root, int target) {
    if (root == null) return 0;
    return from(root, target) + pathSumSlow(root.left, target) + pathSumSlow(root.right, target);
}

// Number of downward paths starting at n with the given sum
private int from(TreeNode n, long remain) {
    if (n == null) return 0;
    return (n.val == remain ? 1 : 0) + from(n.left, remain - n.val) + from(n.right, remain - n.val);
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix sums + map | O(n) | O(h) |
| Start at every node | O(n²) worst | O(h) |

> [!WARNING]
> **Java gotcha**
> Use `long` prefixes, values can reach the int limit. Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why remove the prefix after the recursion?</summary>

Siblings must not see prefixes from a different branch.

</details>


<details><summary>Why seed the map with {0: 1}?</summary>

It lets a path that starts at the root count.

</details>


## Connected
- [Path Sum II](Path%20Sum%20II.md)
