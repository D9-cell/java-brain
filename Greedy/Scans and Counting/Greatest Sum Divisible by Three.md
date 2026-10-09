---
topic: Scans and Counting
pattern: [Remainders, Remove the cheapest]
source: LeetCode 1262
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Greatest Sum Divisible by Three

> [!TIP]
> **🧠 Memory hook**
> Take everything, then **remove the smallest numbers** that fix the remainder.
> **Mantra: sum % 3 = 1 → drop one r1 or two r2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=2) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Return the maximum sum of a subset of the numbers that is divisible by 3.

## Key insight
If `sum % 3 == 1`, remove the smallest number with remainder 1 or the two smallest with remainder 2, whichever loses less. Symmetric for remainder 2. A DP over the remainder gives the same result.

## Approach 1: Remove the cheapest
```java
// Take everything, then drop the cheapest elements that fix the remainder: one with remainder r, or two with the other remainder
public int maxSumDivThree(int[] nums) {
    int sum = 0;
    List<Integer> r1 = new ArrayList<>(), r2 = new ArrayList<>();
    for (int x : nums) { sum += x; if (x % 3 == 1) r1.add(x); else if (x % 3 == 2) r2.add(x); }
    Collections.sort(r1);
    Collections.sort(r2);
    if (sum % 3 == 0) return sum;
    int best = 0;
    if (sum % 3 == 1) {
        if (!r1.isEmpty()) best = Math.max(best, sum - r1.get(0));
        if (r2.size() >= 2) best = Math.max(best, sum - r2.get(0) - r2.get(1));
    } else {
        if (!r2.isEmpty()) best = Math.max(best, sum - r2.get(0));
        if (r1.size() >= 2) best = Math.max(best, sum - r1.get(0) - r1.get(1));
    }
    return best;
}
```

## Approach 2: DP over remainder
```java
// DP over the remainder of the sum so far
public int maxSumDivThreeDp(int[] nums) {
    int[] dp = {0, Integer.MIN_VALUE, Integer.MIN_VALUE};
    for (int x : nums) {
        int[] next = dp.clone();
        for (int rem = 0; rem < 3; rem++) if (dp[rem] != Integer.MIN_VALUE) next[(rem + x) % 3] = Math.max(next[(rem + x) % 3], dp[rem] + x);
        dp = next;
    }
    return dp[0];
}
```

| Approach | Time | Space |
|---|---|---|
| Remove the cheapest | O(n log n) | O(n) |
| DP over remainder | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why never remove three or more numbers?</summary>

Removing three numbers with the same remainder keeps the remainder; removing fewer is always better.

</details>


## Connected
- [Maximum Total Subarray Value I](Maximum%20Total%20Subarray%20Value%20I.md)
