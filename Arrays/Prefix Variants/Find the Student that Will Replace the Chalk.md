---
topic: Prefix Variants
pattern: [Cycle reduction, Prefix scan]
source: LeetCode 1894
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find the Student that Will Replace the Chalk

> [!TIP]
> **🧠 Memory hook**
> Whole rounds change nothing, so take **k mod (sum of chalk)**, then walk until a student needs more than what is left.
> **Mantra: rest = k % total · first i with rest < chalk[i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=12) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
Students use chalk[i] pieces in turn, looping around. Return the index of the first student who does not have enough chalk.

## Key insight
k can be 10⁹ and rounds can be many, so reduce first. A prefix array with binary search also finds the student.

## Approach: Mod + scan
```java
// Full rounds do not matter: reduce k by the round total, then find the first prefix above it
public int chalkReplacer(int[] chalk, int k) {
    long total = 0;
    for (int c : chalk) total += c;
    long rest = k % total;
    for (int i = 0; i < chalk.length; i++) {
        if (rest < chalk[i]) return i;
        rest -= chalk[i];
    }
    return 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Mod + scan | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why long total?</summary>

Sums reach 10¹⁰.

</details>


<details><summary>Binary search version?</summary>

Upper bound of rest in the prefix array.

</details>


## Connected
- [Longest Subsequence With Limited Sum](Longest%20Subsequence%20With%20Limited%20Sum.md)
