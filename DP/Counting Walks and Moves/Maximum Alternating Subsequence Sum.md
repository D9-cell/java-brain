---
topic: Counting Walks and Moves
pattern: [Two-state DP, Sign as state]
source: LeetCode 1911
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximum Alternating Subsequence Sum

> [!TIP]
> **🧠 Memory hook**
> Pick numbers as **+ − + − …**; the only memory is which sign comes next.
> **Mantra: plus = max(plus, minus + x) · minus = max(minus, plus − x)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=5) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
The alternating sum of a sequence is a0 − a1 + a2 − a3 + … Return the maximum alternating sum of any subsequence of nums (all positive).

## Key insight
Keep two bests: `plus` (the last chosen number was added) and `minus` (the last was subtracted). Each new number may extend either state with the opposite sign, or be skipped.

## Approach 1: Two rolling states
```java
// plus = best sum whose last pick was added, minus = best sum whose last pick was subtracted
public long maxAlternatingSum(int[] nums) {
    long plus = 0, minus = 0;
    for (int x : nums) {
        long np = Math.max(plus, minus + x), nm = Math.max(minus, plus - x);
        plus = np; minus = nm;
    }
    return plus;
}
```

## Approach 2: Top-down memo
```java
// Top-down: at index i either skip, or pick with the sign that is due
public long maxAlternatingSumMemo(int[] nums) {
    Long[][] memo = new Long[nums.length][2];
    return go(nums, 0, 0, memo);
}

// Best sum from i onward when the next pick is added (sign 0) or subtracted (sign 1)
private long go(int[] a, int i, int sign, Long[][] memo) {
    if (i == a.length) return 0;
    if (memo[i][sign] != null) return memo[i][sign];
    long pick = (sign == 0 ? a[i] : -a[i]) + go(a, i + 1, 1 - sign, memo);
    return memo[i][sign] = Math.max(pick, go(a, i + 1, sign, memo));
}
```

| Approach | Time | Space |
|---|---|---|
| Two rolling states | O(n) | O(1) |
| Top-down memo | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Greedy view?</summary>

Sum every rise a[i] − a[i−1] > 0 plus the first element: like Best Time to Buy and Sell Stock II.

</details>


<details><summary>Why is the answer `plus`?</summary>

Ending on a subtraction never helps when all numbers are positive.

</details>


## Connected
- [Reducing Dishes](Reducing%20Dishes.md)
- [Best Time to Buy and Sell Stock with Cooldown](../Stock%20and%20Kadane%20States/Best%20Time%20to%20Buy%20and%20Sell%20Stock%20with%20Cooldown.md)
