---
topic: Graph Basics
pattern: [DFS, BFS, HashMap]
source: LeetCode 133
difficulty: Medium
companies: [Google, Facebook, Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Clone Graph

> [!TIP]
> **🧠 Memory hook**
> Photocopying a city map: keep a list of "original → copy" so a road leading back to an old junction reuses its copy.
> **Mantra: MAP ORIGINAL → CLONE; REGISTER BEFORE RECURSING**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=8) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Return a deep copy of a connected undirected graph given one node.

## Key insight
Register the clone in the map **before** visiting neighbours. Then a cycle finds the existing clone instead of recursing forever.

## Approach 1: DFS with a map
```java
// DFS: map each original node to its clone before recursing, so cycles reuse the clone
public Node cloneGraphDfs(Node node) {
    if (node == null) return null;
    return dfs(node, new HashMap<>());
}

// Returns the clone of node, creating it and its neighbours on first sight
private Node dfs(Node node, Map<Node, Node> clones) {
    if (clones.containsKey(node)) return clones.get(node);
    Node copy = new Node(node.val);
    clones.put(node, copy);
    for (Node next : node.neighbors) copy.neighbors.add(dfs(next, clones));
    return copy;
}
```

## Approach 2: BFS with a map
```java
// BFS: clone a node when first seen, wire the clone's neighbours when the original is dequeued
public Node cloneGraphBfs(Node node) {
    if (node == null) return null;
    Map<Node, Node> clones = new HashMap<>();
    clones.put(node, new Node(node.val));
    Queue<Node> que = new ArrayDeque<>();
    que.add(node);
    while (!que.isEmpty()) {
        Node curr = que.poll();
        for (Node next : curr.neighbors) {
            if (!clones.containsKey(next)) {
                clones.put(next, new Node(next.val));
                que.add(next);
            }
            clones.get(curr).neighbors.add(clones.get(next));
        }
    }
    return clones.get(node);
}
```

| Approach | Time | Space |
|---|---|---|
| DFS with a map | O(V + E) | O(V) |
| BFS with a map | O(V + E) | O(V) |

## Recall before you reveal
<details><summary>Why a HashMap<Node, Node>?</summary>

It is both the visited set and the lookup of the clone.

</details>


<details><summary>What goes wrong if you register after recursing?</summary>

A cycle recurses forever.

</details>


## Connected
- [Number of Provinces](Number%20of%20Provinces.md)
