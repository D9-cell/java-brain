---
topic: Stock and Kadane States
pattern: [Left best + right best, Window sums]
source: LeetCode 689
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximum Sum of 3 Non-Overlapping Subarrays

> [!TIP]
> **🧠 Memory hook**
> Pin the **middle window**; the best left and right windows have been precomputed.
> **Mantra: FOR EACH MIDDLE: left[mid − k] + w[mid] + right[mid + k]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stock%20and%20Kadane%20States/Stock%20and%20Kadane%20States%20Animations.html#p=12) · **Pattern hub:** [Stock and Kadane States - Pattern Map](Stock%20and%20Kadane%20States%20-%20Pattern%20Map.md)

## Problem
Find three non-overlapping subarrays of length k with maximum total sum. Return their starting indices, the lexicographically smallest if there are ties.

## Key insight
Compute every window sum. left[i] = start of the best window within [0, i] (first one on ties), right[i] = start of the best window within [i, end] (first one on ties, so use ≥ when scanning from the right). Then try every middle.

## Approach: Three passes
```java
// Best left window up to each point, best right window from each point, then try every middle window
public int[] maxSumOfThreeSubarrays(int[] nums, int k) {
    int n = nums.length, m = n - k + 1;
    int[] w = new int[m];
    int sum = 0;
    for (int i = 0; i < n; i++) { sum += nums[i]; if (i >= k) sum -= nums[i - k]; if (i >= k - 1) w[i - k + 1] = sum; }
    int[] left = new int[m], right = new int[m];
    for (int i = 1; i < m; i++) left[i] = w[i] > w[left[i - 1]] ? i : left[i - 1];
    right[m - 1] = m - 1;
    for (int i = m - 2; i >= 0; i--) right[i] = w[i] >= w[right[i + 1]] ? i : right[i + 1];
    int[] best = null;
    for (int mid = k; mid + k < m; mid++) {
        int a = left[mid - k], c = right[mid + k];
        if (best == null || w[a] + w[mid] + w[c] > w[best[0]] + w[best[1]] + w[best[2]]) best = new int[]{a, mid, c};
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Three passes | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>How are ties kept lexicographically smallest?</summary>

Strict > on the left scan, ≥ on the right scan.

</details>


<details><summary>k windows instead of 3?</summary>

A DP over (windows used, position).

</details>


## Connected
- [Best Time to Buy and Sell Stock III](Best%20Time%20to%20Buy%20and%20Sell%20Stock%20III.md)
- [Maximum Strength of K Disjoint Subarrays](Maximum%20Strength%20of%20K%20Disjoint%20Subarrays.md)
