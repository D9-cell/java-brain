---
topic: Sorting and Matching
pattern: [Cheapest first, Hash set]
source: LeetCode 2554
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Number of Integers to Choose From a Range I

> [!TIP]
> **🧠 Memory hook**
> Take the **smallest allowed numbers** until the sum cap is reached.
> **Mantra: WALK 1..n, SKIP BANNED, STOP AT THE CAP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=8) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Choose distinct integers from 1..n that are not banned, with sum at most `maxSum`. Maximise how many.

## Key insight
Taking small numbers keeps the sum small. Walk upward, skip banned numbers (hash set), and stop when the next number would break the cap.

## Approach: Greedy walk
```java
// Walk 1..n taking every allowed number while the sum stays within maxSum; smaller numbers are always the best to take
public int maxCount(int[] banned, int n, int maxSum) {
    Set<Integer> ban = new HashSet<>();
    for (int b : banned) ban.add(b);
    int count = 0, sum = 0;
    for (int x = 1; x <= n; x++) {
        if (ban.contains(x)) continue;
        if (sum + x > maxSum) break;
        sum += x;
        count++;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy walk | O(n + b) | O(b) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why can you stop at the first number that does not fit?</summary>

Every later number is larger.

</details>


## Connected
- [Maximum Ice Cream Bars](Maximum%20Ice%20Cream%20Bars.md)
