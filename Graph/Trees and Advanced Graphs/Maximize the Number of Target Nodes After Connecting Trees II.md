---
topic: Trees and Advanced Graphs
pattern: [Parity, Tree colouring]
source: LeetCode 3373
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Maximize the Number of Target Nodes After Connecting Trees II

> [!TIP]
> **🧠 Memory hook**
> In a tree, "even distance" is just "same colour": colour the tree like a chessboard and count.
> **Mantra: EVEN DISTANCE = SAME COLOUR; ATTACH FOR THE BIGGER OTHER CLASS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=3) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Same setup, but a target is a node at even distance from i (counting through the new edge).

## Key insight
Distance parity in a tree is the 2-colouring parity. Within tree 1, targets of i are its own colour class. Through the new edge, nodes of tree 2 at odd distance from the attached node become even, so attach where the larger colour class is on the odd side.

## Approach: Colouring and counts
```java
// tree 2 contributes the nodes at odd distance from the attached node, so pick the bigger colour class of tree 2
public int[] maxTargetNodes(int[][] edges1, int[][] edges2) {
    int[] color1 = colour(edges1), color2 = colour(edges2);
    int[] count1 = new int[2], count2 = new int[2];
    for (int c : color1) count1[c]++;
    for (int c : color2) count2[c]++;
    int bestSecond = Math.max(count2[0], count2[1]);
    int[] result = new int[color1.length];
    for (int i = 0; i < result.length; i++) result[i] = count1[color1[i]] + bestSecond;
    return result;
}

// Two-colours a tree by BFS depth parity
private int[] colour(int[][] edges) {
    int n = edges.length + 1;
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    int[] color = new int[n];
    Arrays.fill(color, -1);
    color[0] = 0;
    Queue<Integer> que = new ArrayDeque<>(List.of(0));
    while (!que.isEmpty()) {
        int u = que.poll();
        for (int v : adj.get(u)) if (color[v] == -1) { color[v] = 1 - color[u]; que.add(v); }
    }
    return color;
}
```

| Approach | Time | Space |
|---|---|---|
| Colouring and counts | O(n + m) | O(n + m) |

> [!WARNING]
> **Java gotcha**
> Needs both trees to have at least two nodes (as constraints guarantee), so both colour classes are non-empty.

## Recall before you reveal
<details><summary>Why does parity equal colour?</summary>

Each edge flips the colour, and distance counts edges.

</details>


<details><summary>Why take the max of the two classes of tree 2?</summary>

Choosing the attachment node decides which class lands at even distance.

</details>


## Connected
- [Maximize the Number of Target Nodes After Connecting Trees I](Maximize%20the%20Number%20of%20Target%20Nodes%20After%20Connecting%20Trees%20I.md)
- [Is Graph Bipartite](../Graph%20Basics/Is%20Graph%20Bipartite.md)
