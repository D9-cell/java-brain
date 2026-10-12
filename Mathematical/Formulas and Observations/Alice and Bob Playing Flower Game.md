---
topic: Formulas and Observations
pattern: [Parity]
source: LeetCode 3021
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Alice and Bob Playing Flower Game

> [!TIP]
> **🧠 Memory hook**
> Alice takes the last flower iff the **total x + y is odd**. Pairs with one odd and one even: **n·m/2**.
> **Mantra: RETURN (long) n * m / 2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=8) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
There are x flowers on one side and y on the other (1 ≤ x ≤ n, 1 ≤ y ≤ m). Players alternately pick one flower from either side, Alice first; whoever picks the last flower wins. Count pairs (x, y) where Alice wins.

## Key insight
Choices do not matter, only the total count of moves. Alice makes the last move iff x + y is odd. Counting odd-even pairs: odd(n)·even(m) + even(n)·odd(m), which equals ⌊n·m/2⌋.

## Approach: Parity count
```java
// Alice wins exactly when x + y is odd: one odd and one even
public long flowerGame(int n, int m) {
    return (long) n * m / 2;
}
```

| Approach | Time | Space |
|---|---|---|
| Parity count | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why do choices not matter?</summary>

Every move removes exactly one flower.

</details>


<details><summary>Why n·m/2?</summary>

Among all n·m pairs, odd sums are exactly half (rounded down).

</details>


## Connected
- [Vowels Game in a String](Vowels%20Game%20in%20a%20String.md)
- [Stone Game](../../DP/Game%20DP/Stone%20Game.md)
