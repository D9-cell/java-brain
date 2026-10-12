---
topic: LIS and Variants
pattern: [Chain DP, Rebuild with prev]
source: LeetCode 368
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Largest Divisible Subset

> [!TIP]
> **🧠 Memory hook**
> After sorting, divisibility is **transitive**: checking only the last chosen element is enough.
> **Mantra: SORT; dp[i] = 1 + max dp[j] WHERE a[i] % a[j] == 0; KEEP prev[]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=6) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Given distinct positive integers, return the largest subset where every pair (x, y) satisfies x % y == 0 or y % x == 0.

## Key insight
In sorted order a chain a1 | a2 | a3 ... has every pair divisible, because a1 | a2 and a2 | a3 give a1 | a3. So the answer is a longest chain, and prev[] rebuilds it.

## Approach: Chain DP + prev
```java
// Sorted, a chain where each element divides the next; prev[] rebuilds the answer
public List<Integer> largestDivisibleSubset(int[] nums) {
    Arrays.sort(nums);
    int n = nums.length, bestEnd = 0;
    int[] dp = new int[n], prev = new int[n];
    for (int i = 0; i < n; i++) {
        dp[i] = 1;
        prev[i] = -1;
        for (int j = 0; j < i; j++)
            if (nums[i] % nums[j] == 0 && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        if (dp[i] > dp[bestEnd]) bestEnd = i;
    }
    LinkedList<Integer> res = new LinkedList<>();
    for (int i = bestEnd; i >= 0; i = prev[i]) res.addFirst(nums[i]);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Chain DP + prev | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why check only the previous element?</summary>

Divisibility is transitive on a sorted chain.

</details>


<details><summary>Duplicates?</summary>

The statement guarantees distinct values.

</details>


## Connected
- [Longest Increasing Subsequence](Longest%20Increasing%20Subsequence.md)
- [Longest String Chain](Longest%20String%20Chain.md)
