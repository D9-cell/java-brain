---
topic: Sorting and Matching
pattern: [Sort, Skip the largest]
source: LeetCode 1561
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Number of Coins You Can Get

> [!TIP]
> **🧠 Memory hook**
> Alice takes the biggest pile, you take the **second biggest**, Bob gets the leftover smallest.
> **Mantra: GIVE BOB THE SMALLEST THIRD, TAKE EVERY SECOND PILE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=3) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
In each round pick any 3 piles; Alice takes the largest, you the next, Bob the smallest. Maximise your coins over all rounds.

## Key insight
Sort. Bob should receive the smallest piles. Among the remaining piles, take pairs from the top: Alice the larger, you the smaller, so you take every second pile from the largest end.

## Approach: Sort + step by 2
```java
// Sort; give Bob the n smallest piles, then in each pair of the rest Alice takes the larger and you take the next one
public int maxCoins(int[] piles) {
    Arrays.sort(piles);
    int n = piles.length / 3, sum = 0;
    for (int i = n; i < piles.length; i += 2) sum += piles[i];
    return sum;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + step by 2 | O(n log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Where does the loop start?</summary>

At index n/3, after the piles given to Bob.

</details>


## Connected
- [Maximize Happiness of Selected Children](Maximize%20Happiness%20of%20Selected%20Children.md)
