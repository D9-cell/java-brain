---
topic: Difference Arrays
pattern: [Counts + prefix]
source: LeetCode 3346
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximum Frequency of an Element After Performing Operations I

> [!TIP]
> **🧠 Memory hook**
> For a target t, values already equal to t are free; others within **k** need one operation each. Answer **freq[t] + min(ops, near − freq[t])**.
> **Mantra: freq, prefix of freq · near = values in [t − k, t + k] · best over t**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=7) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
Each operation picks a new index and adds an integer in [−k, k] to it, at most numOperations times. Return the maximum frequency of any value.

## Key insight
Values are at most 10⁵, so every target can be tried with prefix counts. The target need not be in nums.

## Approach: Prefix counts
```java
// Values are small: count each value, prefix counts give how many values are within k of a target
public int maxFrequency(int[] nums, int k, int numOperations) {
    int max = 0;
    for (int x : nums) max = Math.max(max, x);
    int size = max + k + 2;
    int[] freq = new int[size], pre = new int[size + 1];
    for (int x : nums) freq[x]++;
    for (int v = 0; v < size; v++) pre[v + 1] = pre[v] + freq[v];
    int best = 0;
    for (int t = 0; t < size; t++) {
        int lo = Math.max(0, t - k), hi = Math.min(size - 1, t + k);
        int near = pre[hi + 1] - pre[lo];
        best = Math.max(best, freq[t] + Math.min(numOperations, near - freq[t]));
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix counts | O(max + k) | O(max + k) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why min with numOperations?</summary>

Each changed element uses one operation.

</details>


<details><summary>Large values?</summary>

Part II uses sorting and candidate targets.

</details>


## Connected
- [Maximum Frequency of an Element After Performing Operations II](Maximum%20Frequency%20of%20an%20Element%20After%20Performing%20Operations%20II.md)
- [Apply Operations to Maximize Frequency Score](../Rotated%20Arrays%20and%20Sorted%20Queries/Apply%20Operations%20to%20Maximize%20Frequency%20Score.md)
