---
topic: Counting Walks and Moves
pattern: [Layer per move, Bound the reach]
source: LeetCode 1269
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Number of Ways to Stay in the Same Place After Some Steps

> [!TIP]
> **🧠 Memory hook**
> A pointer that must come home: it **can never wander farther than steps / 2**.
> **Mantra: next[p] = cur[p − 1] + cur[p] + cur[p + 1]; WIDTH = min(len, steps/2 + 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=14) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
A pointer starts at index 0 of an array of length arrLen. Each step it moves left, right, or stays (never outside the array). Count the ways to be at index 0 after exactly `steps` steps, modulo 1e9+7.

## Key insight
Layer DP over positions. Because it has to walk back, the farthest useful position is steps / 2, so the array is cut to min(arrLen, steps / 2 + 1) cells, which keeps it fast even for arrLen = 10⁶.

## Approach 1: Layers over positions
```java
// dp[p] = walks so far that stand at position p; never go past steps / 2
public int numWays(int steps, int arrLen) {
    int width = Math.min(arrLen, steps / 2 + 1);
    long[] dp = new long[width];
    dp[0] = 1;
    for (int s = 0; s < steps; s++) {
        long[] next = new long[width];
        for (int p = 0; p < width; p++) {
            long v = dp[p];
            if (v == 0) continue;
            next[p] = (next[p] + v) % MOD;
            if (p > 0) next[p - 1] = (next[p - 1] + v) % MOD;
            if (p + 1 < width) next[p + 1] = (next[p + 1] + v) % MOD;
        }
        dp = next;
    }
    return (int) dp[0];
}
```

## Approach 2: Top-down memo
```java
// Top-down over (position, steps left)
public int numWaysMemo(int steps, int arrLen) {
    int width = Math.min(arrLen, steps / 2 + 1);
    long[][] memo = new long[width][steps + 1];
    for (long[] row : memo) Arrays.fill(row, -1);
    return (int) ways(0, steps, width, memo);
}

// Walks from position p that return to 0 in exactly left moves
private long ways(int p, int left, int width, long[][] memo) {
    if (p < 0 || p >= width || p > left) return 0;
    if (left == 0) return 1;
    if (memo[p][left] >= 0) return memo[p][left];
    long r = ways(p, left - 1, width, memo) + ways(p - 1, left - 1, width, memo) + ways(p + 1, left - 1, width, memo);
    return memo[p][left] = r % MOD;
}
```

| Approach | Time | Space |
|---|---|---|
| Layers over positions | O(steps · min(len, steps)) | O(min(len, steps)) |
| Top-down memo | O(steps · min(len, steps)) | O(steps · min(len, steps)) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why steps / 2?</summary>

Every step away needs a step back.

</details>


<details><summary>Base case?</summary>

With 0 steps left you must already be at 0.

</details>


## Connected
- [Out of Boundary Paths](Out%20of%20Boundary%20Paths.md)
- [Knight Dialer](Knight%20Dialer.md)
