---
topic: Grid and BFS
pattern: [BFS on routes]
source: LeetCode 815
difficulty: Hard
companies: [Google, Uber]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, grid-bfs]
---
# Bus Routes

> [!TIP]
> **🧠 Memory hook**
> You pay per bus, not per stop: riding a bus is free until you step off.
> **Mantra: BOARDING A BUS = ONE EDGE TO ALL ITS STOPS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Grid%20and%20BFS/Grid%20and%20BFS%20Animations.html#p=20) · **Pattern hub:** [Grid and BFS - Pattern Map](Grid%20and%20BFS%20-%20Pattern%20Map.md)

## Problem
routes[i] lists the stops bus i loops over. Return the fewest buses from source to target, or −1.

## Key insight
Index which buses pass each stop. Then BFS where one level = one more bus: from a stop, board every unused bus there, and all stops on that bus join the next level. Marking buses (not just stops) as used keeps it linear.

## Approach 1: BFS on stops with a bus index
```java
// BFS where a node is a bus, not a stop: boarding a bus visits all its stops, and each stop leads to the other buses through it
public int numBusesToDestination(int[][] routes, int source, int target) {
    if (source == target) return 0;
    Map<Integer, List<Integer>> busesAt = new HashMap<>();
    for (int b = 0; b < routes.length; b++) for (int stop : routes[b]) busesAt.computeIfAbsent(stop, k -> new ArrayList<>()).add(b);
    Set<Integer> usedBus = new HashSet<>(), usedStop = new HashSet<>(List.of(source));
    Queue<Integer> que = new ArrayDeque<>(List.of(source));
    int buses = 0;
    while (!que.isEmpty()) {
        buses++;
        for (int size = que.size(); size > 0; size--) {
            int stop = que.poll();
            for (int bus : busesAt.getOrDefault(stop, List.of())) {
                if (!usedBus.add(bus)) continue;
                for (int next : routes[bus]) {
                    if (next == target) return buses;
                    if (usedStop.add(next)) que.add(next);
                }
            }
        }
    }
    return -1;
}
```

## Approach 2: BFS on the graph of buses
```java
// BFS over the graph of buses (two buses are linked when they share a stop)
public int numBusesToDestinationRouteGraph(int[][] routes, int source, int target) {
    if (source == target) return 0;
    int n = routes.length;
    List<Set<Integer>> stops = new ArrayList<>();
    for (int[] r : routes) { Set<Integer> s = new HashSet<>(); for (int x : r) s.add(x); stops.add(s); }
    int[] dist = new int[n];
    Arrays.fill(dist, -1);
    Queue<Integer> que = new ArrayDeque<>();
    for (int b = 0; b < n; b++) if (stops.get(b).contains(source)) { dist[b] = 1; que.add(b); }
    while (!que.isEmpty()) {
        int b = que.poll();
        if (stops.get(b).contains(target)) return dist[b];
        for (int o = 0; o < n; o++) {
            if (dist[o] != -1) continue;
            for (int x : stops.get(b)) if (stops.get(o).contains(x)) { dist[o] = dist[b] + 1; que.add(o); break; }
        }
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| BFS on stops with a bus index | O(total stops) | O(total stops) |
| BFS on the graph of buses | O(R² · S) | O(R · S) |

## Recall before you reveal
<details><summary>Why not BFS on stops alone?</summary>

Moving along one bus would cost one level per stop instead of one per bus.

</details>


<details><summary>Why track used buses?</summary>

A bus whose stops were all added already adds nothing new.

</details>


## Connected
- [Word Ladder](Word%20Ladder.md)
