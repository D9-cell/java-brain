---
topic: Trees and Advanced Graphs
pattern: [Tree DFS, Counting]
source: LeetCode 1519
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Number of Nodes in the Sub-Tree With the Same Label

> [!TIP]
> **🧠 Memory hook**
> Every node reports a tally of letters to its parent; its own answer is the tally of its own letter.
> **Mantra: RETURN A 26-LETTER COUNT UPWARD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=9) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Each node has a lowercase label. For each node return how many nodes in its subtree have the same label.

## Key insight
A DFS returns the letter counts of its subtree; the node merges its children's arrays and reads its own letter. Counting in one bottom-up pass is O(26 · n).

## Approach: DFS with letter counts
```java
// DFS returns a 26-letter count array for each subtree; the answer for a node is its own letter's count
public int[] countSubTrees(int n, int[][] edges, String labels) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    int[] result = new int[n];
    dfs(adj, 0, -1, labels, result);
    return result;
}

// Merges the children's letter counts into u's and records u's own letter count
private int[] dfs(List<List<Integer>> adj, int u, int parent, String labels, int[] result) {
    int[] count = new int[26];
    count[labels.charAt(u) - 'a']++;
    for (int v : adj.get(u)) {
        if (v == parent) continue;
        int[] child = dfs(adj, v, u, labels, result);
        for (int c = 0; c < 26; c++) count[c] += child[c];
    }
    result[u] = count[labels.charAt(u) - 'a'];
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS with letter counts | O(26 · n) | O(26 · n) |

## Recall before you reveal
<details><summary>What does each call return?</summary>

An int[26] with the letter counts of its subtree.

</details>


<details><summary>Why not a global count array?</summary>

The counts must be per subtree.

</details>


## Connected
- [Check If Two Nodes Are On Same Path In A Graph](../Graph%20Basics/Check%20If%20Two%20Nodes%20Are%20On%20Same%20Path%20In%20A%20Graph.md)
