---
topic: Jumps and Reach
pattern: [Two-state DP, Independent sides]
source: GfG
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Count possible ways to construct buildings

> [!TIP]
> **🧠 Memory hook**
> Each side of the road is a **binary string with no two 1s adjacent**; the sides do not interact.
> **Mantra: ONE SIDE = Fib(n + 2); ANSWER = SIDE²**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=9) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
A road has n plots on each side. A plot is either a building or empty, and two buildings cannot be adjacent on the same side. Count the layouts (mod 1e9+7).

## Key insight
For one side keep counts of layouts ending in a space and in a building: a building can only follow a space. The two sides are independent, so square the one-side count.

## Approach: Two rolling counts
```java
// One side: endsSpace / endsBuilding rolling counts; the two sides are independent, so square it
public int totalWays(int n) {
    long space = 1, building = 1;
    for (int i = 2; i <= n; i++) {
        long ns = (space + building) % MOD, nb = space;
        space = ns; building = nb;
    }
    long side = (space + building) % MOD;
    return (int) (side * side % MOD);
}
```

| Approach | Time | Space |
|---|---|---|
| Two rolling counts | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why square?</summary>

Every layout of one side combines with every layout of the other.

</details>


<details><summary>Which sequence is one side?</summary>

Fibonacci: 2, 3, 5, 8, … for n = 1, 2, 3, 4.

</details>


## Connected
- [Fibonacci Number](../Stairs%20and%20Robbers/Fibonacci%20Number.md)
- [House Robber](../Stairs%20and%20Robbers/House%20Robber.md)
