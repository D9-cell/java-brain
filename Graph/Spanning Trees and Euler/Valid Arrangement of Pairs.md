---
topic: Spanning Trees and Euler
pattern: [Euler path, Hierholzer, Directed graph]
source: LeetCode 2097
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, spanning-euler]
---
# Valid Arrangement of Pairs

> [!TIP]
> **🧠 Memory hook**
> Domino chain: line up the pieces so each piece's right end matches the next piece's left end.
> **Mantra: START AT out − in = 1; WALK UNTIL STUCK; REVERSE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Spanning%20Trees%20and%20Euler/Spanning%20Trees%20and%20Euler%20Animations.html#p=6) · **Pattern hub:** [Spanning Trees and Euler - Pattern Map](Spanning%20Trees%20and%20Euler%20-%20Pattern%20Map.md)

## Problem
Each pair [start, end] is an edge. Rearrange all pairs into one chain where each pair's end equals the next pair's start. An arrangement is guaranteed to exist.

## Key insight
It is an Euler path in a directed graph. Start at the node with out-degree − in-degree = 1 (any node if it is a circuit). Hierholzer: push the start, repeatedly follow an unused edge; when a node has no unused edge, pop it into the answer. The reversed answer is the path.

## Approach 1: Iterative Hierholzer (stack)
```java
// Hierholzer's algorithm for an Euler path in a directed graph, iterative: follow unused edges with a stack and emit nodes as they get stuck
public int[][] validArrangement(int[][] pairs) {
    Map<Integer, Deque<Integer>> adj = new HashMap<>();
    Map<Integer, Integer> balance = new HashMap<>();
    for (int[] p : pairs) {
        adj.computeIfAbsent(p[0], k -> new ArrayDeque<>()).add(p[1]);
        balance.merge(p[0], 1, Integer::sum);
        balance.merge(p[1], -1, Integer::sum);
    }
    int start = pairs[0][0];
    for (Map.Entry<Integer, Integer> e : balance.entrySet()) if (e.getValue() == 1) { start = e.getKey(); break; }
    Deque<Integer> stack = new ArrayDeque<>();
    List<Integer> path = new ArrayList<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        int u = stack.peek();
        Deque<Integer> out = adj.get(u);
        if (out != null && !out.isEmpty()) stack.push(out.poll());
        else path.add(stack.pop());
    }
    Collections.reverse(path);
    int[][] result = new int[pairs.length][];
    for (int i = 0; i + 1 < path.size(); i++) result[i] = new int[]{path.get(i), path.get(i + 1)};
    return result;
}
```

## Approach 2: Recursive Hierholzer
```java
// Recursive Hierholzer: append a node after all its outgoing edges are used
public int[][] validArrangementRecursive(int[][] pairs) {
    Map<Integer, Deque<Integer>> adj = new HashMap<>();
    Map<Integer, Integer> balance = new HashMap<>();
    for (int[] p : pairs) {
        adj.computeIfAbsent(p[0], k -> new ArrayDeque<>()).add(p[1]);
        balance.merge(p[0], 1, Integer::sum);
        balance.merge(p[1], -1, Integer::sum);
    }
    int start = pairs[0][0];
    for (Map.Entry<Integer, Integer> e : balance.entrySet()) if (e.getValue() == 1) { start = e.getKey(); break; }
    List<Integer> path = new ArrayList<>();
    visit(start, adj, path);
    Collections.reverse(path);
    int[][] result = new int[pairs.length][];
    for (int i = 0; i + 1 < path.size(); i++) result[i] = new int[]{path.get(i), path.get(i + 1)};
    return result;
}

// Uses every edge out of u, then records u
private void visit(int u, Map<Integer, Deque<Integer>> adj, List<Integer> path) {
    Deque<Integer> out = adj.get(u);
    while (out != null && !out.isEmpty()) visit(out.poll(), adj, path);
    path.add(u);
}
```

| Approach | Time | Space |
|---|---|---|
| Iterative Hierholzer (stack) | O(V + E) | O(V + E) |
| Recursive Hierholzer | O(V + E) | O(V + E) |

> [!WARNING]
> **Java gotcha**
> Recursion depth equals the number of edges (10⁵), which can overflow the Java stack; prefer the iterative form.

## Recall before you reveal
<details><summary>Why reverse?</summary>

Nodes are finalised from the end of the path backwards.

</details>


<details><summary>Why start at out − in = 1?</summary>

In an Euler path that is the starting vertex.

</details>


## Connected
- [Reconstruct Itinerary](Reconstruct%20Itinerary.md)
