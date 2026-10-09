---
topic: Counting Walks and Moves
pattern: [Take and jump, Right-to-left DP]
source: LeetCode 2140
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Solving Questions With Brainpower

> [!TIP]
> **🧠 Memory hook**
> House Robber where robbing house i **locks the next brainpower[i] houses**.
> **Mantra: dp[i] = max(points + dp[i + bp + 1], dp[i + 1])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=7) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Questions are solved in order. Solving question i gives points[i] but you must skip the next brainpower[i] questions. Skipping costs nothing. Return the maximum points.

## Key insight
Look from the right so the landing index is already known: solve i and land on `i + brainpower + 1`, or skip to i + 1.

## Approach 1: Right-to-left table
```java
// Right to left: dp[i] = max(solve i and jump, skip i)
public long mostPoints(int[][] questions) {
    int n = questions.length;
    long[] dp = new long[n + 1];
    for (int i = n - 1; i >= 0; i--) {
        int next = Math.min(n, i + questions[i][1] + 1);
        dp[i] = Math.max(questions[i][0] + dp[next], dp[i + 1]);
    }
    return dp[0];
}
```

## Approach 2: Top-down memo
```java
// Top-down version of the same choice
public long mostPointsMemo(int[][] questions) {
    long[] memo = new long[questions.length];
    Arrays.fill(memo, -1);
    return best(questions, 0, memo);
}

// Most points available from question i onward
private long best(int[][] q, int i, long[] memo) {
    if (i >= q.length) return 0;
    if (memo[i] >= 0) return memo[i];
    return memo[i] = Math.max(q[i][0] + best(q, i + q[i][1] + 1, memo), best(q, i + 1, memo));
}
```

| Approach | Time | Space |
|---|---|---|
| Right-to-left table | O(n) | O(n) |
| Top-down memo | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why right to left?</summary>

The jump goes forward, so dp[i] needs later entries.

</details>


<details><summary>Overflow?</summary>

Up to 10⁵ × 10⁵ points: use long.

</details>


## Connected
- [House Robber](../Stairs%20and%20Robbers/House%20Robber.md)
- [Minimum Cost For Tickets](Minimum%20Cost%20For%20Tickets.md)
