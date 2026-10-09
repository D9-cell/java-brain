---
topic: Recursion
pattern: [DFS on the digit tree]
source: LeetCode 386
difficulty: Medium
companies: [Bloomberg]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Lexicographical Numbers

> [!TIP]
> **🧠 Memory hook**
> A dictionary of numbers: go as deep as possible (1, 10, 100…) before moving to a sibling.
> **Mantra: PRE-ORDER DIGIT TREE, ROOTS 1..9**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=10) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Return 1..n in lexicographic order in O(n) time and O(1) extra space.

## Key insight
Numbers form a 10-ary tree (children of x are x0..x9). The pre-order traversal is lexicographic order.

## Approach: DFS
```java
// Pre-order DFS on the 10-ary "digit tree": visit curr, then curr*10 .. curr*10+9
private void dfs(int curr, int n, List<Integer> out) {
    if (curr > n) return;
    out.add(curr);
    for (int d = 0; d <= 9; d++) {
        int next = curr * 10 + d;
        if (next > n) return;
        dfs(next, n, out);
    }
}

// Roots are 1..9
public List<Integer> lexicalOrder(int n) {
    List<Integer> out = new ArrayList<>();
    for (int d = 1; d <= 9; d++) dfs(d, n, out);
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS | O(n) | O(log n) |

## Recall before you reveal
<details><summary>Why `return` (not continue) when next > n?</summary>

Larger digits are even larger.

</details>


## Connected
- [K-th Smallest in Lexicographical Order](K-th%20Smallest%20in%20Lexicographical%20Order.md)
