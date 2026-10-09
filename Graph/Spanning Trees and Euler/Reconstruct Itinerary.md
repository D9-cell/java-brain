---
topic: Spanning Trees and Euler
pattern: [Euler path, Hierholzer, Lexicographic order]
source: LeetCode 332
difficulty: Hard
companies: [Google, Uber, Facebook]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, spanning-euler]
---
# Reconstruct Itinerary

> [!TIP]
> **🧠 Memory hook**
> Spend tickets smallest first; the airport where you get stuck goes last, and the rest is spliced in front.
> **Mantra: SMALLEST TICKET FIRST; ADD AIRPORT TO THE FRONT AFTER ALL ITS TICKETS ARE USED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Spanning%20Trees%20and%20Euler/Spanning%20Trees%20and%20Euler%20Animations.html#p=7) · **Pattern hub:** [Spanning Trees and Euler - Pattern Map](Spanning%20Trees%20and%20Euler%20-%20Pattern%20Map.md)

## Problem
Tickets [from, to]. Use every ticket exactly once starting at JFK and return the lexicographically smallest itinerary.

## Key insight
It is an Euler path in a directed multigraph. Keep each airport's destinations in a min-heap. Recursively visit the smallest destination until an airport has no tickets, then add that airport to the front of the route. Dead ends end up at the back, which is exactly where they belong.

## Approach: Hierholzer with sorted destinations
```java
// Hierholzer with the smallest destination tried first: a city is added to the answer once it has no tickets left, and the answer is reversed
public List<String> findItinerary(List<List<String>> tickets) {
    Map<String, PriorityQueue<String>> adj = new HashMap<>();
    for (List<String> t : tickets) adj.computeIfAbsent(t.get(0), k -> new PriorityQueue<>()).add(t.get(1));
    LinkedList<String> route = new LinkedList<>();
    visit("JFK", adj, route);
    return route;
}

// Spends every ticket out of airport, then puts the airport at the front of the route
private void visit(String airport, Map<String, PriorityQueue<String>> adj, LinkedList<String> route) {
    PriorityQueue<String> out = adj.get(airport);
    while (out != null && !out.isEmpty()) visit(out.poll(), adj, route);
    route.addFirst(airport);
}
```

| Approach | Time | Space |
|---|---|---|
| Hierholzer with sorted destinations | O(E log E) | O(E) |

## Recall before you reveal
<details><summary>Why not greedy smallest-first with a simple path?</summary>

It can use the ticket that leads to a dead end too early and strand other tickets.

</details>


<details><summary>Why addFirst?</summary>

Airports are finalised from the end of the trip backwards.

</details>


## Connected
- [Valid Arrangement of Pairs](Valid%20Arrangement%20of%20Pairs.md)
