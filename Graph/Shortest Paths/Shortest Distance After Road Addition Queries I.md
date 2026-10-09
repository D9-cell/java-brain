---
topic: Shortest Paths
pattern: [BFS per query, Dijkstra]
source: LeetCode 3243
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Shortest Distance After Road Addition Queries I

> [!TIP]
> **🧠 Memory hook**
> A highway of one-way shortcuts: after each new one, re-measure the trip.
> **Mantra: ADD EDGE, RE-RUN BFS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=15) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Cities 0..n − 1 are in a line (i → i + 1). Each query adds a road u → v. After each query return the shortest distance from 0 to n − 1.

## Key insight
All edges have length 1, so a BFS after each query is enough (the constraints allow it). Dijkstra works too but is overkill. (Later versions of the problem need smarter structures.)

## Approach 1: BFS per query
```java
// After each query run a BFS from 0 on the unit-weight graph and record the distance to n - 1
public int[] shortestDistanceAfterQueriesBfs(int n, int[][] queries) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int i = 0; i + 1 < n; i++) adj.get(i).add(i + 1);
    int[] answer = new int[queries.length];
    for (int q = 0; q < queries.length; q++) {
        adj.get(queries[q][0]).add(queries[q][1]);
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        Queue<Integer> que = new ArrayDeque<>(List.of(0));
        dist[0] = 0;
        while (!que.isEmpty()) {
            int u = que.poll();
            for (int v : adj.get(u)) if (dist[v] == -1) { dist[v] = dist[u] + 1; que.add(v); }
        }
        answer[q] = dist[n - 1];
    }
    return answer;
}
```

## Approach 2: Dijkstra per query
```java
// Same idea with Dijkstra (weights are all 1, so this is only for comparison)
public int[] shortestDistanceAfterQueriesDijkstra(int n, int[][] queries) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int i = 0; i + 1 < n; i++) adj.get(i).add(i + 1);
    int[] answer = new int[queries.length];
    for (int q = 0; q < queries.length; q++) {
        adj.get(queries[q][0]).add(queries[q][1]);
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[0] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.add(new int[]{0, 0});
        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            if (top[0] > dist[top[1]]) continue;
            for (int v : adj.get(top[1])) if (top[0] + 1 < dist[v]) { dist[v] = top[0] + 1; pq.add(new int[]{dist[v], v}); }
        }
        answer[q] = dist[n - 1];
    }
    return answer;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS per query | O(Q · (n + Q)) | O(n + Q) |
| Dijkstra per query | O(Q · (n + Q) log n) | O(n + Q) |

## Recall before you reveal
<details><summary>Why BFS is enough?</summary>

Unit weights.

</details>


<details><summary>Does the distance only ever decrease?</summary>

Yes, adding edges cannot lengthen the shortest path.

</details>


## Connected
- [Dijkstra's Algorithm](Dijkstra%27s%20Algorithm.md)
