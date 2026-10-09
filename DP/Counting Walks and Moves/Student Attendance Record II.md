---
topic: Counting Walks and Moves
pattern: [State with memory, Automaton DP]
source: LeetCode 552
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Student Attendance Record II

> [!TIP]
> **🧠 Memory hook**
> A record is a little **machine with 6 lights**: absences used (0 or 1) × lates in a row (0, 1 or 2).
> **Mantra: dp[a][l]: P → l=0 · A → a+1, l=0 · L → l+1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=2) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Records are strings over P (present), A (absent) and L (late). A record is rewarded if it has fewer than 2 A in total and never 3 L in a row. Count rewarded records of length n, modulo 1e9+7.

## Key insight
Only two facts decide the future: how many A are used and how many L end the record. That gives 2 × 3 states. Each day, P resets the late streak, A uses the one allowed absence, L extends the streak up to 2.

## Approach 1: 6-state layers
```java
// dp[a][l] = records with a absences so far and l trailing lates
public int checkRecord(int n) {
    long[][] dp = new long[2][3];
    dp[0][0] = 1;
    for (int day = 0; day < n; day++) {
        long[][] next = new long[2][3];
        for (int a = 0; a < 2; a++)
            for (int l = 0; l < 3; l++) {
                long v = dp[a][l];
                next[a][0] = (next[a][0] + v) % MOD;
                if (a == 0) next[1][0] = (next[1][0] + v) % MOD;
                if (l < 2) next[a][l + 1] = (next[a][l + 1] + v) % MOD;
            }
        dp = next;
    }
    long total = 0;
    for (long[] row : dp) for (long v : row) total += v;
    return (int) (total % MOD);
}
```

## Approach 2: Top-down memo
```java
// Top-down over (days left, absences used, trailing lates)
public int checkRecordMemo(int n) {
    long[][][] memo = new long[n + 1][2][3];
    for (long[][] a : memo) for (long[] b : a) Arrays.fill(b, -1);
    return (int) go(n, 0, 0, memo);
}

// Records that can still be written with left days remaining
private long go(int left, int a, int l, long[][][] memo) {
    if (left == 0) return 1;
    if (memo[left][a][l] >= 0) return memo[left][a][l];
    long res = go(left - 1, a, 0, memo);
    if (a == 0) res += go(left - 1, 1, 0, memo);
    if (l < 2) res += go(left - 1, a, l + 1, memo);
    return memo[left][a][l] = res % MOD;
}
```

| Approach | Time | Space |
|---|---|---|
| 6-state layers | O(n) | O(1) |
| Top-down memo | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why not remember the whole string?</summary>

The rules only look at the absence count and the trailing L run.

</details>


<details><summary>Recursion risk?</summary>

The memo recursion is n deep: fine for interviews, but bottom-up avoids a stack overflow at n = 10⁵.

</details>


## Connected
- [Count Vowels Permutation](Count%20Vowels%20Permutation.md)
- [Paint House](Paint%20House.md)
