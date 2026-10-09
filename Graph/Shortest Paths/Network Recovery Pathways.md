---
topic: Shortest Paths
pattern: [Binary search on answer, Dijkstra]
source: LeetCode 3620
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Network Recovery Pathways

> [!TIP]
> **🧠 Memory hook**
> Raise the bar on the weakest link until no affordable route clears it.
> **Mantra: BINARY SEARCH THE MIN EDGE; DIJKSTRA FOR THE BUDGET**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=18) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
DAG with online/offline nodes. A path's score is its cheapest edge; its total cost must be ≤ k. Return the maximum score among valid paths, or −1.

## Key insight
Feasibility "exists a path with all edges ≥ s and total cost ≤ k" is monotone in s, so binary search s. For each s run Dijkstra on online nodes using only edges with cost ≥ s and compare the cheapest total with k.

## Approach: Binary search + Dijkstra
```java
// Binary search the score s: is there an online path from 0 to n - 1 using only edges of cost at least s whose total cost is at most k?
public int findMaxPathScore(int[][] edges, boolean[] online, long k) {
    int n = online.length;
    List<List<int[]>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    int low = Integer.MAX_VALUE, high = 0;
    for (int[] e : edges) {
        if (!online[e[0]] || !online[e[1]]) continue;
        adj.get(e[0]).add(new int[]{e[1], e[2]});
        low = Math.min(low, e[2]);
        high = Math.max(high, e[2]);
    }
    int answer = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (feasible(mid, n, k, adj)) { answer = mid; low = mid + 1; }
        else high = mid - 1;
    }
    return answer;
}

// Dijkstra over edges of cost at least minEdge: is the cheapest total at most k?
private boolean feasible(int minEdge, int n, long k, List<List<int[]>> adj) {
    long[] dist = new long[n];
    Arrays.fill(dist, Long.MAX_VALUE);
    dist[0] = 0;
    PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
    pq.add(new long[]{0, 0});
    while (!pq.isEmpty()) {
        long[] top = pq.poll();
        int u = (int) top[1];
        if (top[0] > k) return false;
        if (u == n - 1) return true;
        if (top[0] > dist[u]) continue;
        for (int[] e : adj.get(u)) {
            if (e[1] < minEdge) continue;
            if (top[0] + e[1] < dist[e[0]]) { dist[e[0]] = top[0] + e[1]; pq.add(new long[]{dist[e[0]], e[0]}); }
        }
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + Dijkstra | O(E log V · log W) | O(V + E) |

## Recall before you reveal
<details><summary>Why is it monotone?</summary>

Raising s only removes edges, so feasibility can only get worse.

</details>


<details><summary>Why Dijkstra?</summary>

We need the cheapest total cost among the allowed edges.

</details>


## Connected
- [Path With Minimum Effort](Path%20With%20Minimum%20Effort.md)
- [Minimize the Maximum Edge Weight of Graph](../Trees%20and%20Advanced%20Graphs/Minimize%20the%20Maximum%20Edge%20Weight%20of%20Graph.md)
