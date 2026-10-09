---
topic: Disjoint Set
pattern: [Union-Find, In-degree, BFS]
source: LeetCode 1361
difficulty: Medium
companies: [Meta]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Validate Binary Tree Nodes

> [!TIP]
> **🧠 Memory hook**
> A valid family tree: one ancestor, nobody with two parents, no loops, everyone connected.
> **Mantra: ONE PARENT EACH; NO CYCLE; ONE COMPONENT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=14) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Given leftChild and rightChild arrays, do all n nodes form exactly one valid binary tree?

## Key insight
Check three facts: no node has two parents, no link closes a cycle, and everything is one component. Union-Find tests all three while linking parent to child. Alternatively find the unique in-degree-0 root and BFS from it, requiring every node to be reached exactly once.

## Approach 1: Union-Find
```java
// Union-Find: a node may have only one parent, and linking a parent to a child must never join two nodes already connected (cycle); at the end there is one component
public boolean validateBinaryTreeNodesDsu(int n, int[] leftChild, int[] rightChild) {
    int[] parent = new int[n], hasParent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int components = n;
    for (int u = 0; u < n; u++) {
        for (int child : new int[]{leftChild[u], rightChild[u]}) {
            if (child == -1) continue;
            if (hasParent[child] == 1) return false;
            hasParent[child] = 1;
            int a = find(parent, u), b = find(parent, child);
            if (a == b) return false;
            parent[b] = a;
            components--;
        }
    }
    return components == 1;
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

## Approach 2: Root + BFS
```java
// Find the single node without a parent, then BFS from it: every node must be reached exactly once
public boolean validateBinaryTreeNodesBfs(int n, int[] leftChild, int[] rightChild) {
    int[] indegree = new int[n];
    for (int i = 0; i < n; i++) {
        if (leftChild[i] != -1) indegree[leftChild[i]]++;
        if (rightChild[i] != -1) indegree[rightChild[i]]++;
    }
    int root = -1;
    for (int i = 0; i < n; i++) {
        if (indegree[i] > 1) return false;
        if (indegree[i] == 0) { if (root != -1) return false; root = i; }
    }
    if (root == -1) return false;
    boolean[] seen = new boolean[n];
    Queue<Integer> que = new ArrayDeque<>(List.of(root));
    seen[root] = true;
    int count = 1;
    while (!que.isEmpty()) {
        int u = que.poll();
        for (int c : new int[]{leftChild[u], rightChild[u]}) {
            if (c == -1) continue;
            if (seen[c]) return false;
            seen[c] = true;
            count++;
            que.add(c);
        }
    }
    return count == n;
}
```

| Approach | Time | Space |
|---|---|---|
| Union-Find | O(n α) | O(n) |
| Root + BFS | O(n) | O(n) |

## Recall before you reveal
<details><summary>How does the DSU spot a cycle?</summary>

Linking parent to child when both are already in one set closes a loop.

</details>


<details><summary>Why check the number of roots?</summary>

Two roots mean two separate trees (a forest).

</details>


## Connected
- [Detect Cycle in a Directed Graph](../Graph%20Basics/Detect%20Cycle%20in%20a%20Directed%20Graph.md)
