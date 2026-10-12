---
topic: Prefix Variants
pattern: [Best so far]
source: LeetCode 1031
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximum Sum of Two Non-Overlapping Subarrays

> [!TIP]
> **🧠 Memory hook**
> For each position of the **second** block keep the **best first block ending before it**. Try both orders.
> **Mantra: pre · FOR end: bestA = max(bestA, A-block before) · best = max(bestA + B-block)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=2) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
Return the maximum sum of two non-overlapping subarrays of lengths firstLen and secondLen (either may come first).

## Key insight
Both block sums come from the prefix array. Running the same scan with the lengths swapped covers the other order.

## Approach: Prefix + best earlier block
```java
// Try both orders; for each end of the second block keep the best first block ending before it
public int maxSumTwoNoOverlap(int[] nums, int firstLen, int secondLen) {
    return Math.max(best(nums, firstLen, secondLen), best(nums, secondLen, firstLen));
}

// Best sum with an a-length block somewhere before a b-length block
int best(int[] nums, int a, int b) {
    int n = nums.length;
    int[] pre = new int[n + 1];
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
    int bestA = 0, result = 0;
    for (int end = a + b; end <= n; end++) {
        bestA = Math.max(bestA, pre[end - b] - pre[end - b - a]);
        result = Math.max(result, bestA + pre[end] - pre[end - b]);
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix + best earlier block | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why try both orders?</summary>

Either block may be on the left.

</details>


<details><summary>Three blocks?</summary>

Keep best-left and best-right arrays and scan the middle.

</details>


## Connected
- [Best Sightseeing Pair](Best%20Sightseeing%20Pair.md)
- [Maximum Sum of 3 Non-Overlapping Subarrays](../../DP/Stock%20and%20Kadane%20States/Maximum%20Sum%20of%203%20Non-Overlapping%20Subarrays.md)
