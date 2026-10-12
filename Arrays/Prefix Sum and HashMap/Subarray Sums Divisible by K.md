---
topic: Prefix Sum and HashMap
pattern: [Remainders, Prefix count]
source: LeetCode 974
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Subarray Sums Divisible by K

> [!TIP]
> **🧠 Memory hook**
> Two prefixes with the **same remainder mod k** bound a divisible subarray. Count remainders in an int[k].
> **Mantra: r = ((pre + x) % k + k) % k · total += count[r] · count[r]++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sum%20and%20HashMap/Prefix%20Sum%20and%20HashMap%20Animations.html#p=1) · **Pattern hub:** [Prefix Sum and HashMap - Pattern Map](Prefix%20Sum%20and%20HashMap%20-%20Pattern%20Map.md)

## Problem
Return the number of non-empty subarrays whose sum is divisible by k.

## Key insight
Java's % can be negative, so normalise into [0, k). A plain array replaces the map since remainders are small.

## Approach: Remainder counts
```java
// Two prefixes with the same remainder mod k bound a divisible subarray
public int subarraysDivByK(int[] nums, int k) {
    int[] count = new int[k];
    count[0] = 1;
    int prefix = 0, total = 0;
    for (int x : nums) {
        prefix = ((prefix + x) % k + k) % k;
        total += count[prefix];
        count[prefix]++;
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Remainder counts | O(n + k) | O(k) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why normalise the remainder?</summary>

−1 % 5 is −1 in Java, but it should match 4.

</details>


<details><summary>Why count[0] = 1 at the start?</summary>

The empty prefix has remainder 0.

</details>


## Connected
- [Subarray Sum Equals K (O(n))](Subarray%20Sum%20Equals%20K%20%28O%28n%29%29.md)
- [Longest subarray with sum divisible by K](Longest%20subarray%20with%20sum%20divisible%20by%20K.md)
- [Number of Sub-arrays With Odd Sum](../Prefix%20Sums%20Basics/Number%20of%20Sub-arrays%20With%20Odd%20Sum.md)
