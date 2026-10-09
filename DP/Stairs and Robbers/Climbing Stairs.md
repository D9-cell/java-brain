---
topic: Stairs and Robbers
pattern: [Last-step argument, Counting ways]
source: LeetCode 70
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Climbing Stairs

> [!TIP]
> **🧠 Memory hook**
> Stand on step n and ask: **how did I get here?** From n−1 (one step) or from n−2 (two steps).
> **Mantra: ways(n) = ways(n−1) + ways(n−2)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=1) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
You can climb 1 or 2 steps at a time. In how many distinct ways can you reach the top of an n-step staircase?

## Key insight
The last move is either a single or a double step, so the counts of the two smaller staircases add up. This is Fibonacci with different base cases (ways(0) = ways(1) = 1).

## Approach 1: Rolling variables
```java
// ways(n) = ways(n - 1) + ways(n - 2): the last step was 1 or 2
public int climbStairs(int n) {
    int a = 1, b = 1;
    for (int i = 2; i <= n; i++) { int c = a + b; a = b; b = c; }
    return b;
}
```

## Approach 2: Top-down memo
```java
// Top-down recursion with memo
public int climbStairsMemo(int n) { return go(n, new int[n + 2]); }

// Number of ways to climb the remaining n steps
private int go(int n, int[] memo) {
    if (n <= 1) return 1;
    if (memo[n] != 0) return memo[n];
    return memo[n] = go(n - 1, memo) + go(n - 2, memo);
}
```

## Approach 3: Combinatorics
```java
// Combinatorics: choose which of the (n - k) moves are double steps, summed over k double steps
public long climbStairsCombinatorics(int n) {
    long total = 0;
    for (int twos = 0; 2 * twos <= n; twos++) total += choose(n - twos, twos);
    return total;
}

// Binomial coefficient
private long choose(int n, int k) {
    long r = 1;
    for (int i = 1; i <= k; i++) r = r * (n - k + i) / i;
    return r;
}
```

| Approach | Time | Space |
|---|---|---|
| Rolling variables | O(n) | O(1) |
| Top-down memo | O(n) | O(n) |
| Combinatorics | O(n²) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Base cases?</summary>

ways(0) = 1 (stay), ways(1) = 1.

</details>


<details><summary>Another way to count?</summary>

Pick how many double steps t you use; the sequence has n − t moves, and you choose t of them to be doubles.

</details>


## Connected
- [Fibonacci Number](Fibonacci%20Number.md)
- [Min Cost Climbing Stairs](Min%20Cost%20Climbing%20Stairs.md)
