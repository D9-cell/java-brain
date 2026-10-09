---
topic: Design
pattern: [Queue + set + binary search]
source: LeetCode 3508
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Implement Router

> [!TIP]
> **🧠 Memory hook**
> A post office: a conveyor belt, a duplicate register and a sorted logbook per destination.
> **Mantra: QUEUE + SET + SORTED TIMES WITH START INDEX**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=20) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
addPacket (reject duplicates, evict the oldest when full), forwardPacket (FIFO), getCount(destination, start, end).

## Key insight
Timestamps arrive in non-decreasing order, so each destination's list is sorted; forwarded packets are always a prefix → keep a start index instead of deleting.

## Approach: Queue + set + per-destination lists
```java
// FIFO queue of packets + duplicate set + per-destination timestamp list (with a moving start index)
static class Router {
    private final int limit;
    private final ArrayDeque<int[]> queue = new ArrayDeque<>();
    private final Set<String> seen = new HashSet<>();
    private final Map<Integer, List<Integer>> times = new HashMap<>();
    private final Map<Integer, Integer> start = new HashMap<>();

    Router(int memoryLimit) { limit = memoryLimit; }

    // Unique key of a packet
    private static String key(int s, int d, int t) { return s + "," + d + "," + t; }

    // Reject duplicates; evict the oldest when full; record the timestamp
    public boolean addPacket(int source, int destination, int timestamp) {
        if (!seen.add(key(source, destination, timestamp))) return false;
        if (queue.size() == limit) forwardPacket();
        queue.offerLast(new int[]{source, destination, timestamp});
        times.computeIfAbsent(destination, k -> new ArrayList<>()).add(timestamp);
        return true;
    }

    // Pop the oldest packet; its timestamp is the first live one of its destination
    public int[] forwardPacket() {
        if (queue.isEmpty()) return new int[0];
        int[] p = queue.pollFirst();
        seen.remove(key(p[0], p[1], p[2]));
        start.merge(p[1], 1, Integer::sum);
        return p;
    }

    // First index >= from with list value >= key
    private static int lowerBound(List<Integer> a, int from, int key) {
        int lo = from, hi = a.size();
        while (lo < hi) { int m = (lo + hi) >>> 1; if (a.get(m) < key) lo = m + 1; else hi = m; }
        return lo;
    }

    // Timestamps arrive in order, so the live part of the list is sorted: two binary searches
    public int getCount(int destination, int startTime, int endTime) {
        List<Integer> a = times.get(destination);
        if (a == null) return 0;
        int s = start.getOrDefault(destination, 0);
        return lowerBound(a, s, endTime + 1) - lowerBound(a, s, startTime);
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Queue + set + per-destination lists | add/forward O(1), count O(log n) | O(limit) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Why a start index?</summary>

Deleting from the front of an ArrayList is O(n).

</details>

