---
topic: LIS and Variants
pattern: [Keyed by difference, Counting]
source: LeetCode 446
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Arithmetic Slices II - Subsequence

> [!TIP]
> **🧠 Memory hook**
> Count **weak** (length ≥ 2) arithmetic subsequences ending at j; every one that already existed becomes a real slice when extended.
> **Mantra: total += cnt[j][d] · cnt[i][d] += cnt[j][d] + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=18) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Count the arithmetic subsequences of length at least 3.

## Key insight
cnt[i][d] counts subsequences of length ≥ 2 ending at i with difference d. For j < i, cnt[j][d] of them extend to length ≥ 3 (these add to the answer) and the pair (j, i) itself adds one weak sequence.

## Approach: Maps of counts
```java
// cnt[i].get(d) = arithmetic subsequences of length >= 2 ending at i with difference d
public int numberOfArithmeticSlices(int[] nums) {
    int n = nums.length;
    long total = 0;
    List<Map<Long, Integer>> cnt = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        Map<Long, Integer> cur = new HashMap<>();
        for (int j = 0; j < i; j++) {
            long d = (long) nums[i] - nums[j];
            int ending = cnt.get(j).getOrDefault(d, 0);
            total += ending;
            cur.merge(d, ending + 1, Integer::sum);
        }
        cnt.add(cur);
    }
    return (int) total;
}
```

| Approach | Time | Space |
|---|---|---|
| Maps of counts | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Use long for the difference d; int subtraction overflows for extreme values.

## Recall before you reveal
<details><summary>Why long for the difference?</summary>

nums[i] − nums[j] can reach about ±4·10⁹.

</details>


<details><summary>Why add 1?</summary>

The new pair is itself a length-2 sequence.

</details>


## Connected
- [Longest Arithmetic Subsequence](Longest%20Arithmetic%20Subsequence.md)
- [Arithmetic Slices](../Stock%20and%20Kadane%20States/Arithmetic%20Slices.md)
