---
topic: Prefix Sum and HashMap
pattern: [Balance, First index]
source: LeetCode 525
difficulty: Medium
companies: [Meta, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Contiguous Array

> [!TIP]
> **🧠 Memory hook**
> Count **0 as −1**. Equal zeros and ones means the balance **repeats**; keep its first index.
> **Mantra: balance ±1 · seen → best = max(i − first[b]) · ELSE first[b] = i**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sum%20and%20HashMap/Prefix%20Sum%20and%20HashMap%20Animations.html#p=4) · **Pattern hub:** [Prefix Sum and HashMap - Pattern Map](Prefix%20Sum%20and%20HashMap%20-%20Pattern%20Map.md)

## Problem
Return the maximum length of a contiguous subarray with equal numbers of 0s and 1s.

## Key insight
Turning the condition into "sum is 0" makes it the Max Size Subarray Sum Equals k problem with k = 0.

## Approach: Balance + first index
```java
// Count 0 as -1; equal zeros and ones means the running balance repeats
public int findMaxLength(int[] nums) {
    Map<Integer, Integer> first = new HashMap<>();
    first.put(0, -1);
    int balance = 0, best = 0;
    for (int i = 0; i < nums.length; i++) {
        balance += nums[i] == 1 ? 1 : -1;
        if (first.containsKey(balance)) best = Math.max(best, i - first.get(balance));
        else first.put(balance, i);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Balance + first index | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why map 0 to −1?</summary>

Then equal counts means sum 0.

</details>


<details><summary>Array instead of map?</summary>

Balances lie in [−n, n], so an int[2n + 1] works.

</details>


## Connected
- [Maximum Size Subarray Sum Equals k](Maximum%20Size%20Subarray%20Sum%20Equals%20k.md)
- [Count Subarrays With Majority Element I & II](Count%20Subarrays%20With%20Majority%20Element%20I%20%26%20II.md)
