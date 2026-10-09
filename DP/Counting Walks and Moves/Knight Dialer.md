---
topic: Counting Walks and Moves
pattern: [Layer per move, Move table]
source: LeetCode 935
difficulty: Medium
companies: [Google, Microsoft]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Knight Dialer

> [!TIP]
> **🧠 Memory hook**
> A knight hops on a **phone keypad**; each digit only knows a few neighbours.
> **Mantra: next[to] += ways[from] FOR EVERY KNIGHT MOVE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=0) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
A chess knight stands on a phone keypad digit and makes n − 1 valid knight jumps, dialling a digit each time it lands. How many distinct numbers of length n can it dial? Answer modulo 1e9+7.

## Key insight
Write down the 10 jump lists once (5 has none). Let `ways[d]` be the numbers of the current length that end on d. One more digit means pushing every count along its jump list. After n − 1 layers, sum the 10 counts.

## Approach 1: Layer per digit
```java
// Bottom-up: ways[d] = numbers of the current length that end on digit d
public int knightDialer(int n) {
    long[] ways = new long[10];
    Arrays.fill(ways, 1);
    for (int len = 2; len <= n; len++) {
        long[] next = new long[10];
        for (int d = 0; d < 10; d++)
            for (int to : MOVES[d]) next[to] = (next[to] + ways[d]) % MOD;
        ways = next;
    }
    long total = 0;
    for (long w : ways) total += w;
    return (int) (total % MOD);
}
```

## Approach 2: Top-down memo
```java
// Top-down: sum of count(d, n - 1) over every starting digit
public int knightDialerMemo(int n) {
    long[][] memo = new long[10][n];
    for (long[] row : memo) Arrays.fill(row, -1);
    long total = 0;
    for (int d = 0; d < 10; d++) total += count(d, n - 1, memo);
    return (int) (total % MOD);
}

// Numbers that start on digit d and still need left more digits
private long count(int d, int left, long[][] memo) {
    if (left == 0) return 1;
    if (memo[d][left] >= 0) return memo[d][left];
    long res = 0;
    for (int to : MOVES[d]) res = (res + count(to, left - 1, memo)) % MOD;
    return memo[d][left] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| Layer per digit | O(10 · n) | O(10) |
| Top-down memo | O(10 · n) | O(10 · n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does 5 matter at all?</summary>

Only for n = 1: it is a valid one-digit number, but no jump lands on or leaves it.

</details>


<details><summary>How to reach O(log n)?</summary>

The 10×10 jump matrix raised to the (n − 1)-th power.

</details>


## Connected
- [Count Vowels Permutation](Count%20Vowels%20Permutation.md)
- [Knight Probability in Chessboard](Knight%20Probability%20in%20Chessboard.md)
