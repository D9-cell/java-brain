---
topic: Hash Map Pair Counting
pattern: [Remainder classes]
source: GfG Pairs which are Divisible by 4
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Pairs which are Divisible by 4

> [!TIP]
> **🧠 Memory hook**
> Count remainders mod 4. Valid pairs: **(0, 0)**, **(2, 2)** within a class and **(1, 3)** across.
> **Mantra: C(c0, 2) + C(c2, 2) + c1 · c3**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Hash%20Map%20Pair%20Counting/Hash%20Map%20Pair%20Counting%20Animations.html#p=4) · **Pattern hub:** [Hash Map Pair Counting - Pattern Map](Hash%20Map%20Pair%20Counting%20-%20Pattern%20Map.md)

## Problem
Count pairs (i < j) whose sum is divisible by 4.

## Key insight
A sum is divisible by 4 iff the remainders add to 0 or 4.

## Approach: Remainder counts
```java
// Remainder counts mod 4: pairs (0, 0), (2, 2) and (1, 3)
public long count4Divisibles(int[] arr) {
    long[] c = new long[4];
    for (int x : arr) c[x % 4]++;
    return c[0] * (c[0] - 1) / 2 + c[2] * (c[2] - 1) / 2 + c[1] * c[3];
}
```

| Approach | Time | Space |
|---|---|---|
| Remainder counts | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why C(c, 2) for 0 and 2?</summary>

Both elements come from the same class.

</details>


<details><summary>Why c1 · c3?</summary>

One from each class.

</details>


## Connected
- [Pairs of Songs With Total Durations Divisible by 60](Pairs%20of%20Songs%20With%20Total%20Durations%20Divisible%20by%2060.md)
