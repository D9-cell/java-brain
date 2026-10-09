---
topic: Line Sweep
pattern: [Line sweep, Max overlap]
source: LeetCode 253 / GFG
difficulty: Medium
companies: [Amazon, Uber, Meta]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, line-sweep]
---
# Meeting Rooms II

> [!TIP]
> **🧠 Memory hook**
> A hotel receptionist counts room keys out (+1) and returned (−1). The most keys out at once = rooms needed.
> **Mantra: MAX OVERLAP = ROOMS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Line%20Sweep/Line%20Sweep%20Animations.html#p=5) · **Pattern hub:** [Line Sweep - Pattern Map](Line%20Sweep%20-%20Pattern%20Map.md)

## Problem
Given meeting start and end times, return the minimum number of rooms needed.

## Key insight
Rooms needed = maximum number of simultaneous meetings = maximum running sum of +1/−1 events.

## Approach: TreeMap sweep
```java
// +1 at start, -1 at end; the highest running count is the number of rooms needed
public int minMeetingRooms(int[] start, int[] end) {
    TreeMap<Integer, Integer> events = new TreeMap<>();
    for (int i = 0; i < start.length; i++) {
        events.merge(start[i], 1, Integer::sum);
        events.merge(end[i], -1, Integer::sum);
    }
    int busy = 0, rooms = 0;
    for (int d : events.values()) {
        busy += d;
        rooms = Math.max(rooms, busy);
    }
    return rooms;
}
```

| Approach | Time | Space |
|---|---|---|
| TreeMap sweep | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Meeting ends at 10, another starts at 10?</summary>

They share a room: both deltas merge into key 10 and cancel.

</details>


<details><summary>Heap alternative?</summary>

Sort by start; a min-heap of end times; pop if the earliest end ≤ the current start.

</details>


## Connected
- Online version: [My Calendar III](My%20Calendar%20III.md)
- [Car Pooling](Car%20Pooling.md)
