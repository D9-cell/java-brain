---
topic: Design
pattern: [HashMaps]
source: LeetCode 1396
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design Underground System

> [!TIP]
> **🧠 Memory hook**
> A travel diary: remember check-ins; on check-out add the trip to the route total.
> **Mantra: id → (station, t); ROUTE → (total, count)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=16) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
checkIn, checkOut, getAverageTime(start, end).

## Key insight
Keep only aggregates per route: total time and trip count.

## Approach: Two maps
```java
// id → (station, time) while travelling; "A->B" → [totalTime, trips]
static class UndergroundSystem {
    private final Map<Integer, Object[]> inside = new HashMap<>();
    private final Map<String, long[]> stats = new HashMap<>();

    // Remember where and when the passenger entered
    public void checkIn(int id, String station, int t) { inside.put(id, new Object[]{station, t}); }

    // Close the trip and add it to the route's totals
    public void checkOut(int id, String station, int t) {
        Object[] in = inside.remove(id);
        long[] s = stats.computeIfAbsent(in[0] + "->" + station, k -> new long[2]);
        s[0] += t - (int) in[1];
        s[1]++;
    }

    // Average = total / trips
    public double getAverageTime(String start, String end) {
        long[] s = stats.get(start + "->" + end);
        return (double) s[0] / s[1];
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Two maps | O(1) | O(passengers + routes) |

## Recall before you reveal
<details><summary>Why not store every trip?</summary>

The average only needs sum and count.

</details>

