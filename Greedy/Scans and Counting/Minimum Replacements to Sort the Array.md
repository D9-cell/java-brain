---
topic: Scans and Counting
pattern: [Work from the right, Equal split]
source: LeetCode 2366
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Replacements to Sort the Array

> [!TIP]
> **🧠 Memory hook**
> Walk **right to left** keeping the largest value the left side may reach; split big numbers into the **fewest equal parts**.
> **Mantra: parts = ceil(x / limit), NEW LIMIT = x / parts**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=6) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
An operation replaces an element by two positive integers that sum to it. Return the minimum operations to make the array non-decreasing.

## Key insight
Start from the right with `limit = last element`. If `nums[i] > limit`, split it into `k = ceil(nums[i] / limit)` pieces (k − 1 operations) as equal as possible; the smallest piece `nums[i] / k` is the new limit. This keeps the limit as large as possible for the left side.

## Approach: Right-to-left splitting
```java
// Go from the right keeping the largest allowed value. Splitting x into k = ceil(x / limit) equal-ish parts costs k - 1, and the smallest part becomes the new limit
public long minimumReplacement(int[] nums) {
    int n = nums.length;
    long ops = 0;
    int limit = nums[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        if (nums[i] <= limit) { limit = nums[i]; continue; }
        int parts = (nums[i] + limit - 1) / limit;
        ops += parts - 1;
        limit = nums[i] / parts;
    }
    return ops;
}
```

| Approach | Time | Space |
|---|---|---|
| Right-to-left splitting | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a DP that tries every ascending split. Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why equal parts?</summary>

They maximise the smallest piece, which is what the left neighbour must stay below.

</details>


## Connected
- [Broken Calculator](Broken%20Calculator.md)
