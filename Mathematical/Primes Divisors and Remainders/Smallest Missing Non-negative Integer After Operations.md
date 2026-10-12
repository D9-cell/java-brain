---
topic: Primes Divisors and Remainders
pattern: [Residue classes, Greedy MEX]
source: LeetCode 2598
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Smallest Missing Non-negative Integer After Operations

> [!TIP]
> **🧠 Memory hook**
> Adding or subtracting value keeps **x mod value**. Count residues, then build 0, 1, 2, … spending one element of residue **i % value** each.
> **Mantra: cnt[((x % v) + v) % v]++ · WHILE cnt[mex % v] > 0: use one, mex++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=14) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
You may add or subtract value from any element any number of times. Return the maximum possible MEX (smallest missing non-negative integer).

## Key insight
An element can become any number with the same remainder. To cover 0..mex−1 each target i needs a distinct element of residue i mod value, so greedily walk mex upward while the needed residue has stock left.

## Approach: Residue counts
```java
// Adding or subtracting value keeps x mod value; spend residue counts on 0, 1, 2, ...
public int findSmallestInteger(int[] nums, int value) {
    int[] cnt = new int[value];
    for (int x : nums) cnt[((x % value) + value) % value]++;
    int mex = 0;
    while (cnt[mex % value] > 0) {
        cnt[mex % value]--;
        mex++;
    }
    return mex;
}
```

| Approach | Time | Space |
|---|---|---|
| Residue counts | O(n + value) | O(value) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the double mod?</summary>

Java % is negative for negative x.

</details>


<details><summary>Why is the walk greedy-safe?</summary>

Each residue class is used in increasing order of targets, no choice matters.

</details>


## Connected
- [Minimum Operations to Make a Uni-Value Grid](Minimum%20Operations%20to%20Make%20a%20Uni-Value%20Grid.md)
- [Missing Number](../Digits%20and%20Powers/Missing%20Number.md)
