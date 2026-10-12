---
topic: Prefix Sum and HashMap
pattern: [Balance, Running rank]
source: LeetCode 3737, 3739
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Count Subarrays With Majority Element I & II

> [!TIP]
> **🧠 Memory hook**
> +1 for target, −1 otherwise. Target is a majority iff **prefix[j] > prefix[i]**. Since the balance moves by ±1, keep **how many earlier prefixes are below** and update it in O(1).
> **Mantra: +1: below += freq[old] · −1: below −= freq[new] · total += below · freq[cur]++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sum%20and%20HashMap/Prefix%20Sum%20and%20HashMap%20Animations.html#p=11) · **Pattern hub:** [Prefix Sum and HashMap - Pattern Map](Prefix%20Sum%20and%20HashMap%20-%20Pattern%20Map.md)

## Problem
Count subarrays in which target appears more than half the time. (Part II has n up to 10⁵.)

## Key insight
When the balance rises from b to b + 1, the prefixes equal to b become "below"; when it falls to b − 1, the prefixes equal to b − 1 stop being below. A frequency array indexed by balance + offset handles negatives.

## Approach: Balance + running count
```java
// +1 for target, -1 otherwise; count earlier prefixes strictly below the current one, updated in O(1) per step
public long countMajoritySubarrays(int[] nums, int target) {
    int n = nums.length, offset = n + 1;
    long[] freq = new long[2 * n + 3];
    int prefix = 0;
    freq[offset]++;
    long below = 0, total = 0;
    for (int x : nums) {
        if (x == target) {
            below += freq[prefix + offset];
            prefix++;
        } else {
            prefix--;
            below -= freq[prefix + offset];
        }
        total += below;
        freq[prefix + offset]++;
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Balance + running count | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why strictly greater?</summary>

Majority means more than half, so the balance must increase.

</details>


<details><summary>General approach?</summary>

A Fenwick tree over prefix values, O(n log n).

</details>


## Connected
- [Contiguous Array](Contiguous%20Array.md)
