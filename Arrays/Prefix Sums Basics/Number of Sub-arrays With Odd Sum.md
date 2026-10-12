---
topic: Prefix Sums Basics
pattern: [Prefix parity]
source: LeetCode 1524
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Number of Sub-arrays With Odd Sum

> [!TIP]
> **🧠 Memory hook**
> A subarray sum is odd when its **two prefix sums differ in parity**. Count even and odd prefixes so far (starting with one even: the empty prefix).
> **Mantra: odd prefix → add evens seen · even prefix → add odds seen**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sums%20Basics/Prefix%20Sums%20Basics%20Animations.html#p=6) · **Pattern hub:** [Prefix Sums Basics - Pattern Map](Prefix%20Sums%20Basics%20-%20Pattern%20Map.md)

## Problem
Return the number of subarrays with an odd sum, mod 1e9+7.

## Key insight
Only the parity of each prefix matters. Each new prefix pairs with every earlier prefix of the opposite parity.

## Approach: Parity counts
```java
// A subarray is odd when its two prefix sums differ in parity; count odd and even prefixes
public int numOfSubarrays(int[] arr) {
    long MOD = 1_000_000_007, odd = 0, even = 1, count = 0;
    int sum = 0;
    for (int x : arr) {
        sum = (sum + x) % 2;
        if (sum == 1) {
            count += even;
            odd++;
        } else {
            count += odd;
            even++;
        }
    }
    return (int) (count % MOD);
}
```

| Approach | Time | Space |
|---|---|---|
| Parity counts | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why start with even = 1?</summary>

The empty prefix has sum 0.

</details>


<details><summary>Generalisation?</summary>

Count prefixes by value mod k: Subarray Sums Divisible by K.

</details>


## Connected
- [Subarray Sums Divisible by K](../Prefix%20Sum%20and%20HashMap/Subarray%20Sums%20Divisible%20by%20K.md)
