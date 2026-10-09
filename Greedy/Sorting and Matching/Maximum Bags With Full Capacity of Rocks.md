---
topic: Sorting and Matching
pattern: [Sort, Cheapest first]
source: LeetCode 2279
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Bags With Full Capacity of Rocks

> [!TIP]
> **🧠 Memory hook**
> Fill the **emptiest bags** first: each costs its free space.
> **Mantra: SORT FREE SPACE, FILL FROM THE SMALLEST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=6) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Each bag has `capacity[i]` and `rocks[i]`. With `additionalRocks` rocks, what is the maximum number of full bags?

## Key insight
The cost to fill bag i is `capacity[i] - rocks[i]`. Sort these costs and fill while the budget lasts.

## Approach: Sort needs
```java
// Sort the free space of every bag and fill the emptiest ones first
public int maximumBags(int[] capacity, int[] rocks, int additionalRocks) {
    int n = capacity.length, full = 0;
    int[] need = new int[n];
    for (int i = 0; i < n; i++) need[i] = capacity[i] - rocks[i];
    Arrays.sort(need);
    for (int x : need) {
        if (additionalRocks < x) break;
        additionalRocks -= x;
        full++;
    }
    return full;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort needs | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Is there a better choice than the cheapest?</summary>

No: all full bags count the same, so cheaper ones leave more rocks for others.

</details>


## Connected
- [Maximum Ice Cream Bars](Maximum%20Ice%20Cream%20Bars.md)
