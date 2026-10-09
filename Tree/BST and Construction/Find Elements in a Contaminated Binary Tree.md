---
topic: BST and Construction
pattern: [Recompute values, Heap-style numbering]
source: LeetCode 1261
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, tree]
---
# Find Elements in a Contaminated Binary Tree

> [!TIP]
> **🧠 Memory hook**
> The clean tree has a rule: root 0, left `2x+1`, right `2x+2`. **Replay the rule**.
> **Mantra: REPLAY 2x+1 / 2x+2, STORE IN A SET**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Tree/BST%20and%20Construction/BST%20and%20Construction%20Animations.html#p=19) · **Pattern hub:** [BST and Construction - Pattern Map](BST%20and%20Construction%20-%20Pattern%20Map.md)

## Problem
All values were set to −1. Recover them and support `find(target)`.

## Key insight
DFS once, assigning values by the rule and storing them in a hash set. A zero-memory variant follows the binary digits of `target + 1` (after the leading 1) from the root: 0 → left, 1 → right.

## Approach 1: Recover + hash set
```java
// Recover values (root 0, left 2x+1, right 2x+2) into a hash set once, then answer find() in O(1)
static class FindElements {
    private final Set<Integer> seen = new HashSet<>();

    FindElements(TreeNode root) { recover(root, 0); }

    // Writes the clean value into every node and remembers it
    private void recover(TreeNode n, int v) {
        if (n == null) return;
        n.val = v;
        seen.add(v);
        recover(n.left, 2 * v + 1);
        recover(n.right, 2 * v + 2);
    }

    // True if some node holds the target value
    boolean find(int target) { return seen.contains(target); }
}
```

## Approach 2: Bit path of target + 1
```java
// No extra memory: the bits of target + 1 (after the leading 1) spell the path from the root
static class FindElementsPath {
    private final TreeNode root;

    FindElementsPath(TreeNode root) { this.root = root; }

    // Walks left for a 0 bit and right for a 1 bit
    boolean find(int target) {
        long t = (long) target + 1;
        TreeNode cur = root;
        for (int bit = 62 - Long.numberOfLeadingZeros(t); bit >= 0 && cur != null; bit--) cur = ((t >> bit) & 1) == 0 ? cur.left : cur.right;
        return cur != null;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Recover + hash set | O(n) build, O(1) find | O(n) |
| Bit path of target + 1 | O(log t) find | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on random trees when it was written.

## Recall before you reveal
<details><summary>Why `target + 1`?</summary>

With the +1 shift, `2x+1` and `2x+2` become the heap indexes `2y` and `2y+1`, whose bits spell the path.

</details>


## Connected
- [Maximum Width of Binary Tree](../Traversals%20and%20Views/Maximum%20Width%20of%20Binary%20Tree.md)
