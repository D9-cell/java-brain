---
topic: Counting and Modular Combinatorics
pattern: [Information counting]
source: LeetCode 458
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Poor Pigs

> [!TIP]
> **🧠 Memory hook**
> With T = test/die rounds each pig ends in one of **T + 1 states** (dies in round 1..T or survives). p pigs separate **(T + 1)^p** buckets.
> **Mantra: states = test/die + 1 · smallest p with states^p ≥ buckets**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=9) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
One of buckets is poisoned. A pig dies minutesToDie after drinking. Within minutesToTest, return the minimum pigs needed to find the poisoned bucket.

## Key insight
Think of each bucket as a number in base T + 1, one digit per pig: digit d means the pig drinks it in round d + 1 (or never for digit T). The death pattern reveals all digits.

## Approach: Count states
```java
// Each pig reports one of (rounds + 1) outcomes, so p pigs tell apart (rounds + 1)^p buckets
public int poorPigs(int buckets, int minutesToDie, int minutesToTest) {
    int states = minutesToTest / minutesToDie + 1, pigs = 0;
    long reach = 1;
    while (reach < buckets) {
        reach *= states;
        pigs++;
    }
    return pigs;
}
```

| Approach | Time | Space |
|---|---|---|
| Count states | O(log buckets) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why T + 1 and not 2?</summary>

A pig can also tell when it died, not just whether.

</details>


<details><summary>One bucket?</summary>

0 pigs: no test needed.

</details>


## Connected
- [Count Good Numbers](Count%20Good%20Numbers.md)
