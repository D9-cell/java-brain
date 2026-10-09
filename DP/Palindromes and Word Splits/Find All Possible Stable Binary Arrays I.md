---
topic: Palindromes and Word Splits
pattern: [Build by runs, Memo over (zeros, ones, next symbol)]
source: LeetCode 3129
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Find All Possible Stable Binary Arrays I

> [!TIP]
> **🧠 Memory hook**
> A stable array is a sequence of **runs no longer than limit**, alternating between 0s and 1s.
> **Mantra: PLACE A RUN OF 1..limit, THEN SWITCH SYMBOL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=9) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
Count binary arrays with exactly `zero` zeros and `one` ones in which every subarray longer than limit contains both 0 and 1 (no run exceeds limit). Answer modulo 1e9+7.

## Key insight
Build the array run by run. The state is how many zeros and ones are left and which symbol the next run uses. A run takes 1..limit copies; the next run must use the other symbol.

## Approach: Memo over runs
```java
// Top-down: place the next run (1..limit copies) of the other symbol
public int numberOfStableArrays(int zero, int one, int limit) {
    long[][][] memo = new long[zero + 1][one + 1][2];
    for (long[][] a : memo) for (long[] b : a) Arrays.fill(b, -1);
    return (int) ((runs(zero, one, 0, limit, memo) + runs(zero, one, 1, limit, memo)) % MOD);
}

// Arrays using z zeros and o ones whose first run is of symbol `first`
private long runs(int z, int o, int first, int limit, long[][][] memo) {
    if (z == 0 && o == 0) return 0;
    if (memo[z][o][first] >= 0) return memo[z][o][first];
    int have = first == 0 ? z : o;
    long res = 0;
    for (int len = 1; len <= Math.min(limit, have); len++) {
        int nz = first == 0 ? z - len : z, no = first == 1 ? o - len : o;
        if (nz == 0 && no == 0) res++;
        else res += runs(nz, no, 1 - first, limit, memo);
    }
    return memo[z][o][first] = res % MOD;
}
```

| Approach | Time | Space |
|---|---|---|
| Memo over runs | O(zero · one · limit) | O(zero · one) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does "subarray longer than limit has both" mean "no long run"?</summary>

A run of limit + 1 equal symbols is exactly such a bad subarray.

</details>


<details><summary>Bigger inputs?</summary>

Version II removes the limit factor with a subtraction.

</details>


## Connected
- [Find All Possible Stable Binary Arrays II](Find%20All%20Possible%20Stable%20Binary%20Arrays%20II.md)
- [Student Attendance Record II](../Counting%20Walks%20and%20Moves/Student%20Attendance%20Record%20II.md)
