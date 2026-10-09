---
topic: Intervals and Scheduling
pattern: [Interval cover, Farthest reach]
source: GeeksforGeeks
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Water the Plants

> [!TIP]
> **🧠 Memory hook**
> The same cover idea on a **gallery with sprinklers**: a sprinkler at i with radius r waters [i − r, i + r].
> **Mantra: SORT BY LEFT, EXTEND WITH THE FARTHEST RIGHT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=3) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Some positions have a sprinkler of radius `gallery[i]` (−1 means none). Return the minimum sprinklers to water every position, or −1.

## Key insight
Build the water intervals, sort by left end and repeatedly take, among intervals starting at or before the first unwatered position, the one with the largest right end.

## Approach: Sort + extend
```java
// gallery[i] = radius of the sprinkler at i, or -1 when none; cover positions 0..n-1 with the fewest sprinklers
public int minSprinklers(int[] gallery, int n) {
    List<int[]> iv = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        if (gallery[i] == -1) continue;
        iv.add(new int[]{Math.max(0, i - gallery[i]), Math.min(n - 1, i + gallery[i])});
    }
    iv.sort((a, b) -> a[0] - b[0]);
    int count = 0, i = 0, target = 0;
    while (target < n) {
        int best = -1;
        while (i < iv.size() && iv.get(i)[0] <= target) best = Math.max(best, iv.get(i++)[1]);
        if (best < target) return -1;
        count++;
        target = best + 1;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + extend | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Difference to taps?</summary>

Positions are points 0..n−1 here, so the target after an interval is `right + 1`.

</details>


## Connected
- [Minimum Number of Taps to Open to Water a Garden](Minimum%20Number%20of%20Taps%20to%20Open%20to%20Water%20a%20Garden.md)
