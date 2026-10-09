---
topic: Strings and Digits
pattern: [Monotonic stack, Lexicographically smallest subsequence]
source: LeetCode 1673
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Find the Most Competitive Subsequence

> [!TIP]
> **🧠 Memory hook**
> Keep a stack of small values; **pop a bigger one** when a smaller value arrives and enough elements remain.
> **Mantra: POP IF TOP > x AND ENOUGH ELEMENTS LEFT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=1) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Return the lexicographically smallest subsequence of length k.

## Key insight
Use a stack. Before pushing `x`, pop larger tops as long as the remaining elements can still fill the k places. Equivalent: for each output position pick the minimum in the allowed window (first occurrence).

## Approach 1: Monotonic stack
```java
// Monotonic stack: pop larger values while enough elements remain to still fill k places
public int[] mostCompetitive(int[] nums, int k) {
    int[] st = new int[k];
    int size = 0, n = nums.length;
    for (int i = 0; i < n; i++) {
        while (size > 0 && st[size - 1] > nums[i] && size - 1 + (n - i) >= k) size--;
        if (size < k) st[size++] = nums[i];
    }
    return st;
}
```

## Approach 2: Windows of minima
```java
// Window version: pick the minimum of nums[from .. n - (k - j)] for every position j (first occurrence)
public int[] mostCompetitiveWindows(int[] nums, int k) {
    int[] res = new int[k];
    int from = 0, n = nums.length;
    for (int j = 0; j < k; j++) {
        int best = from;
        for (int i = from; i <= n - (k - j); i++) if (nums[i] < nums[best]) best = i;
        res[j] = nums[best];
        from = best + 1;
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Monotonic stack | O(n) | O(k) |
| Windows of minima | O(n k) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>What is "enough elements left"?</summary>

`size - 1 + (n - i) >= k`: after popping, the stack plus the elements from i onward must still reach k.

</details>


## Connected
- [Remove K Digits](../../Stack/Remove%20K%20Digits.md)
- [Smallest String With A Given Numeric Value](Smallest%20String%20With%20A%20Given%20Numeric%20Value.md)
