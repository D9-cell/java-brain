---
topic: LIS and Variants
pattern: [Chain DP, Tails array]
source: LeetCode 300
difficulty: Medium
companies: [Amazon, Google, Microsoft, Meta]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Longest Increasing Subsequence

> [!TIP]
> **🧠 Memory hook**
> Remember, for every length, the **smallest tail** you can end with: a smaller tail is always easier to extend.
> **Mantra: dp[i] = 1 + max dp[j] (j < i, a[j] < a[i]) · OR TAILS + BINARY SEARCH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=0) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest strictly increasing subsequence of nums.

## Key insight
dp[i] is the longest increasing subsequence ending at i. For speed, tails[k] holds the smallest last value of any increasing subsequence of length k + 1. tails stays sorted, so each new value replaces the first tail that is at least as large (or extends the array).

## Approach 1: Chain DP
```java
// dp[i] = longest increasing subsequence ending at i
public int lengthOfLIS(int[] nums) {
    int[] dp = new int[nums.length];
    int best = 0;
    for (int i = 0; i < nums.length; i++) {
        dp[i] = 1;
        for (int j = 0; j < i; j++) if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
        best = Math.max(best, dp[i]);
    }
    return best;
}
```

## Approach 2: Tails + binary search
```java
// tails[k] = smallest tail of an increasing subsequence of length k + 1
public int lengthOfLISTails(int[] nums) {
    int[] tails = new int[nums.length];
    int size = 0;
    for (int x : nums) {
        int pos = lowerBound(tails, size, x);
        tails[pos] = x;
        if (pos == size) size++;
    }
    return size;
}

// First index in a[0..size) whose value is at least x
private int lowerBound(int[] a, int size, int x) {
    int lo = 0, hi = size;
    while (lo < hi) {
        int mid = (lo + hi) >>> 1;
        if (a[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Chain DP | O(n²) | O(n) |
| Tails + binary search | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Is tails the subsequence itself?</summary>

No. Only its length is right; the values mix several candidate subsequences.

</details>


<details><summary>Why lower bound for strict?</summary>

An equal value must replace, not extend, or duplicates would count.

</details>


## Connected
- [Number of Longest Increasing Subsequence](Number%20of%20Longest%20Increasing%20Subsequence.md)
- [Russian Doll Envelopes](Russian%20Doll%20Envelopes.md)
- [Longest Common Subsequence](../Strings%20and%20Subsequences/Longest%20Common%20Subsequence.md)
