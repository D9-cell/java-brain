---
topic: Scans and Counting
pattern: [Ring distance, Fill from the nearest]
source: LeetCode
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Moves to Balance Circular Array

> [!TIP]
> **🧠 Memory hook**
> One person is in debt; collect the missing units from donors **nearest first**.
> **Mantra: DEBTOR FILLS FROM DISTANCE 1, THEN 2, …**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=11) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
A circular array holds balances; at most one is negative. Moving one unit between neighbours costs 1 move. Return the minimum moves to make every balance non-negative, or −1.

## Key insight
If the total is negative it is impossible. Otherwise take units from the two people at ring distance d (one when they coincide), cheapest distance first, adding `taken * d` moves until the debt is covered.

## Approach: Nearest donors first
```java
// Exactly one person is negative. Fill the deficit from the nearest donors: ring distance 1, then 2, ... each unit costs its distance
public long minMoves(int[] balance) {
    int n = balance.length, bad = -1;
    long sum = 0;
    for (int i = 0; i < n; i++) { sum += balance[i]; if (balance[i] < 0) bad = i; }
    if (bad == -1) return 0;
    if (sum < 0) return -1;
    long need = -(long) balance[bad], moves = 0;
    for (int d = 1; need > 0; d++) {
        int right = (bad + d) % n, left = ((bad - d) % n + n) % n;
        long available = (long) balance[right] + (left == right ? 0 : balance[left]);
        long taken = Math.min(need, available);
        moves += taken * d;
        need -= taken;
    }
    return moves;
}
```

| Approach | Time | Space |
|---|---|---|
| Nearest donors first | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a donor allocation search. Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why `left == right` handling?</summary>

At the antipode of an even ring both directions point at the same person.

</details>


## Connected
- [Gas Station](Gas%20Station.md)
