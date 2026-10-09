---
topic: Intervals and Scheduling
pattern: [Order by the long tail, Exchange argument]
source: LeetCode 2136
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Earliest Possible Day of Full Bloom

> [!TIP]
> **🧠 Memory hook**
> Planting is **your time**, growing is **free time**: start the slowest growers first.
> **Mantra: PLANT THE LONGEST-GROWING FIRST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=4) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Seed i needs `plantTime[i]` days of work (one seed at a time) and then `growTime[i]` days to bloom. Return the earliest day all bloom.

## Key insight
Planting takes the same total time in any order, so the order only decides when each growing period starts. Sort by `growTime` descending: the seeds with the longest wait start growing earliest.

## Approach: Sort by grow time
```java
// Plant seeds one after another; those that grow longest should be planted first so their waiting overlaps the other planting
public int earliestFullBloom(int[] plantTime, int[] growTime) {
    Integer[] order = new Integer[plantTime.length];
    for (int i = 0; i < order.length; i++) order[i] = i;
    Arrays.sort(order, (a, b) -> growTime[b] - growTime[a]);
    int planted = 0, ans = 0;
    for (int i : order) {
        planted += plantTime[i];
        ans = Math.max(ans, planted + growTime[i]);
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort by grow time | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Exchange argument?</summary>

Swapping two neighbours with the smaller grow time first can only delay the larger one by more than it helps the smaller.

</details>


## Connected
- [Task Scheduler](Task%20Scheduler.md)
