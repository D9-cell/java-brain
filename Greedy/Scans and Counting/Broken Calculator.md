---
topic: Scans and Counting
pattern: [Reverse process]
source: LeetCode 991
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Broken Calculator

> [!TIP]
> **🧠 Memory hook**
> Going forward you choose between ×2 and −1; going **backward from the target** the choice is forced.
> **Mantra: TARGET EVEN → /2, ODD → +1, THEN SUBTRACT THE GAP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=7) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Starting from `startValue`, each step doubles the number or subtracts 1. Return the minimum steps to reach `target`.

## Key insight
Reverse the operations: halve an even target, add 1 to an odd one, until target ≤ start. Then close the gap with start − target decrements.

## Approach 1: Loop
```java
// Work backwards from target: halve when even, add 1 when odd, then close the remaining gap by subtracting
public int brokenCalc(int startValue, int target) {
    int ops = 0;
    while (target > startValue) {
        target = target % 2 == 0 ? target / 2 : target + 1;
        ops++;
    }
    return ops + startValue - target;
}
```

## Approach 2: Recursive
```java
// Recursive form of the same reverse process
public int brokenCalcRecursive(int start, int target) {
    if (start >= target) return start - target;
    return 1 + (target % 2 == 0 ? brokenCalcRecursive(start, target / 2) : brokenCalcRecursive(start, target + 1));
}
```

| Approach | Time | Space |
|---|---|---|
| Loop | O(log target) | O(1) |
| Recursive | O(log target) | O(log target) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why never halve an odd number?</summary>

It is not reachable by doubling, so the reverse step must be +1 first.

</details>


## Connected
- [Minimum Replacements to Sort the Array](Minimum%20Replacements%20to%20Sort%20the%20Array.md)
