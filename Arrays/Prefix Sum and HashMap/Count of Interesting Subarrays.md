---
topic: Prefix Sum and HashMap
pattern: [Count transform, Remainders]
source: LeetCode 2845
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Count of Interesting Subarrays

> [!TIP]
> **🧠 Memory hook**
> cnt = how many elements satisfy **nums[i] % modulo == k**. Interesting means **(cnt_j − cnt_i) % modulo == k**: look up (cnt − k) mod modulo.
> **Mantra: cnt = (cnt + flag) % modulo · total += seen[(cnt − k) mod m] · seen[cnt]++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sum%20and%20HashMap/Prefix%20Sum%20and%20HashMap%20Animations.html#p=7) · **Pattern hub:** [Prefix Sum and HashMap - Pattern Map](Prefix%20Sum%20and%20HashMap%20-%20Pattern%20Map.md)

## Problem
A subarray is interesting if the number of indexes with nums[i] % modulo == k, taken mod modulo, equals k. Count interesting subarrays.

## Key insight
Two transforms: elements become 0/1 flags, and counts are kept mod modulo. Then it is a remainder lookup.

## Approach: Prefix remainders
```java
// cnt = how many elements have nums[i] % modulo == k; need (cnt_j - cnt_i) % modulo == k
public long countInterestingSubarrays(List<Integer> nums, int modulo, int k) {
    Map<Integer, Integer> seen = new HashMap<>();
    seen.put(0, 1);
    int cnt = 0;
    long total = 0;
    for (int x : nums) {
        if (x % modulo == k) cnt = (cnt + 1) % modulo;
        total += seen.getOrDefault(((cnt - k) % modulo + modulo) % modulo, 0);
        seen.merge(cnt, 1, Integer::sum);
    }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix remainders | O(n) | O(min(n, modulo)) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why keep cnt mod modulo?</summary>

Only the remainder matters.

</details>


<details><summary>Why long total?</summary>

Up to n²/2 subarrays.

</details>


## Connected
- [Count Number of Nice Subarrays](Count%20Number%20of%20Nice%20Subarrays.md)
- [Subarray Sums Divisible by K](Subarray%20Sums%20Divisible%20by%20K.md)
