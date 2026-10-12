---
topic: Prefix Variants
pattern: [Sorted prefix]
source: LeetCode 2389
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Longest Subsequence With Limited Sum

> [!TIP]
> **🧠 Memory hook**
> To fit the most numbers, take the **smallest first**. Sort, build prefix sums, and count prefixes ≤ each query.
> **Mantra: sort · pre · largest m with pre[m] ≤ q**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=1) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
For each query return the maximum size of a subsequence whose sum is at most the query.

## Key insight
Order does not matter for a subsequence sum, so sorting is allowed, and the cheapest m elements are the m smallest.

## Approach: Sort + prefix + search
```java
// Take the smallest values first: sort, prefix sums, then count prefixes within each query
public int[] answerQueries(int[] nums, int[] queries) {
    Arrays.sort(nums);
    int n = nums.length;
    long[] pre = new long[n + 1];
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
    int[] out = new int[queries.length];
    for (int q = 0; q < queries.length; q++) {
        int lo = 0, hi = n;
        while (lo < hi) {
            int mid = (lo + hi + 1) / 2;
            if (pre[mid] <= queries[q]) lo = mid;
            else hi = mid - 1;
        }
        out[q] = lo;
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + prefix + search | O((n + q) log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the smallest values?</summary>

Any m elements cost at least the m smallest.

</details>


<details><summary>Why binary search?</summary>

Prefix sums are increasing.

</details>


## Connected
- [Find the Student that Will Replace the Chalk](Find%20the%20Student%20that%20Will%20Replace%20the%20Chalk.md)
