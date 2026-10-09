---
topic: Sliding Window
pattern: [Fixed window]
source: LeetCode 2090
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# K Radius Subarray Averages

> [!TIP]
> **🧠 Memory hook**
> A magnifier of width 2k + 1 centred on each index.
> **Mantra: FIXED WINDOW 2k+1, WRITE AT CENTRE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=26) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
For each i, the integer average of nums[i−k..i+k], or −1 if it does not fit.

## Key insight
A fixed window of 2k + 1 whose result is written at its centre.

## Approach: Fixed window
```java
// Fixed window of 2k + 1 centred at i: slide the long sum and write the average at the centre
public int[] getAverages(int[] nums, int k) {
    int n = nums.length;
    if (k == 0) return nums.clone();
    int[] result = new int[n];
    Arrays.fill(result, -1);
    if (n < 2 * k + 1) return result;
    long sum = 0;
    for (int t = 0; t <= 2 * k; t++) sum += nums[t];
    result[k] = (int) (sum / (2 * k + 1));
    for (int left = 0, right = 2 * k + 1, i = k + 1; right < n; left++, right++, i++) {
        sum += nums[right] - nums[left];
        result[i] = (int) (sum / (2 * k + 1));
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Fixed window | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> The sum reaches 1e5 · 1e5: use long. Verified against brute force.

## Recall before you reveal
<details><summary>Edge cases?</summary>

k = 0 returns nums; n < 2k + 1 gives all −1.

</details>


<details><summary>Prefix alternative?</summary>

Arrays folder: prefix sums.

</details>

