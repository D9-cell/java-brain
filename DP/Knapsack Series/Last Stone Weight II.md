---
topic: Knapsack Series
pattern: [Reduce to subset sum, Signs in disguise]
source: LeetCode 1049
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Last Stone Weight II

> [!TIP]
> **🧠 Memory hook**
> Every smash is a subtraction, so the final stone is **Σ ± stones**: split into two piles as evenly as possible.
> **Mantra: ANSWER = total − 2 · (LARGEST REACHABLE s ≤ total / 2)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=7) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Repeatedly smash two stones x ≤ y; if they differ, a stone of weight y − x remains. Return the smallest possible weight of the last stone (0 if none).

## Key insight
Unrolling the smashes shows every stone ends with a + or − sign, and every sign pattern (with a non-negative result) is achievable. So it is Minimum Sum Partition.

## Approach: Reachable sums
```java
// Every smashing order assigns + or - to each stone: minimise |S1 - S2|
public int lastStoneWeightII(int[] stones) {
    int total = Arrays.stream(stones).sum(), half = total / 2;
    boolean[] can = new boolean[half + 1];
    can[0] = true;
    for (int x : stones)
        for (int s = half; s >= x; s--) can[s] |= can[s - x];
    for (int s = half; ; s--) if (can[s]) return total - 2 * s;
}
```

| Approach | Time | Space |
|---|---|---|
| Reachable sums | O(n · total) | O(total) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is every sign pattern reachable?</summary>

Smash the two piles against each other, always largest from each side.

</details>


<details><summary>Difference from Last Stone Weight I?</summary>

There the order is forced (heaviest two), so a heap simulation answers it.

</details>


## Connected
- [Minimum Sum Partition](Minimum%20Sum%20Partition.md)
- [Last Stone Weight](../../Heap/Last%20Stone%20Weight.md)
