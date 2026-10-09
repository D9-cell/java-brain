---
topic: Trees and Advanced Graphs
pattern: [Time-ordered BFS, Union-Find, Dijkstra]
source: LeetCode 2092
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Find All People With Secret

> [!TIP]
> **🧠 Memory hook**
> A rumour spreads instantly inside one hour, but never backwards in time.
> **Mantra: SORT BY TIME; SPREAD INSIDE EACH TIME SLOT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=19) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Persons 0 and firstPerson share a secret. Meetings (x, y, time) pass it on instantly. Return everyone who eventually knows it.

## Key insight
Process meetings in time order. Within one time slot the secret may chain through several meetings, so spread it with a BFS from the people who already know it. Alternatively Union-Find with an undo for people who did not get the secret, or a Dijkstra that tracks the earliest time each person learns it.

## Approach 1: BFS per time slot
```java
// Time order with BFS: inside one time slot spread the secret from the people who already know it
public List<Integer> findAllPeopleBfs(int n, int[][] meetings, int firstPerson) {
    int[][] sorted = meetings.clone();
    Arrays.sort(sorted, (a, b) -> a[2] - b[2]);
    boolean[] knows = new boolean[n];
    knows[0] = knows[firstPerson] = true;
    int i = 0;
    while (i < sorted.length) {
        int j = i;
        Map<Integer, List<Integer>> adj = new HashMap<>();
        while (j < sorted.length && sorted[j][2] == sorted[i][2]) {
            adj.computeIfAbsent(sorted[j][0], k -> new ArrayList<>()).add(sorted[j][1]);
            adj.computeIfAbsent(sorted[j][1], k -> new ArrayList<>()).add(sorted[j][0]);
            j++;
        }
        Queue<Integer> que = new ArrayDeque<>();
        for (int p : adj.keySet()) if (knows[p]) que.add(p);
        while (!que.isEmpty()) {
            int u = que.poll();
            for (int v : adj.get(u)) if (!knows[v]) { knows[v] = true; que.add(v); }
        }
        i = j;
    }
    List<Integer> res = new ArrayList<>();
    for (int p = 0; p < n; p++) if (knows[p]) res.add(p);
    return res;
}
```

## Approach 2: Union-Find with reset
```java
// Time order with Union-Find: union a whole time slot, then undo the unions of people who still do not know the secret
public List<Integer> findAllPeopleDsu(int n, int[][] meetings, int firstPerson) {
    int[][] sorted = meetings.clone();
    Arrays.sort(sorted, (a, b) -> a[2] - b[2]);
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    parent[find(parent, firstPerson)] = find(parent, 0);
    int i = 0;
    while (i < sorted.length) {
        int j = i;
        while (j < sorted.length && sorted[j][2] == sorted[i][2]) j++;
        for (int t = i; t < j; t++) parent[find(parent, sorted[t][0])] = find(parent, sorted[t][1]);
        for (int t = i; t < j; t++) {
            if (find(parent, sorted[t][0]) != find(parent, 0)) { parent[sorted[t][0]] = sorted[t][0]; parent[sorted[t][1]] = sorted[t][1]; }
        }
        i = j;
    }
    List<Integer> res = new ArrayList<>();
    for (int p = 0; p < n; p++) if (find(parent, p) == find(parent, 0)) res.add(p);
    return res;
}

// Root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

## Approach 3: Earliest-time Dijkstra
```java
// Earliest-time Dijkstra: a person learns the secret at the earliest time they can get it, and may pass it on at any meeting not earlier than that
public List<Integer> findAllPeopleHeap(int n, int[][] meetings, int firstPerson) {
    List<List<int[]>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] m : meetings) { adj.get(m[0]).add(new int[]{m[1], m[2]}); adj.get(m[1]).add(new int[]{m[0], m[2]}); }
    int[] earliest = new int[n];
    Arrays.fill(earliest, Integer.MAX_VALUE);
    earliest[0] = earliest[firstPerson] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    pq.add(new int[]{0, 0});
    pq.add(new int[]{firstPerson, 0});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        if (top[1] > earliest[top[0]]) continue;
        for (int[] e : adj.get(top[0])) {
            if (e[1] >= top[1] && e[1] < earliest[e[0]]) {
                earliest[e[0]] = e[1];
                pq.add(new int[]{e[0], e[1]});
            }
        }
    }
    List<Integer> res = new ArrayList<>();
    for (int i = 0; i < n; i++) if (earliest[i] != Integer.MAX_VALUE) res.add(i);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS per time slot | O(M log M) | O(M) |
| Union-Find with reset | O(M log M · α) | O(n) |
| Earliest-time Dijkstra | O(M log M) | O(n + M) |

## Recall before you reveal
<details><summary>Why group by time?</summary>

Meetings at the same time can chain; meetings at different times cannot go backwards.

</details>


<details><summary>What must the DSU do after a slot?</summary>

Detach people not connected to person 0, so they do not carry a false link into later slots.

</details>


## Connected
- [Network Delay Time](../Shortest%20Paths/Network%20Delay%20Time.md)
- [Number of Connected Components in an Undirected Graph](../Graph%20Basics/Number%20of%20Connected%20Components%20in%20an%20Undirected%20Graph.md)
