---
topic: Formulas and Observations
pattern: [Prefix sums, Sliding the shape]
source: LeetCode 2145
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count the Hidden Sequences

> [!TIP]
> **🧠 Memory hook**
> The differences fix the **shape**; only the start shifts it. The shape's height is **max − min of prefix sums**, and it must fit in [lower, upper].
> **Mantra: track prefix min, max · RETURN max(0, (upper − lower) − (max − min) + 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=13) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
differences[i] = hidden[i + 1] − hidden[i]. Count hidden sequences whose values all lie in [lower, upper].

## Key insight
With hidden[0] = s every value is s + prefix. All values lie in range iff s + min ≥ lower and s + max ≤ upper, a range of starts of size (upper − lower) − (max − min) + 1. Use long: prefix sums can reach 10¹⁰.

## Approach: Prefix range
```java
// The shape is fixed by prefix sums; count the starting values that keep its min and max in range
public int numberOfArrays(int[] differences, int lower, int upper) {
    long cur = 0, min = 0, max = 0;
    for (int d : differences) {
        cur += d;
        min = Math.min(min, cur);
        max = Math.max(max, cur);
    }
    return (int) Math.max(0, (upper - lower) - (max - min) + 1);
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix range | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why include 0 in min and max?</summary>

hidden[0] itself is part of the sequence.

</details>


<details><summary>Why long?</summary>

n · 10⁵ differences overflow an int.

</details>


## Connected
- [Can Make Arithmetic Progression From Sequence](Can%20Make%20Arithmetic%20Progression%20From%20Sequence.md)
