---
topic: Counting and Modular Combinatorics
pattern: [Insertion counting]
source: LeetCode 1359
difficulty: Hard
companies: [Amazon, DoorDash]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count All Valid Pickup and Delivery Options

> [!TIP]
> **🧠 Memory hook**
> Insert order i into a valid sequence of 2(i − 1) events: **(2i − 1)·i** ways to place P before D.
> **Mantra: ways *= (2i − 1) · i**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=1) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
Given n orders, each with a pickup and a delivery, count sequences of all 2n events where every delivery comes after its pickup, mod 1e9+7.

## Key insight
A valid sequence of 2(i − 1) events has 2i − 1 gaps. Placing P_i and D_i into the new sequence of length 2i means choosing 2 of the 2i positions, with P_i in the earlier one: C(2i, 2) = i(2i − 1). Multiplying over i gives (2n)! / 2ⁿ.

## Approach: Insertion product
```java
// Adding order i to a valid sequence of 2(i - 1) events: (2i - 1)·i ways to place P_i before D_i
public int countOrders(int n) {
    long MOD = 1_000_000_007, ways = 1;
    for (int i = 1; i <= n; i++) ways = ways * (2L * i - 1) % MOD * i % MOD;
    return (int) ways;
}
```

| Approach | Time | Space |
|---|---|---|
| Insertion product | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Closed form?</summary>

(2n)! / 2ⁿ: all orders, halved once per pair.

</details>


<details><summary>n = 2?</summary>

1 · 6 = 6.

</details>


## Connected
- [Count Good Numbers](Count%20Good%20Numbers.md)
