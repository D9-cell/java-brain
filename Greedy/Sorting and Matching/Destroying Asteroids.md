---
topic: Sorting and Matching
pattern: [Sort, Grow first]
source: LeetCode 2126
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Destroying Asteroids

> [!TIP]
> **🧠 Memory hook**
> Eat the **smallest meal first** so the planet keeps growing.
> **Mantra: SMALLEST FIRST, MASS GROWS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=2) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
A planet of given mass collides with every asteroid once, in any order; it is destroyed if its mass is less than the asteroid, otherwise it absorbs it. Can all asteroids be destroyed?

## Key insight
Sort ascending. If the planet cannot beat the smallest remaining asteroid it cannot beat any. Otherwise absorbing it only helps.

## Approach: Sort + simulate
```java
// Sort; always hit the lightest remaining asteroid so the planet grows as early as possible
public boolean asteroidsDestroyed(int mass, int[] asteroids) {
    Arrays.sort(asteroids);
    long m = mass;
    for (int a : asteroids) {
        if (m < a) return false;
        m += a;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + simulate | O(n log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why `long` for the mass?</summary>

Masses add up and exceed `int`.

</details>


## Connected
- [Bag of Tokens](Bag%20of%20Tokens.md)
