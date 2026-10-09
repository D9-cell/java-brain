---
topic: Line Sweep
pattern: [Difference array, Sorted events]
source: LeetCode 1854
difficulty: Easy
companies: [Amazon, Adobe, Goldman Sachs, Atlassian]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, line-sweep]
---
# Maximum Population Year

> [!TIP]
> **🧠 Memory hook**
> A census clicker: +1 at a birth, −1 at a death; the first year with the highest count wins.
> **Mantra: BIRTH +1, DEATH −1, FIRST MAX**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Line%20Sweep/Line%20Sweep%20Animations.html#p=3) · **Pattern hub:** [Line Sweep - Pattern Map](Line%20Sweep%20-%20Pattern%20Map.md)

## Problem
`logs[i] = [birth, death]`; a person is alive in `[birth, death − 1]`. Return the earliest year with the maximum population.

## Key insight
Alive on the half-open range [birth, death), so −1 goes at `death`. Use strict `>` to keep the earliest year.

## Approach 1: Difference array over 1950..2050
```java
// Approach 1: difference array over years 1950..2050, first year with the max running count
public int maximumPopulation(int[][] logs) {
    int[] diff = new int[2051];
    for (int[] l : logs) {
        diff[l[0]]++;
        diff[l[1]]--;
    }
    int best = 0, alive = 0, year = 1950;
    for (int y = 1950; y <= 2050; y++) {
        alive += diff[y];
        if (alive > best) { best = alive; year = y; }
    }
    return year;
}
```

## Approach 2: Sorted events (death before birth on ties)
```java
// Approach 2: sort (year, +1/-1) events; at equal years the death (-1) comes first
public int maximumPopulationEvents(int[][] logs) {
    int[][] ev = new int[logs.length * 2][];
    int k = 0;
    for (int[] l : logs) {
        ev[k++] = new int[]{l[0], 1};
        ev[k++] = new int[]{l[1], -1};
    }
    Arrays.sort(ev, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
    int best = 0, alive = 0, year = 0;
    for (int[] e : ev) {
        alive += e[1];
        if (alive > best) { best = alive; year = e[0]; }
    }
    return year;
}
```

| Approach | Time | Space |
|---|---|---|
| Difference array over 1950..2050 | O(n + 100) | O(100) |
| Sorted events (death before birth on ties) | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Tie-break when sorting events?</summary>

Smaller delta first: −1 before +1 in the same year.

</details>


<details><summary>Why strict `>`?</summary>

To keep the earliest year on ties.

</details>


## Connected
- [Car Pooling](Car%20Pooling.md)
