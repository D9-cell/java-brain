---
topic: Primes Divisors and Remainders
pattern: [Divisor parity]
source: LeetCode 319
difficulty: Medium
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Bulb Switcher

> [!TIP]
> **🧠 Memory hook**
> Bulb i is toggled once **per divisor**. Only **perfect squares** have an odd number of divisors, so ⌊√n⌋ stay on.
> **Mantra: RETURN ⌊√n⌋**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=11) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
n bulbs start off. In round k toggle every k-th bulb, for k = 1..n. Return how many bulbs are on at the end.

## Key insight
Divisors pair up as (d, i/d). The pair collapses only when d = √i, so squares have an odd count and end on.

## Approach: Count squares
```java
// Bulb i flips once per divisor; only perfect squares have an odd number of divisors
public int bulbSwitch(int n) {
    return (int) Math.sqrt(n);
}
```

| Approach | Time | Space |
|---|---|---|
| Count squares | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why do squares have odd divisor counts?</summary>

The root pairs with itself.

</details>


<details><summary>Bulbs on for n = 10?</summary>

1, 4, 9 → 3.

</details>


## Connected
- [Four Divisors](Four%20Divisors.md)
