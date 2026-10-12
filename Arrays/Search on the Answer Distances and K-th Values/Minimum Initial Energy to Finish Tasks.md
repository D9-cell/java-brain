---
topic: Search on the Answer Distances and K-th Values
pattern: [Exchange argument, Search on the answer]
source: LeetCode 1665
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Initial Energy to Finish Tasks

> [!TIP]
> **🧠 Memory hook**
> Do tasks with the **largest (minimum − actual)** first. Then binary search the smallest starting energy that survives that order.
> **Mantra: sort by (min − actual) desc · finishes(e) → hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=10) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
tasks[i] = [actual, minimum]: you need at least minimum energy to start it, and it costs actual. Return the minimum initial energy to finish all tasks in some order.

## Key insight
Swapping two neighbouring tasks shows the one with the bigger slack (minimum − actual) should come first. With the order fixed, more energy never hurts.

## Approach: Sort + binary search
```java
// Do tasks with the largest (minimum - actual) first; binary search the smallest energy that completes them
public int minimumEffort(int[][] tasks) {
    Arrays.sort(tasks, (a, b) -> (b[1] - b[0]) - (a[1] - a[0]));
    int lo = 0, hi = 0;
    for (int[] t : tasks) hi += t[1];
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (finishes(tasks, mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

// Walks the tasks in order with this much energy
boolean finishes(int[][] tasks, int energy) {
    for (int[] t : tasks) {
        if (energy < t[1]) return false;
        energy -= t[0];
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + binary search | O(n log n + n log Σmin) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against trying every task order on small inputs.

## Recall before you reveal
<details><summary>Why sort by min − actual?</summary>

An exchange argument on adjacent tasks.

</details>


<details><summary>Closed form?</summary>

Process in reverse: need = max(minimum, need + actual).

</details>


## Connected
- [Maximum Number of Tasks You Can Assign](Maximum%20Number%20of%20Tasks%20You%20Can%20Assign.md)
