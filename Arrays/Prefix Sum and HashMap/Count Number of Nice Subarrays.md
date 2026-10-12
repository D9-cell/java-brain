---
topic: Prefix Sum and HashMap
pattern: [Count transform, Prefix count]
source: LeetCode 1248
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Count Number of Nice Subarrays

> [!TIP]
> **🧠 Memory hook**
> Replace each number by **1 if odd, else 0**. Now it is Subarray Sum Equals k on 0/1 values: count prefixes with odd − k.
> **Mantra: odd += x % 2 · count += seen[odd − k] · seen[odd]++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sum%20and%20HashMap/Prefix%20Sum%20and%20HashMap%20Animations.html#p=6) · **Pattern hub:** [Prefix Sum and HashMap - Pattern Map](Prefix%20Sum%20and%20HashMap%20-%20Pattern%20Map.md)

## Problem
A subarray is nice if it contains exactly k odd numbers. Count nice subarrays.

## Key insight
Prefix odd counts never exceed n, so an int array of size n + 1 replaces the map.

## Approach: Prefix count array
```java
// Prefix count of odd numbers; a nice subarray ending here starts after a prefix with odd - k
public int numberOfSubarrays(int[] nums, int k) {
    int[] seen = new int[nums.length + 1];
    seen[0] = 1;
    int odd = 0, count = 0;
    for (int x : nums) {
        odd += x % 2;
        if (odd >= k) count += seen[odd - k];
        seen[odd]++;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix count array | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Sliding window version?</summary>

atMost(k) − atMost(k − 1).

</details>


<details><summary>Why an array?</summary>

Keys are 0..n.

</details>


## Connected
- [Subarray Sum Equals K (O(n))](Subarray%20Sum%20Equals%20K%20%28O%28n%29%29.md)
- [Count of Interesting Subarrays](Count%20of%20Interesting%20Subarrays.md)
