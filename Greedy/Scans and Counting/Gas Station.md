---
topic: Scans and Counting
pattern: [Running balance, Reset on negative]
source: LeetCode 134
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Gas Station

> [!TIP]
> **🧠 Memory hook**
> If the tank goes negative at station i, **no start before i can work**, so restart at i + 1.
> **Mantra: RESET THE START WHEN THE TANK GOES NEGATIVE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=1) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Stations in a circle have `gas[i]` and `cost[i]` to reach the next one. Return the start index for a full circuit, or −1.

## Key insight
If total gas is less than total cost it is impossible. Otherwise scan with a running tank; when it goes negative, the start must be after this station. The final candidate works because the total is non-negative.

## Approach 1: Tank reset
```java
// If the total gas covers the total cost a start exists; it is the station after the point where the running tank was lowest
public int canCompleteCircuit(int[] gas, int[] cost) {
    int total = 0, tank = 0, start = 0;
    for (int i = 0; i < gas.length; i++) {
        int diff = gas[i] - cost[i];
        total += diff;
        tank += diff;
        if (tank < 0) { start = i + 1; tank = 0; }
    }
    return total >= 0 ? start : -1;
}
```

## Approach 2: After the minimum prefix
```java
// Start at the station after the minimum prefix sum of (gas - cost)
public int canCompleteCircuitPrefix(int[] gas, int[] cost) {
    int sum = 0, minSum = Integer.MAX_VALUE, minIdx = 0;
    for (int i = 0; i < gas.length; i++) {
        sum += gas[i] - cost[i];
        if (sum < minSum) { minSum = sum; minIdx = i; }
    }
    return sum < 0 ? -1 : (minIdx + 1) % gas.length;
}
```

| Approach | Time | Space |
|---|---|---|
| Tank reset | O(n) | O(1) |
| After the minimum prefix | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why can all starts between the old start and i be skipped?</summary>

Each of them would reach i with at most the tank the old start had, which already failed.

</details>


## Connected
- [Candy](Candy.md)
- [Patching Array](Patching%20Array.md)
