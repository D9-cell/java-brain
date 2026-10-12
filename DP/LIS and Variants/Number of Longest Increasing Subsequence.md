---
topic: LIS and Variants
pattern: [Chain DP, Count with length]
source: LeetCode 673
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Number of Longest Increasing Subsequence

> [!TIP]
> **🧠 Memory hook**
> Carry **two numbers per index**: the best length and how many ways reach it.
> **Mantra: LONGER → copy the count · EQUAL → add the count**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=1) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Return how many longest strictly increasing subsequences nums has.

## Key insight
len[i] and cnt[i] describe subsequences ending at i. When j gives a longer chain than seen so far, cnt[i] restarts from cnt[j]; when it ties, cnt[i] adds cnt[j]. The answer sums cnt over every i whose len equals the global best.

## Approach: Length + count
```java
// len[i] = LIS length ending at i, cnt[i] = how many such subsequences
public int findNumberOfLIS(int[] nums) {
    int n = nums.length, best = 0, ways = 0;
    int[] len = new int[n], cnt = new int[n];
    for (int i = 0; i < n; i++) {
        len[i] = 1;
        cnt[i] = 1;
        for (int j = 0; j < i; j++) {
            if (nums[j] >= nums[i]) continue;
            if (len[j] + 1 > len[i]) {
                len[i] = len[j] + 1;
                cnt[i] = cnt[j];
            } else if (len[j] + 1 == len[i]) cnt[i] += cnt[j];
        }
        if (len[i] > best) {
            best = len[i];
            ways = cnt[i];
        } else if (len[i] == best) ways += cnt[i];
    }
    return ways;
}
```

| Approach | Time | Space |
|---|---|---|
| Length + count | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why not sum cnt of the last index?</summary>

A longest subsequence may end at any index.

</details>


<details><summary>Faster?</summary>

A Fenwick tree over compressed values gives O(n log n).

</details>


## Connected
- [Longest Increasing Subsequence](Longest%20Increasing%20Subsequence.md)
