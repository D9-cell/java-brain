---
topic: LIS and Variants
pattern: [Greedy, Chain DP]
source: LeetCode 646
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Length of Pair Chain

> [!TIP]
> **🧠 Memory hook**
> Sorting by **right end** and taking whatever fits is activity selection.
> **Mantra: SORT BY END → TAKE IF START > LAST END**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=4) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Pairs [a, b] with a < b. Pair (c, d) follows (a, b) if b < c. Return the longest chain you can form (pairs may be used in any order).

## Key insight
The chain DP sorts by start and checks dp[i] = 1 + max dp[j] with pairs[j][1] < pairs[i][0]. The greedy sorts by end and always keeps the pair that finishes earliest, which leaves the most room.

## Approach 1: Greedy by end
```java
// Sort by right end, then take every pair that starts after the last chosen end
public int findLongestChain(int[][] pairs) {
    Arrays.sort(pairs, (a, b) -> Integer.compare(a[1], b[1]));
    int count = 0, end = Integer.MIN_VALUE;
    for (int[] p : pairs) {
        if (p[0] > end) {
            count++;
            end = p[1];
        }
    }
    return count;
}
```

## Approach 2: Chain DP
```java
// Sort by left end, then LIS-style dp over chains ending at each pair
public int findLongestChainDp(int[][] pairs) {
    Arrays.sort(pairs, (a, b) -> Integer.compare(a[0], b[0]));
    int n = pairs.length, best = 1;
    int[] dp = new int[n];
    for (int i = 0; i < n; i++) {
        dp[i] = 1;
        for (int j = 0; j < i; j++) if (pairs[j][1] < pairs[i][0]) dp[i] = Math.max(dp[i], dp[j] + 1);
        best = Math.max(best, dp[i]);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy by end | O(n log n) | O(1) |
| Chain DP | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why end and not start?</summary>

Finishing early leaves the most room; an early start can still end late.

</details>


<details><summary>Same as which greedy problem?</summary>

Non-overlapping Intervals / activity selection.

</details>


## Connected
- [Russian Doll Envelopes](Russian%20Doll%20Envelopes.md)
- [Longest Increasing Subsequence](Longest%20Increasing%20Subsequence.md)
- [Non-overlapping Intervals](../../Greedy/Intervals%20and%20Scheduling/Non-overlapping%20Intervals.md)
