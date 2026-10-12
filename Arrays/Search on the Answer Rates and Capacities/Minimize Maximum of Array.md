---
topic: Search on the Answer Rates and Capacities
pattern: [Prefix average, Search on the answer]
source: LeetCode 2439
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimize Maximum of Array

> [!TIP]
> **🧠 Memory hook**
> Values only move **left**. The first i + 1 elements can at best share their sum: answer = **max over prefixes of ⌈sum / (i + 1)⌉**.
> **Mantra: best = max ⌈prefix / (i+1)⌉ · OR search limit, pushing excess left**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=9) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
One operation decreases nums[i] by 1 and increases nums[i − 1] by 1 (i ≥ 1). Return the minimum possible maximum.

## Key insight
A prefix can never lose total value (nothing moves right), so its average rounded up is a lower bound, and moving excess left achieves it. The binary search version checks a limit by carrying excess leftwards.

## Approach 1: Prefix averages
```java
// Values only move left, so the first i + 1 elements can at best share their sum evenly
public int minimizeArrayValue(int[] nums) {
    long sum = 0, best = 0;
    for (int i = 0; i < nums.length; i++) {
        sum += nums[i];
        best = Math.max(best, (sum + i) / (i + 1));
    }
    return (int) best;
}
```

## Approach 2: Binary search on the limit
```java
// Binary search version: can every prefix stay under limit when excess moves left?
public int minimizeArrayValueSearch(int[] nums) {
    int lo = 0, hi = 0;
    for (int x : nums) hi = Math.max(hi, x);
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        long carry = 0;
        boolean ok = true;
        for (int i = nums.length - 1; i > 0; i--) carry = Math.max(0, nums[i] + carry - mid);
        if (nums[0] + carry > mid) ok = false;
        if (ok) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix averages | O(n) | O(1) |
| Binary search on the limit | O(n log max) | O(1) |

> [!WARNING]
> **Java gotcha**
> The two approaches were checked against each other and a carry simulation.

## Recall before you reveal
<details><summary>Why can a prefix not drop below its average?</summary>

Its sum never decreases.

</details>


<details><summary>Why carry excess left?</summary>

Excess can only go to earlier indexes.

</details>


## Connected
- [Minimum Limit of Balls in a Bag](Minimum%20Limit%20of%20Balls%20in%20a%20Bag.md)
