---
topic: Recursion
pattern: [Partition recursion, Pruning]
source: LeetCode 2698
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Find the Punishment Number of an Integer

> [!TIP]
> **🧠 Memory hook**
> A chocolate bar of digits: snap off 1–4 digits from the end and see if the pieces add up to i.
> **Mantra: PEEL 1–4 DIGITS (%, /), PRUNE sum > i**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=18) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Sum i² for 1 ≤ i ≤ n where the decimal digits of i² can be partitioned into numbers summing to i.

## Key insight
Try every split of the digit string. The arithmetic version peels the last 1–4 digits with % and /.

## Approach 1: String cuts + memo
```java
// Approach 1: cut the digit string at every position; memo on (index, running sum)
static boolean check(int i, int sum, String s, int target, int[][] memo) {
    if (i == s.length()) return sum == target;
    if (sum > target) return false;
    if (memo[i][sum] != -1) return memo[i][sum] == 1;
    for (int j = i; j < s.length(); j++) {
        if (check(j + 1, sum + Integer.parseInt(s.substring(i, j + 1)), s, target, memo)) return (memo[i][sum] = 1) == 1;
    }
    memo[i][sum] = 0;
    return false;
}

// Approach 1 entry point
public int punishmentNumberMemo(int n) {
    int total = 0;
    for (int x = 1; x <= n; x++) {
        String s = String.valueOf(x * x);
        int[][] memo = new int[s.length()][x + 1];
        for (int[] row : memo) java.util.Arrays.fill(row, -1);
        if (check(0, 0, s, x, memo)) total += x * x;
    }
    return total;
}
```

## Approach 2: Arithmetic peeling
```java
// Approach 2: peel 1, 2, 3 or 4 trailing digits with % and / (squares here have at most 7 digits)
static boolean canSplit(int num, int sum, int target) {
    if (num == 0) return sum == target;
    if (sum > target) return false;
    return canSplit(num / 10, sum + num % 10, target) || canSplit(num / 100, sum + num % 100, target)
            || canSplit(num / 1000, sum + num % 1000, target) || canSplit(num / 10000, sum + num % 10000, target);
}

// Approach 2 entry point
public int punishmentNumber(int n) {
    int total = 0;
    for (int x = 1; x <= n; x++) if (canSplit(x * x, 0, x)) total += x * x;
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| String cuts + memo | O(n · 2^digits) | O(digits · n) |
| Arithmetic peeling | O(n · 2^digits) | O(digits) |

## Recall before you reveal
<details><summary>Why 4 peels are enough?</summary>

i ≤ 1000, so the parts that matter have at most 4 digits.

</details>


## Connected
- [Regular Expression Matching](Regular%20Expression%20Matching.md) (memo)
