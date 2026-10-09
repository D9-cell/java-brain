---
topic: Counting Walks and Moves
pattern: [Budgets in the state, Order of operations]
source: LeetCode 3366
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Minimum Array Sum

> [!TIP]
> **🧠 Memory hook**
> Two coupons per index: **halve** (round up) and **subtract k**. Spend them where they shrink most.
> **Mantra: MEMO (i, op1 left, op2 left); BOTH = min(ceil(x/2) − k, ceil((x − k)/2))**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=23) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Operation 1 replaces nums[i] by ceil(nums[i] / 2); operation 2 subtracts k if nums[i] ≥ k. Each operation can be applied at most once per index, and at most op1 and op2 times in total. Return the minimum possible sum.

## Key insight
State: index and the two remaining budgets. At each index try nothing, op1, op2 (if allowed) or both. With both, the order matters: subtract-then-halve is usually smaller, but halving first is only valid if the half is still ≥ k, so take the better legal order.

## Approach: Memo over (i, op1, op2)
```java
// Top-down over (index, op1 left, op2 left) trying none, one, the other, or both in the better order
public int minArraySum(int[] nums, int k, int op1, int op2) {
    Integer[][][] memo = new Integer[nums.length][op1 + 1][op2 + 1];
    return best(nums, k, 0, op1, op2, memo);
}

// Smallest sum of nums[i..] with the given operations left
private int best(int[] a, int k, int i, int o1, int o2, Integer[][][] memo) {
    if (i == a.length) return 0;
    if (memo[i][o1][o2] != null) return memo[i][o1][o2];
    int x = a[i];
    int res = x + best(a, k, i + 1, o1, o2, memo);
    if (o1 > 0) res = Math.min(res, (x + 1) / 2 + best(a, k, i + 1, o1 - 1, o2, memo));
    if (o2 > 0 && x >= k) res = Math.min(res, x - k + best(a, k, i + 1, o1, o2 - 1, memo));
    if (o1 > 0 && o2 > 0) {
        int both = Integer.MAX_VALUE;
        if ((x + 1) / 2 >= k) both = (x + 1) / 2 - k;
        if (x >= k) both = Math.min(both, (x - k + 1) / 2);
        if (both != Integer.MAX_VALUE) res = Math.min(res, both + best(a, k, i + 1, o1 - 1, o2 - 1, memo));
    }
    return memo[i][o1][o2] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| Memo over (i, op1, op2) | O(n · op1 · op2) | O(n · op1 · op2) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does order matter?</summary>

Halving after subtracting halves k too: (x − k) / 2 vs x / 2 − k.

</details>


<details><summary>Greedy alternative?</summary>

Exists but subtle; the 3-D memo is the safe interview answer.

</details>


## Connected
- [Paint House](Paint%20House.md)
- [Ones and Zeroes](../Knapsack%20Series/Ones%20and%20Zeroes.md)
