---
topic: Intervals and Scheduling
pattern: [Bit mask per row, Three candidate blocks]
source: LeetCode 1386
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Cinema Seat Allocation

> [!TIP]
> **🧠 Memory hook**
> Only three seat blocks can host a family: **2-5, 4-7, 6-9**. Mark the blocks that survive the reservations.
> **Mantra: EMPTY ROW = 2, LEFT+RIGHT FREE = 2, ANY BLOCK = 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=7) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
A cinema has n rows of 10 seats. A family needs 4 adjacent seats in one row; an aisle between seats 3-4 and 7-8 splits groups (so 4-7 is allowed, 3-6 is not). Return the maximum families.

## Key insight
Rows without reservations hold 2 families. For a reserved row build a mask of reserved seats 2..9 and test the three blocks: left and right both free gives 2, any one block free gives 1.

## Approach: Bit masks
```java
// A family needs 4 adjacent seats inside [2-5], [4-7] or [6-9]. Rows without reservations hold 2 families; others are checked with bit masks
public int maxNumberOfFamilies(int n, int[][] reservedSeats) {
    Map<Integer, Integer> rows = new HashMap<>();
    for (int[] s : reservedSeats) if (s[1] >= 2 && s[1] <= 9) rows.merge(s[0], 1 << (s[1] - 2), (a, b) -> a | b);
    int total = 2 * (n - rows.size());
    int left = 0b00001111, mid = 0b00111100, right = 0b11110000;
    for (int mask : rows.values()) {
        boolean l = (mask & left) == 0, m = (mask & mid) == 0, r = (mask & right) == 0;
        if (l && r) total += 2; else if (l || m || r) total += 1;
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Bit masks | O(r) | O(r) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why do seats 1 and 10 not matter?</summary>

No family block uses them.

</details>


## Connected
- [Maximum Building Height](Maximum%20Building%20Height.md)
