---
topic: Trees and Advanced Graphs
pattern: [Binary search on answer, Reverse graph, Minimax Dijkstra]
source: LeetCode 3419
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Minimize the Maximum Edge Weight of Graph

> [!TIP]
> **🧠 Memory hook**
> Lower the ceiling on road weights until some node can no longer find its way to the capital.
> **Mantra: BINARY SEARCH w; REVERSED BFS FROM 0 USING EDGES ≤ w**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=21) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Delete edges so that every node can still reach node 0 (and each node keeps at most `threshold` outgoing edges). Minimise the heaviest remaining edge.

## Key insight
Feasibility is monotone in the weight limit w: if everyone reaches 0 with edges ≤ w, they do with any bigger w. Check it by BFS from 0 on the reversed graph restricted to edges ≤ w. (The threshold never binds: a BFS tree uses one outgoing edge per node.) Equivalent: Dijkstra where a path costs its heaviest edge.

## Approach 1: Binary search + reversed BFS
```java
// Binary search the answer w: can every node reach 0 using only edges of weight at most w? Check on the reversed graph from 0
public int minMaxWeight(int n, int[][] edges, int threshold) {
    List<List<int[]>> rev = new ArrayList<>();
    for (int i = 0; i < n; i++) rev.add(new ArrayList<>());
    int maxWeight = 0;
    for (int[] e : edges) { rev.get(e[1]).add(new int[]{e[0], e[2]}); maxWeight = Math.max(maxWeight, e[2]); }
    int low = 0, high = maxWeight, answer = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (reachesAll(rev, n, mid)) { answer = mid; high = mid - 1; }
        else low = mid + 1;
    }
    return answer;
}

// BFS from node 0 on reversed edges no heavier than limit
private boolean reachesAll(List<List<int[]>> rev, int n, int limit) {
    boolean[] seen = new boolean[n];
    Queue<Integer> que = new ArrayDeque<>(List.of(0));
    seen[0] = true;
    int count = 1;
    while (!que.isEmpty()) {
        int u = que.poll();
        for (int[] e : rev.get(u)) if (e[1] <= limit && !seen[e[0]]) { seen[e[0]] = true; count++; que.add(e[0]); }
    }
    return count == n;
}
```

## Approach 2: Minimax Dijkstra
```java
// Minimax Dijkstra: the cost of reaching a node is the heaviest edge on the best path, so no binary search is needed
public int minMaxWeightDijkstra(int n, int[][] edges, int threshold) {
    List<List<int[]>> rev = new ArrayList<>();
    for (int i = 0; i < n; i++) rev.add(new ArrayList<>());
    for (int[] e : edges) rev.get(e[1]).add(new int[]{e[0], e[2]});
    int[] cost = new int[n];
    Arrays.fill(cost, Integer.MAX_VALUE);
    cost[0] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    pq.add(new int[]{0, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (top[1] > cost[top[0]]) continue;
        for (int[] e : rev.get(top[0])) {
            int c = Math.max(top[1], e[1]);
            if (c < cost[e[0]]) { cost[e[0]] = c; pq.add(new int[]{e[0], c}); }
        }
    }
    int ans = 0;
    for (int c : cost) { if (c == Integer.MAX_VALUE) return -1; ans = Math.max(ans, c); }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + reversed BFS | O((V + E) log W) | O(V + E) |
| Minimax Dijkstra | O(E log V) | O(V + E) |

## Recall before you reveal
<details><summary>Why reverse the edges?</summary>

"Everyone reaches 0" becomes "0 reaches everyone".

</details>


<details><summary>What is the minimax Dijkstra cost?</summary>

The maximum edge weight along the path, using max instead of sum.

</details>


## Connected
- [Path With Minimum Effort](../Shortest%20Paths/Path%20With%20Minimum%20Effort.md)
- [Network Delay Time](../Shortest%20Paths/Network%20Delay%20Time.md)
