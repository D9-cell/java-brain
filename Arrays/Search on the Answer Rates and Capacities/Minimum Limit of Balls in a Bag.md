---
topic: Search on the Answer Rates and Capacities
pattern: [Search on the answer]
source: LeetCode 1760
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Limit of Balls in a Bag

> [!TIP]
> **🧠 Memory hook**
> To make a bag of x balls all ≤ p takes **(x − 1) / p** splits. Find the smallest p within maxOperations.
> **Mantra: ops(mid) = Σ (x − 1) / mid ≤ max → hi = mid**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Rates%20and%20Capacities/Search%20on%20the%20Answer%20Rates%20and%20Capacities%20Animations.html#p=7) · **Pattern hub:** [Search on the Answer Rates and Capacities - Pattern Map](Search%20on%20the%20Answer%20Rates%20and%20Capacities%20-%20Pattern%20Map.md)

## Problem
An operation splits a bag into two non-empty bags. The penalty is the largest bag. Return the minimum penalty after at most maxOperations operations.

## Key insight
Splitting x into pieces of size ≤ p needs ⌈x / p⌉ pieces, which is ⌈x / p⌉ − 1 = (x − 1) / p splits.

## Approach: Binary search on penalty
```java
// Making every bag <= p costs (x - 1) / p splits per bag; find the smallest p within the budget
public int minimumSize(int[] nums, int maxOperations) {
    int lo = 1, hi = 0;
    for (int x : nums) hi = Math.max(hi, x);
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        long ops = 0;
        for (int x : nums) ops += (x - 1) / mid;
        if (ops <= maxOperations) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search on penalty | O(n log max) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why (x − 1) / p?</summary>

It equals ⌈x / p⌉ − 1.

</details>


<details><summary>Greedy splitting the biggest bag?</summary>

Fails; halving is not always optimal.

</details>


## Connected
- [Koko Eating Bananas](Koko%20Eating%20Bananas.md)
