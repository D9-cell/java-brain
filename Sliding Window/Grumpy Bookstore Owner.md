---
topic: Sliding Window
pattern: [Fixed window]
source: LeetCode 1052
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Grumpy Bookstore Owner

> [!TIP]
> **🧠 Memory hook**
> Point a happiness spotlight of `minutes` where grumpiness costs most.
> **Mantra: BASE HAPPY + MAX WINDOW OF customers·grumpy**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=25) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
The owner can stay calm for `minutes` consecutive minutes once. Maximise satisfied customers.

## Key insight
Satisfied = always-happy customers + the best window of customers lost to grumpiness.

## Approach: Fixed window
```java
// Fixed window of `minutes`: find where the most grumpy-lost customers sit, then add all always-happy ones
public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {
    int n = customers.length, unsat = 0;
    for (int i = 0; i < minutes; i++) unsat += customers[i] * grumpy[i];
    int maxUnsat = unsat;
    for (int i = 0, j = minutes; j < n; i++, j++) {
        unsat += customers[j] * grumpy[j] - customers[i] * grumpy[i];
        maxUnsat = Math.max(maxUnsat, unsat);
    }
    int total = maxUnsat;
    for (int i = 0; i < n; i++) total += customers[i] * (1 - grumpy[i]);
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Fixed window | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against trying every window.

## Recall before you reveal
<details><summary>What slides?</summary>

Only customers[i]·grumpy[i].

</details>

