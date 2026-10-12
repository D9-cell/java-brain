---
topic: Formulas and Observations
pattern: [Count each step]
source: LeetCode 1518
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Water Bottles

> [!TIP]
> **🧠 Memory hook**
> Each exchange turns **numExchange empties into one full** (net −(e − 1) empties). You always keep one last empty: **b + (b − 1)/(e − 1)**.
> **Mantra: b + (b − 1) / (e − 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=3) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
You have numBottles full bottles and can exchange numExchange empty bottles for one full bottle. Return the maximum number of bottles you can drink.

## Key insight
The loop drinks, trades in groups and carries leftover empties forward. The formula counts trades: every trade lowers the empty count by e − 1 and needs at least e empties, so starting from b empties you can trade (b − 1)/(e − 1) times.

## Approach 1: Simulate
```java
// Drink everything, trade empties in groups, keep the leftover empties
public int numWaterBottlesLoop(int numBottles, int numExchange) {
    int drunk = numBottles, empty = numBottles;
    while (empty >= numExchange) {
        int fresh = empty / numExchange;
        drunk += fresh;
        empty = empty % numExchange + fresh;
    }
    return drunk;
}
```

## Approach 2: Formula
```java
// Each trade costs numExchange - 1 empties net, and the last bottle can't be traded
public int numWaterBottles(int numBottles, int numExchange) {
    return numBottles + (numBottles - 1) / (numExchange - 1);
}
```

| Approach | Time | Space |
|---|---|---|
| Simulate | O(log b) | O(1) |
| Formula | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why b − 1?</summary>

The final empty bottle can never be traded alone.

</details>


<details><summary>Leftovers in the loop?</summary>

empty % e stays and joins the new bottles.

</details>


## Connected
- [Count of Matches in Tournament](Count%20of%20Matches%20in%20Tournament.md)
