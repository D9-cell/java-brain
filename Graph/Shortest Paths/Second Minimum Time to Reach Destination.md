---
topic: Shortest Paths
pattern: [BFS with two distances, Traffic lights]
source: LeetCode 2045
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Second Minimum Time to Reach Destination

> [!TIP]
> **🧠 Memory hook**
> The second best route may not be a different path, only a longer count of edges: keep two distances per node.
> **Mantra: FIRST AND SECOND DISTINCT EDGE COUNTS, THEN CLOCK IT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=14) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Edges take `time` minutes and signals flip every `change` minutes. Return the second smallest (strictly larger) time to reach node n.

## Key insight
Time grows with the number of edges walked, so find the smallest and second smallest distinct edge counts to node n with a BFS keeping two values per node. Then simulate that many edges with the red-light waits.

## Approach 1: BFS with two distances, then clock
```java
// BFS keeping the two smallest distinct edge counts per node; then convert that many edges into real time with the signals
public int secondMinimum(int n, int[][] edges, int time, int change) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    int[] first = new int[n + 1], second = new int[n + 1];
    Arrays.fill(first, Integer.MAX_VALUE);
    Arrays.fill(second, Integer.MAX_VALUE);
    first[1] = 0;
    Queue<int[]> que = new ArrayDeque<>();
    que.add(new int[]{1, 0});
    while (!que.isEmpty() && second[n] == Integer.MAX_VALUE) {
        int[] cur = que.poll();
        for (int v : adj.get(cur[0])) {
            int steps = cur[1] + 1;
            if (steps < first[v]) { first[v] = steps; que.add(new int[]{v, steps}); }
            else if (steps > first[v] && steps < second[v]) { second[v] = steps; que.add(new int[]{v, steps}); }
        }
    }
    return clock(second[n], time, change);
}

// Walks the given number of edges, waiting at red lights
private int clock(int edgeCount, int time, int change) {
    int t = 0;
    for (int i = 0; i < edgeCount; i++) {
        if ((t / change) % 2 == 1) t = (t / change + 1) * change;
        t += time;
    }
    return t;
}
```

## Approach 2: Dijkstra on times
```java
// Dijkstra directly on arrival times, keeping the two smallest distinct times per node
public int secondMinimumDijkstra(int n, int[][] edges, int time, int change) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
    int[] first = new int[n + 1], second = new int[n + 1];
    Arrays.fill(first, Integer.MAX_VALUE);
    Arrays.fill(second, Integer.MAX_VALUE);
    first[1] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.add(new int[]{0, 1});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int t = top[0], u = top[1];
        int depart = (t / change) % 2 == 1 ? (t / change + 1) * change : t;
        for (int v : adj.get(u)) {
            int arrive = depart + time;
            if (arrive < first[v]) { first[v] = arrive; pq.add(new int[]{arrive, v}); }
            else if (arrive > first[v] && arrive < second[v]) { second[v] = arrive; pq.add(new int[]{arrive, v}); }
        }
    }
    return second[n];
}
```

| Approach | Time | Space |
|---|---|---|
| BFS with two distances, then clock | O(V + E) | O(V + E) |
| Dijkstra on times | O(E log V) | O(V + E) |

## Recall before you reveal
<details><summary>Why a strict second?</summary>

The problem wants a strictly larger time than the minimum.

</details>


<details><summary>Why can the second path reuse nodes?</summary>

Walking an edge back and forth adds 2 edges, which is usually the second best.

</details>


## Connected
- [Network Delay Time](Network%20Delay%20Time.md)
