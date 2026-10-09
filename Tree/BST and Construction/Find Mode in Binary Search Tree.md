---
topic: BST and Construction
pattern: [Inorder, Run length of equal keys]
source: LeetCode 501
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Find Mode in Binary Search Tree

> [!TIP]
> **🧠 Memory hook**
> Equal keys are **neighbours** in inorder, so count runs.
> **Mantra: RUN LENGTH ON THE INORDER STREAM**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=10) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
Return the most frequent key(s) of a BST that may contain duplicates.

## Key insight
Walk inorder with `prev`, the current run length and the best run length. A longer run clears the answer list; an equal run appends to it.

## Approach 1: Run counting, O(1) extra
```java
// Equal keys are adjacent in inorder, so count runs with a previous value and keep the longest run(s)
public int[] findMode(TreeNode root) {
    List<Integer> modes = new ArrayList<>();
    int[] st = {Integer.MIN_VALUE, 0, 0, 0};
    walk(root, st, modes);
    return modes.stream().mapToInt(Integer::intValue).toArray();
}

// st = {previous value, current run length, best run length, has previous}
private void walk(TreeNode n, int[] st, List<Integer> modes) {
    if (n == null) return;
    walk(n.left, st, modes);
    st[1] = st[3] == 1 && n.val == st[0] ? st[1] + 1 : 1;
    st[0] = n.val;
    st[3] = 1;
    if (st[1] > st[2]) { st[2] = st[1]; modes.clear(); }
    if (st[1] == st[2]) modes.add(n.val);
    walk(n.right, st, modes);
}
```

## Approach 2: Hash map
```java
// Plain hash map count
public int[] findModeMap(TreeNode root) {
    Map<Integer, Integer> cnt = new TreeMap<>();
    for (int v : TreeNode.inorder(root)) cnt.merge(v, 1, Integer::sum);
    int max = 0;
    for (int c : cnt.values()) max = Math.max(max, c);
    List<Integer> res = new ArrayList<>();
    for (Map.Entry<Integer, Integer> e : cnt.entrySet()) if (e.getValue() == max) res.add(e.getKey());
    return res.stream().mapToInt(Integer::intValue).toArray();
}
```

| Approach | Time | Space |
|---|---|---|
| Run counting, O(1) extra | O(n) | O(h) |
| Hash map | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why `clear` when a longer run appears?</summary>

The earlier candidates are no longer most frequent.

</details>


## Connected
- [Minimum Absolute Difference in BST](Minimum%20Absolute%20Difference%20in%20BST.md)
