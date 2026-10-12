---
topic: Scheduling and Partitions
pattern: [Window of starts, Deques + prefix sums]
source: LeetCode 3578
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Count Partitions With Max-Min Difference at Most K

> [!TIP]
> **🧠 Memory hook**
> The valid last-block starts form a **contiguous window**; their dp values are summed with a prefix array.
> **Mantra: ways[i] = prefix[i] − prefix[left]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Scheduling%20and%20Partitions/Scheduling%20and%20Partitions%20Animations.html#p=5) · **Pattern hub:** [Scheduling and Partitions - Pattern Map](Scheduling%20and%20Partitions%20-%20Pattern%20Map.md)

## Problem
Count the ways to split nums into contiguous subarrays where max − min ≤ k in each. Return the count mod 10⁹ + 7.

## Key insight
For each end i the allowed block starts are j in [left, i − 1]. As i grows, left only moves right. Two monotonic deques track the window's max and min, and a prefix sum gives the total of ways[j] over the window.

## Approach 1: Two deques + prefix
```java
// ways[i] = sum of ways[j] over starts j whose block nums[j..i) has max - min <= k; two deques find the window start
public int countPartitions(int[] nums, int k) {
    int n = nums.length;
    long[] ways = new long[n + 1], prefix = new long[n + 2];
    ways[0] = 1;
    prefix[1] = 1;
    Deque<Integer> maxQ = new ArrayDeque<>(), minQ = new ArrayDeque<>();
    int left = 0;
    for (int i = 1; i <= n; i++) {
        int x = nums[i - 1];
        while (!maxQ.isEmpty() && nums[maxQ.peekLast()] <= x) maxQ.pollLast();
        maxQ.addLast(i - 1);
        while (!minQ.isEmpty() && nums[minQ.peekLast()] >= x) minQ.pollLast();
        minQ.addLast(i - 1);
        while (nums[maxQ.peekFirst()] - nums[minQ.peekFirst()] > k) {
            left++;
            if (maxQ.peekFirst() < left) maxQ.pollFirst();
            if (minQ.peekFirst() < left) minQ.pollFirst();
        }
        ways[i] = ((prefix[i] - prefix[left]) % MOD + MOD) % MOD;
        prefix[i + 1] = (prefix[i] + ways[i]) % MOD;
    }
    return (int) ways[n];
}
```

## Approach 2: Plain O(n²)
```java
// Plain version: for each end i extend the block backwards while max - min stays within k
public int countPartitionsQuadratic(int[] nums, int k) {
    int n = nums.length;
    long[] ways = new long[n + 1];
    ways[0] = 1;
    for (int i = 1; i <= n; i++) {
        int mn = Integer.MAX_VALUE, mx = Integer.MIN_VALUE;
        for (int j = i; j >= 1; j--) {
            mn = Math.min(mn, nums[j - 1]);
            mx = Math.max(mx, nums[j - 1]);
            if (mx - mn > k) break;
            ways[i] = (ways[i] + ways[j - 1]) % MOD;
        }
    }
    return (int) ways[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Two deques + prefix | O(n) | O(n) |
| Plain O(n²) | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why monotonic left?</summary>

A longer block never has a smaller range.

</details>


<details><summary>Why prefix sums?</summary>

A window sum is two lookups.

</details>


## Connected
- [Constrained Subsequence Sum](../../Heap/Constrained%20Subsequence%20Sum.md)
- [Partition Array for Maximum Sum](Partition%20Array%20for%20Maximum%20Sum.md)
