---
topic: Line Sweep
pattern: [Difference array]
source: LeetCode 1109
difficulty: Medium
companies: [Goldman Sachs]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, line-sweep]
---
# Corporate Flight Bookings

> [!TIP]
> **🧠 Memory hook**
> A water tap: open it at `first`, close it right after `last`. The prefix sum is the water flowing past each flight.
> **Mantra: diff[l] += x; diff[r+1] −= x; PREFIX**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Line%20Sweep/Line%20Sweep%20Animations.html#p=1) · **Pattern hub:** [Line Sweep - Pattern Map](Line%20Sweep%20-%20Pattern%20Map.md)

## Problem
`bookings[i] = [first, last, seats]` books seats on every flight from first to last (1-indexed). Return the total per flight.

## Key insight
A range update costs O(1) on a difference array; one prefix-sum pass at the end materialises all updates.

## Approach: Difference array
```java
// +seats at first, -seats just after last, then prefix sum gives each flight's total
public int[] corpFlightBookings(int[][] bookings, int n) {
    int[] diff = new int[n + 2];
    for (int[] b : bookings) {
        diff[b[0]] += b[2];
        diff[b[1] + 1] -= b[2];
    }
    int[] res = new int[n];
    int run = 0;
    for (int i = 1; i <= n; i++) {
        run += diff[i];
        res[i - 1] = run;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Difference array | O(n + b) | O(n) |

## Recall before you reveal
<details><summary>Why n + 2?</summary>

1-indexed flights plus the write at last + 1.

</details>


<details><summary>What does the prefix sum of diff give?</summary>

The actual value at each index.

</details>


## Connected
- Same trick for coverage counts: [Maximum Sum Obtained of Any Permutation](Maximum%20Sum%20Obtained%20of%20Any%20Permutation.md)
