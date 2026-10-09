---
topic: Counting Walks and Moves
pattern: [Layer per letter, Rolling variables]
source: LeetCode 1220
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Count Vowels Permutation

> [!TIP]
> **🧠 Memory hook**
> Five vowels with a **"who may follow whom"** list: a graph with 5 nodes.
> **Mantra: ENDING-IN COUNTS; a ← e,i,u · e ← a,i · i ← e,o · o ← i · u ← i,o**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=1) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Count strings of length n made of vowels where a is followed only by e; e by a or i; i by anything except i; o by i or u; u by a. Answer modulo 1e9+7.

## Key insight
Flip the rules into "who may come before me". Then the count of strings ending in each vowel is the sum of the counts ending in its allowed predecessors. Five rolling variables are enough.

## Approach 1: Five rolling counts
```java
// Rolling counts of valid strings ending in a, e, i, o, u
public int countVowelPermutation(int n) {
    long a = 1, e = 1, i = 1, o = 1, u = 1;
    for (int len = 2; len <= n; len++) {
        long na = (e + i + u) % MOD, ne = (a + i) % MOD, ni = (e + o) % MOD, no = i, nu = (i + o) % MOD;
        a = na; e = ne; i = ni; o = no; u = nu;
    }
    return (int) ((a + e + i + o + u) % MOD);
}
```

## Approach 2: Top-down memo
```java
// Top-down: strings that start with vowel v and have left more letters to place
public int countVowelPermutationMemo(int n) {
    long[][] memo = new long[5][n];
    for (long[] row : memo) Arrays.fill(row, -1);
    long total = 0;
    for (int v = 0; v < 5; v++) total += count(v, n - 1, memo);
    return (int) (total % MOD);
}

// Ways to extend a string that currently ends in v by left more letters
private long count(int v, int left, long[][] memo) {
    if (left == 0) return 1;
    if (memo[v][left] >= 0) return memo[v][left];
    long res = 0;
    for (int w : FOLLOW[v]) res = (res + count(w, left - 1, memo)) % MOD;
    return memo[v][left] = res;
}
```

| Approach | Time | Space |
|---|---|---|
| Five rolling counts | O(n) | O(1) |
| Top-down memo | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why reverse the rules?</summary>

Bottom-up you build the string left to right, so you need the letters that may precede the new one.

</details>


<details><summary>Same idea elsewhere?</summary>

Knight Dialer: a small graph walked n − 1 times.

</details>


## Connected
- [Knight Dialer](Knight%20Dialer.md)
- [Student Attendance Record II](Student%20Attendance%20Record%20II.md)
