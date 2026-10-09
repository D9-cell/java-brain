---
topic: Backtracking
pattern: [Partition into groups]
source: LeetCode 473
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Matchsticks to Square

> [!TIP]
> **🧠 Memory hook**
> Packing 4 suitcases: big items first; identical suitcases are the same choice.
> **Mantra: SORT DESC, SKIP EQUAL SIDES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=14) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Can all sticks form a square?

## Key insight
Partition into 4 equal sums. Sort descending; skip a side whose current length equals an earlier side.

## Approach: Side-filling backtracking
```java
// Sticks sorted descending; put stick i on each side that still has room; skip sides with the same current length
private boolean solve(int[] m, int i, int[] sides, int target) {
    if (i == m.length) return true;
    for (int s = 0; s < 4; s++) {
        if (sides[s] + m[i] > target) continue;
        boolean seen = false;
        for (int t = 0; t < s; t++) seen |= sides[t] == sides[s];
        if (seen) continue;
        sides[s] += m[i];
        if (solve(m, i + 1, sides, target)) return true;
        sides[s] -= m[i];
    }
    return false;
}

// Total must be divisible by 4 and no stick longer than a side
public boolean makesquare(int[] matchsticks) {
    int sum = Arrays.stream(matchsticks).sum();
    if (sum % 4 != 0) return false;
    int[] m = Arrays.stream(matchsticks).boxed().sorted(Collections.reverseOrder()).mapToInt(Integer::intValue).toArray();
    if (m[0] > sum / 4) return false;
    return solve(m, 0, new int[4], sum / 4);
}
```

| Approach | Time | Space |
|---|---|---|
| Side-filling backtracking | O(4^n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against all 4^n assignments.

## Recall before you reveal
<details><summary>Quick rejections?</summary>

sum % 4 ≠ 0, or a stick longer than a side.

</details>


## Connected
- [Partition to K Equal Sum Subsets](Partition%20to%20K%20Equal%20Sum%20Subsets.md)
