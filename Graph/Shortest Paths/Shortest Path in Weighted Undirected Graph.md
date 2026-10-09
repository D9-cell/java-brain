---
topic: Shortest Paths
pattern: [Dijkstra, Path reconstruction]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Shortest Path in Weighted Undirected Graph

> [!TIP]
> **🧠 Memory hook**
> Leave a note "I came from here" at every node; read the notes backwards to print the route.
> **Mantra: parent[v] = u ON EVERY IMPROVEMENT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=1) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Print the shortest path from node 1 to node n (or −1 if unreachable).

## Key insight
Run Dijkstra and set parent[v] = u whenever dist[v] improves. Walk parents from n back to 1 and reverse.

## Approach: Dijkstra with parents
```java
// Dijkstra that remembers each node's parent on its best route, then walks the parents back from n
public List<Integer> shortestPath(int n, int[][] edges) {
    List<List<int[]>> adj = new ArrayList<>();
    for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(new int[]{e[1], e[2]}); adj.get(e[1]).add(new int[]{e[0], e[2]}); }
    long[] dist = new long[n + 1];
    Arrays.fill(dist, Long.MAX_VALUE);
    int[] parent = new int[n + 1];
    for (int i = 1; i <= n; i++) parent[i] = i;
    dist[1] = 0;
    PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
    pq.add(new long[]{0, 1});
    while (!pq.isEmpty()) {
        long[] top = pq.poll();
        int u = (int) top[1];
        if (top[0] > dist[u]) continue;
        for (int[] e : adj.get(u)) {
            if (top[0] + e[1] < dist[e[0]]) {
                dist[e[0]] = top[0] + e[1];
                parent[e[0]] = u;
                pq.add(new long[]{dist[e[0]], e[0]});
            }
        }
    }
    if (dist[n] == Long.MAX_VALUE) return List.of(-1);
    LinkedList<Integer> path = new LinkedList<>();
    for (int x = n; ; x = parent[x]) {
        path.addFirst(x);
        if (parent[x] == x) break;
    }
    return path;
}
```

| Approach | Time | Space |
|---|---|---|
| Dijkstra with parents | O(E log V) | O(V + E) |

## Recall before you reveal
<details><summary>Why is the parent array correct?</summary>

Each time a node is improved, its parent is overwritten, so at the end it holds the node of the last (best) improvement.

</details>


<details><summary>Unreachable?</summary>

dist[n] stays infinite: return [−1].

</details>


## Connected
- [Dijkstra's Algorithm](Dijkstra%27s%20Algorithm.md)
