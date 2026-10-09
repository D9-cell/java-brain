---
topic: Trees and Advanced Graphs
pattern: [Tree DP, Two best children]
source: LeetCode 2246
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Longest Path With Different Adjacent Characters

> [!TIP]
> **🧠 Memory hook**
> A path bends at most once, so at each node join the two tallest chains that do not clash with the node's letter.
> **Mantra: TOP TWO VALID CHILD CHAINS + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=7) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
A tree is given by parent[] and each node has a letter. Return the length (in nodes) of the longest path with no two adjacent equal letters.

## Key insight
For every node, the best path bending there uses its two longest child chains whose first letter differs from its own. Return only the single longest chain upward, because a path cannot branch twice.

## Approach: DFS with top-two chains
```java
// DFS: at each node join its two longest child chains whose first letter differs from the node's letter
public int longestPath(int[] parent, String s) {
    int n = parent.length;
    List<List<Integer>> children = new ArrayList<>();
    for (int i = 0; i < n; i++) children.add(new ArrayList<>());
    for (int i = 1; i < n; i++) children.get(parent[i]).add(i);
    int[] best = {1};
    chain(children, 0, s, best);
    return best[0];
}

// Returns the longest downward chain starting at u and updates the best path that bends at u
private int chain(List<List<Integer>> children, int u, String s, int[] best) {
    int top1 = 0, top2 = 0;
    for (int v : children.get(u)) {
        int len = chain(children, v, s, best);
        if (s.charAt(v) == s.charAt(u)) continue;
        if (len > top1) { top2 = top1; top1 = len; }
        else if (len > top2) top2 = len;
    }
    best[0] = Math.max(best[0], top1 + top2 + 1);
    return top1 + 1;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS with top-two chains | O(n) | O(n) |

## Recall before you reveal
<details><summary>Why return only one chain upward?</summary>

A path through the parent can use only one side of the child.

</details>


<details><summary>What if a child has the same letter?</summary>

Skip its chain but still process its own subtree.

</details>


## Connected
- [Tree Diameter](Tree%20Diameter.md)
