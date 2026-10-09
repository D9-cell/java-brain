---
topic: Line Sweep
pattern: [Line sweep, Difference array]
source: LeetCode 1094
difficulty: Medium
companies: [ClearTrip, Goldman Sachs]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, line-sweep]
---
# Car Pooling

> [!TIP]
> **🧠 Memory hook**
> A bus conductor writes "+2 at km 1, −2 at km 5". Reading the notebook in order gives the passenger count everywhere.
> **Mantra: + AT START, − AT END, RUNNING SUM ≤ CAP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Line%20Sweep/Line%20Sweep%20Animations.html#p=0) · **Pattern hub:** [Line Sweep - Pattern Map](Line%20Sweep%20-%20Pattern%20Map.md)

## Problem
`trips[i] = [numPassengers, from, to]`. The car only drives east. Can it serve all trips without exceeding `capacity`?

## Key insight
The passenger count only changes at pickups and drop-offs. Store those deltas, then sweep in order of location.

## Approach 1: TreeMap events
```java
// Approach 1: +count at pickup, -count at drop in a TreeMap, then sweep in order
public boolean carPoolingMap(int[][] trips, int capacity) {
    TreeMap<Integer, Integer> events = new TreeMap<>();
    for (int[] t : trips) {
        events.merge(t[1], t[0], Integer::sum);
        events.merge(t[2], -t[0], Integer::sum);
    }
    int inCar = 0;
    for (int delta : events.values()) {
        inCar += delta;
        if (inCar > capacity) return false;
    }
    return true;
}
```

## Approach 2: Difference array (locations ≤ 1000)
```java
// Approach 2: same idea with a difference array, since locations are at most 1000
public boolean carPooling(int[][] trips, int capacity) {
    int[] diff = new int[1001];
    for (int[] t : trips) {
        diff[t[1]] += t[0];
        diff[t[2]] -= t[0];
    }
    int inCar = 0;
    for (int d : diff) {
        inCar += d;
        if (inCar > capacity) return false;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| TreeMap events | O(n log n) | O(n) |
| Difference array (locations ≤ 1000) | O(n + 1000) | O(1000) |

## Recall before you reveal
<details><summary>Where does the minus go: `to` or `to+1`?</summary>

`to`: passengers are already out at `to`.

</details>


<details><summary>When do you prefer the array?</summary>

When the coordinate range is small and known.

</details>


## Connected
- Same sweep: [Meeting Rooms II](Meeting%20Rooms%20II.md), [My Calendar III](My%20Calendar%20III.md)
