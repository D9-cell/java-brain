---
topic: Scans and Counting
pattern: [GCD, Shortest subarray with gcd 1]
source: LeetCode 2654
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Number of Operations to Make All Array Elements Equal to 1

> [!TIP]
> **🧠 Memory hook**
> Create **one 1** with the shortest coprime window; then every other element costs one operation.
> **Mantra: ONES? n − ones; ELSE (shortest gcd-1 window − 1) + (n − 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=8) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
An operation replaces one of two adjacent elements by their gcd. Return the minimum operations to make all elements 1, or −1.

## Key insight
If the array contains ones each other element costs 1. Otherwise if the overall gcd is not 1 it is impossible. Else find the shortest subarray with gcd 1 (length L): L − 1 operations create a 1, then n − 1 spread it.

## Approach: Scan windows
```java
// An operation replaces one of two adjacent elements by their gcd. With ones present each other element costs 1; otherwise first create a 1 from the shortest subarray whose gcd is 1
public int minOperations(int[] nums) {
    int n = nums.length, ones = 0, g = 0;
    for (int x : nums) { if (x == 1) ones++; g = gcd(g, x); }
    if (ones > 0) return n - ones;
    if (g != 1) return -1;
    int shortest = n;
    for (int i = 0; i < n; i++) {
        int cur = 0;
        for (int j = i; j < n; j++) {
            cur = gcd(cur, nums[j]);
            if (cur == 1) { shortest = Math.min(shortest, j - i + 1); break; }
        }
    }
    return (shortest - 1) + (n - 1);
}

// Euclid
private int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
```

| Approach | Time | Space |
|---|---|---|
| Scan windows | O(n² log A) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a breadth-first search over arrays. Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the overall gcd a feasibility test?</summary>

Adjacent gcd operations can never produce a value smaller than the gcd of everything.

</details>


## Connected
- [Greatest Sum Divisible by Three](Greatest%20Sum%20Divisible%20by%20Three.md)
