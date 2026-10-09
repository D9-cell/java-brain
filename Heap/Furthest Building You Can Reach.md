---
topic: Heap
pattern: [Greedy with regret]
source: LeetCode 1642
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Furthest Building You Can Reach

> [!TIP]
> **🧠 Memory hook**
> Pay with bricks but keep receipts; when broke, swap the most expensive receipt for a ladder.
> **Mantra: BRICKS FIRST, MAX-HEAP OF CLIMBS, RETRO-FIT LADDER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=6) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
How far can you go with given bricks and ladders?

## Key insight
Ladders should cover the biggest climbs. Pay everything with bricks and, when short, refund the largest climb so far and use a ladder there.

## Approach: Max-heap regret
```java
// Use bricks greedily but remember each climb in a max-heap; when bricks run out, retro-fit a ladder on the biggest climb
public int furthestBuilding(int[] heights, int bricks, int ladders) {
    PriorityQueue<Integer> used = new PriorityQueue<>(Collections.reverseOrder());
    for (int i = 0; i < heights.length - 1; i++) {
        int d = heights[i + 1] - heights[i];
        if (d <= 0) continue;
        bricks -= d;
        used.offer(d);
        if (bricks < 0) {
            if (ladders == 0) return i;
            bricks += used.poll();
            ladders--;
        }
    }
    return heights.length - 1;
}
```

| Approach | Time | Space |
|---|---|---|
| Max-heap regret | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against exhaustive search over brick/ladder choices.

## Recall before you reveal
<details><summary>Equivalent formulation?</summary>

Min-heap of size `ladders`: overflow climbs are paid with bricks.

</details>


## Connected
- [IPO](IPO.md)
