---
topic: Strings and Digits
pattern: [Prefix scan, Wasted steps]
source: LeetCode 3443
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Manhattan Distance After K Changes

> [!TIP]
> **🧠 Memory hook**
> Moves that go **back** are wasted; each change turns one wasted move into a useful one worth +2.
> **Mantra: dist + min(2k, wasted)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=10) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
A walker follows the directions of `s` (N, S, E, W). You may change at most k directions. Return the largest Manhattan distance from the origin at any time.

## Key insight
After i steps with the original moves the distance is `|E − W| + |N − S|`. The remaining steps are "wasted" (they cancel). Each change converts one wasted step into a useful one, increasing the distance by 2, up to the number of wasted steps.

## Approach: Prefix scan
```java
// After i steps with no changes the distance is |E-W| + |N-S|; every wasted step (one that moved back) can be fixed by a change that gains 2 (at most k of them)
public int maxDistance(String s, int k) {
    int e = 0, w = 0, n = 0, so = 0, best = 0;
    for (int i = 0; i < s.length(); i++) {
        switch (s.charAt(i)) { case 'E' -> e++; case 'W' -> w++; case 'N' -> n++; default -> so++; }
        int dist = Math.abs(e - w) + Math.abs(n - so);
        int wasted = i + 1 - dist;
        best = Math.max(best, dist + Math.min(2 * k, wasted));
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix scan | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why +2 per change?</summary>

Flipping a move that cancels another one removes a −1 and adds a +1.

</details>


## Connected
- [Maximum Number of Operations to Move Ones to the End](Maximum%20Number%20of%20Operations%20to%20Move%20Ones%20to%20the%20End.md)
