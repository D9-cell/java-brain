---
topic: Trees and Advanced Graphs
pattern: [Tree DFS, Two walkers]
source: LeetCode 2467
difficulty: Medium
companies: [Intuit]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Most Profitable Path in a Tree

> [!TIP]
> **🧠 Memory hook**
> Bob races to the root first and has already looted the gates he passed; Alice picks the best leaf.
> **Mantra: BOB'S TIMES FIRST, THEN ALICE'S BEST ROOT-TO-LEAF**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=4) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Alice starts at 0 and walks to a leaf; Bob starts at node bob and walks to 0, one edge per second. A gate's price is split if both arrive together and paid fully only by the first arrival. Maximise Alice's net income.

## Key insight
Bob's route is fixed (the path to 0), so record his arrival time per node. Then DFS Alice along every root-to-leaf path carrying her income: full amount if she is strictly earlier, half if equal, nothing if Bob was earlier.

## Approach 1: DFS for Bob, DFS for Alice
```java
// DFS for Bob's arrival times along his way to 0, then DFS for Alice over every root-to-leaf path
public int mostProfitablePathDfs(int[][] edges, int bob, int[] amount) {
    int n = amount.length;
    List<List<Integer>> adj = build(n, edges);
    int[] bobTime = new int[n];
    Arrays.fill(bobTime, Integer.MAX_VALUE);
    bobWalk(adj, bob, -1, 0, bobTime);
    return alice(adj, 0, -1, 0, 0, bobTime, amount);
}

// Returns true when the walk from u reaches node 0, stamping Bob's time on the nodes of that path
private boolean bobWalk(List<List<Integer>> adj, int u, int parent, int time, int[] bobTime) {
    if (u == 0) { bobTime[u] = time; return true; }
    for (int v : adj.get(u)) {
        if (v != parent && bobWalk(adj, v, u, time + 1, bobTime)) { bobTime[u] = time; return true; }
    }
    return false;
}

// Best income Alice can collect from u downward to a leaf, splitting the price when both arrive together
private int alice(List<List<Integer>> adj, int u, int parent, int time, int income, int[] bobTime, int[] amount) {
    if (time < bobTime[u]) income += amount[u];
    else if (time == bobTime[u]) income += amount[u] / 2;
    int best = Integer.MIN_VALUE;
    for (int v : adj.get(u)) if (v != parent) best = Math.max(best, alice(adj, v, u, time + 1, income, bobTime, amount));
    return best == Integer.MIN_VALUE ? income : best;
}
```

## Approach 2: DFS for Bob, BFS for Alice
```java
// Same Bob pass, then BFS for Alice carrying (node, income) in the queue
public int mostProfitablePathBfs(int[][] edges, int bob, int[] amount) {
    int n = amount.length;
    List<List<Integer>> adj = build(n, edges);
    int[] bobTime = new int[n], parent = new int[n];
    Arrays.fill(bobTime, Integer.MAX_VALUE);
    Arrays.fill(parent, -1);
    Queue<Integer> que = new ArrayDeque<>(List.of(0));
    boolean[] seen = new boolean[n];
    seen[0] = true;
    while (!que.isEmpty()) {
        int u = que.poll();
        for (int v : adj.get(u)) if (!seen[v]) { seen[v] = true; parent[v] = u; que.add(v); }
    }
    for (int x = bob, t = 0; x != -1; x = parent[x], t++) bobTime[x] = t;
    int best = Integer.MIN_VALUE;
    Queue<int[]> q = new ArrayDeque<>();
    q.add(new int[]{0, 0, 0, -1});
    while (!q.isEmpty()) {
        int[] c = q.poll();
        int u = c[0], time = c[1], income = c[2];
        if (time < bobTime[u]) income += amount[u];
        else if (time == bobTime[u]) income += amount[u] / 2;
        boolean leaf = true;
        for (int v : adj.get(u)) if (v != c[3]) { leaf = false; q.add(new int[]{v, time + 1, income, u}); }
        if (leaf) best = Math.max(best, income);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS for Bob, DFS for Alice | O(n) | O(n) |
| DFS for Bob, BFS for Alice | O(n) | O(n) |

## Recall before you reveal
<details><summary>Why is Bob's route unique?</summary>

In a tree there is exactly one path to 0.

</details>


<details><summary>What if a gate is reached by Alice later?</summary>

It is already open (Bob took it), so Alice pays or gains nothing.

</details>


## Connected
- [Tree Diameter](Tree%20Diameter.md)
