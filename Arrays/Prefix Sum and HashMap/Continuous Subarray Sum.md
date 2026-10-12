---
topic: Prefix Sum and HashMap
pattern: [Remainders, Length ≥ 2]
source: LeetCode 523
difficulty: Medium
companies: [Meta, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Continuous Subarray Sum

> [!TIP]
> **🧠 Memory hook**
> Same remainder twice means a multiple of k between them. Keep the **first index** and require a gap of **at least 2**.
> **Mantra: first{0:−1} · r seen at j, i − j ≥ 2 → true**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sum%20and%20HashMap/Prefix%20Sum%20and%20HashMap%20Animations.html#p=5) · **Pattern hub:** [Prefix Sum and HashMap - Pattern Map](Prefix%20Sum%20and%20HashMap%20-%20Pattern%20Map.md)

## Problem
Return true if some subarray of length at least 2 sums to a multiple of k (0 counts as a multiple).

## Key insight
Storing only the first index makes the gap as large as possible, so the length check is correct. Values are non-negative here.

## Approach: First index per remainder
```java
// Same remainder twice at least two indexes apart means a multiple of k of length >= 2
public boolean checkSubarraySum(int[] nums, int k) {
    Map<Integer, Integer> first = new HashMap<>();
    first.put(0, -1);
    int prefix = 0;
    for (int i = 0; i < nums.length; i++) {
        prefix = (prefix + nums[i]) % k;
        Integer j = first.get(prefix);
        if (j == null) first.put(prefix, i);
        else if (i - j >= 2) return true;
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| First index per remainder | O(n) | O(min(n, k)) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why keep the first index only?</summary>

It maximises the length, which must be ≥ 2.

</details>


<details><summary>[0, 0] with any k?</summary>

True: sum 0 is a multiple of k.

</details>


## Connected
- [Subarray Sums Divisible by K](Subarray%20Sums%20Divisible%20by%20K.md)
