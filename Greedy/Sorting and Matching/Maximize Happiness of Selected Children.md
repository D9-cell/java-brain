---
topic: Sorting and Matching
pattern: [Sort descending, Penalty by turn]
source: LeetCode 3075
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximize Happiness of Selected Children

> [!TIP]
> **🧠 Memory hook**
> Every pick makes the **remaining** children sadder, so choose the happiest first.
> **Mantra: HAPPIEST FIRST, SUBTRACT THE TURN NUMBER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=9) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
You pick k children one at a time; after each pick all unpicked children lose 1 happiness (not below 0). Maximise the total.

## Key insight
Sort descending. The i-th pick (from 0) has lost exactly i happiness, so add `max(0, h - i)`. Taking larger values earlier never hurts.

## Approach: Sort + subtract
```java
// Sort descending; the i-th pick has lost i happiness (never below 0), so always pick the happiest remaining child
public long maximumHappinessSum(int[] happiness, int k) {
    Arrays.sort(happiness);
    long sum = 0;
    for (int i = 0; i < k; i++) sum += Math.max(0, happiness[happiness.length - 1 - i] - i);
    return sum;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + subtract | O(n log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why clamp at 0?</summary>

Happiness cannot become negative.

</details>


## Connected
- [Maximum Number of Coins You Can Get](Maximum%20Number%20of%20Coins%20You%20Can%20Get.md)
