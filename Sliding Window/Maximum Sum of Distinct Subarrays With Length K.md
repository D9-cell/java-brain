---
topic: Sliding Window
pattern: [Fixed window, HashSet]
source: LeetCode 2461
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Maximum Sum of Distinct Subarrays With Length K

> [!TIP]
> **🧠 Memory hook**
> A no-duplicates club: a returning member pushes everyone out until their old copy leaves.
> **Mantra: EVICT UNTIL nums[j] NOT IN SET**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=38) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Maximum sum of a length-k subarray with all distinct elements (0 if none).

## Key insight
Before adding nums[j], evict from the left until it is not in the window; record windows of exactly k.

## Approach: Window + set
```java
// Before adding nums[j], evict from the left until it is not in the window; record windows of size k
public long maximumSubarraySum(int[] nums, int k) {
    Set<Integer> win = new HashSet<>();
    long result = 0, sum = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        while (win.contains(nums[j])) {
            sum -= nums[i];
            win.remove(nums[i++]);
        }
        sum += nums[j];
        win.add(nums[j]);
        if (j - i + 1 == k) {
            result = Math.max(result, sum);
            sum -= nums[i];
            win.remove(nums[i++]);
        }
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Window + set | O(n) | O(k) |

> [!WARNING]
> **Java gotcha**
> Return long. Verified against checking each window.

## Recall before you reveal
<details><summary>Faster eviction?</summary>

Jump i past the last index of nums[j].

</details>

