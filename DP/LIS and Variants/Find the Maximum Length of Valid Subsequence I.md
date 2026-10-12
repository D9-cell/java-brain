---
topic: LIS and Variants
pattern: [Parity cases, Greedy count]
source: LeetCode 3201
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Find the Maximum Length of Valid Subsequence I

> [!TIP]
> **🧠 Memory hook**
> Every adjacent sum has the same parity, so only **three shapes** exist.
> **Mantra: MAX(all even, all odd, alternating)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=10) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Return the longest subsequence where (sub[i] + sub[i+1]) % 2 is the same for all adjacent pairs.

## Key insight
Sums that are always even need equal parities (all even or all odd). Sums that are always odd need alternating parities, which greedily counts every parity change.

## Approach: Three counters
```java
// Adjacent sums share one parity: all even, all odd, or strictly alternating parity
public int maximumLength(int[] nums) {
    int even = 0, odd = 0, alt = 0, last = -1;
    for (int x : nums) {
        int p = x & 1;
        if (p == 0) even++;
        else odd++;
        if (p != last) {
            alt++;
            last = p;
        }
    }
    return Math.max(alt, Math.max(even, odd));
}
```

| Approach | Time | Space |
|---|---|---|
| Three counters | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why greedy for alternating?</summary>

Taking the next element of the other parity never blocks a longer chain.

</details>


<details><summary>General k?</summary>

Part II tracks residues.

</details>


## Connected
- [Find the Maximum Length of Valid Subsequence II](Find%20the%20Maximum%20Length%20of%20Valid%20Subsequence%20II.md)
