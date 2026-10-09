---
topic: Backtracking
pattern: [Partition into groups]
source: LeetCode 698
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Partition to K Equal Sum Subsets

> [!TIP]
> **🧠 Memory hook**
> Fill one jar at a time; when it is full start the next from the beginning.
> **Mantra: BUCKET BY BUCKET, k==1 → TRUE, TWIN RULE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=21) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Can nums be split into k subsets with equal sums?

## Key insight
Fill one bucket at a time with used[]; when full, start the next bucket from index 0. The last bucket is automatic.

## Approach: Bucket-by-bucket
```java
// Approach 2 (no bucket array): fill one bucket at a time; when it reaches target start the next from index 0
private boolean fill(int[] a, boolean[] used, int start, int k, int cur, int target) {
    if (k == 1) return true;
    if (cur == target) return fill(a, used, 0, k - 1, 0, target);
    for (int i = start; i < a.length; i++) {
        if (used[i] || cur + a[i] > target) continue;
        if (i > 0 && a[i] == a[i - 1] && !used[i - 1]) continue;
        used[i] = true;
        if (fill(a, used, i + 1, k, cur + a[i], target)) return true;
        used[i] = false;
    }
    return false;
}

// Sort descending so big numbers fail fast
public boolean canPartitionKSubsets(int[] nums, int k) {
    int sum = Arrays.stream(nums).sum();
    if (sum % k != 0) return false;
    int[] a = Arrays.stream(nums).boxed().sorted(Collections.reverseOrder()).mapToInt(Integer::intValue).toArray();
    if (a[0] > sum / k) return false;
    return fill(a, new boolean[a.length], 0, k, 0, sum / k);
}
```

| Approach | Time | Space |
|---|---|---|
| Bucket-by-bucket | O(k · 2^n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against all k^n assignments.

## Recall before you reveal
<details><summary>Other style?</summary>

Put each number into each of k buckets (with an equal-bucket skip).

</details>


## Connected
- [Matchsticks to Square](Matchsticks%20to%20Square.md)
- [Fair Distribution of Cookies](Fair%20Distribution%20of%20Cookies.md)
