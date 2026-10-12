---
topic: LIS and Variants
pattern: [Fenwick prefix max, Key transform]
source: LeetCode 2926
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Balanced Subsequence Sum

> [!TIP]
> **🧠 Memory hook**
> Rewrite the rule: nums[i] − i must be **non-decreasing**, which is a weighted LIS on that key.
> **Mantra: key = nums[i] − i · dp[i] = nums[i] + max(0, best dp with key ≤ key[i])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=13) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
A subsequence is balanced if nums[i_j] − nums[i_{j−1}] ≥ i_j − i_{j−1}. Return the maximum sum of a balanced subsequence.

## Key insight
The condition becomes nums[i_j] − i_j ≥ nums[i_{j−1}] − i_{j−1}. dp[i] = nums[i] + the best dp among earlier keys not above key[i]. A Fenwick tree for prefix maxima over compressed keys answers each in O(log n).

## Approach: Fenwick tree
```java
// Balanced means nums[i] - i never decreases; Fenwick tree holds the best sum per key prefix
public long maxBalancedSubsequenceSum(int[] nums) {
    int n = nums.length;
    int[] keys = new int[n];
    for (int i = 0; i < n; i++) keys[i] = nums[i] - i;
    int[] sorted = Arrays.stream(keys).distinct().sorted().toArray();
    long[] tree = new long[sorted.length + 1];
    long ans = Long.MIN_VALUE;
    for (int i = 0; i < n; i++) {
        int pos = Arrays.binarySearch(sorted, keys[i]) + 1;
        long cur = nums[i] + Math.max(0, query(tree, pos));
        update(tree, pos, cur);
        ans = Math.max(ans, cur);
    }
    return ans;
}

// Maximum stored value over positions 1..i
private long query(long[] tree, int i) {
    long best = 0;
    for (; i > 0; i -= i & -i) best = Math.max(best, tree[i]);
    return best;
}

// Raises the stored value at position i to at least v
private void update(long[] tree, int i, long v) {
    for (; i < tree.length; i += i & -i) tree[i] = Math.max(tree[i], v);
}
```

| Approach | Time | Space |
|---|---|---|
| Fenwick tree | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Sums need long: n · 10⁹ overflows int.

## Recall before you reveal
<details><summary>Why max(0, ...)?</summary>

A negative earlier sum is better dropped.

</details>


<details><summary>Why compress?</summary>

Keys range over about ±10⁹.

</details>


## Connected
- [Longest Increasing Subsequence](Longest%20Increasing%20Subsequence.md)
- [Constrained Subsequence Sum](../../Heap/Constrained%20Subsequence%20Sum.md)
