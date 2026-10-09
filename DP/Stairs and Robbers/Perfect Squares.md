---
topic: Stairs and Robbers
pattern: [Try every last piece, Shortest path]
source: LeetCode 279
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, dp]
---
# Perfect Squares

> [!TIP]
> **🧠 Memory hook**
> Think of it as the **fewest coins**, where the coins are the squares.
> **Mantra: dp[i] = 1 + min over squares s of dp[i − s]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Stairs%20and%20Robbers/Stairs%20and%20Robbers%20Animations.html#p=8) · **Pattern hub:** [Stairs and Robbers - Pattern Map](Stairs%20and%20Robbers%20-%20Pattern%20Map.md)

## Problem
Return the least number of perfect squares that sum to n.

## Key insight
dp over amounts: use one square s and solve the remainder. The same problem is a shortest path (BFS levels) over remainders, and Lagrange's theorem says the answer is at most 4.

## Approach 1: DP
```java
// dp[i] = 1 + min over squares s <= i of dp[i - s]
public int numSquares(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = Integer.MAX_VALUE;
        for (int s = 1; s * s <= i; s++) dp[i] = Math.min(dp[i], dp[i - s * s] + 1);
    }
    return dp[n];
}
```

## Approach 2: BFS on remainders
```java
// BFS over remainders: the level at which 0 is reached is the answer
public int numSquaresBfs(int n) {
    boolean[] seen = new boolean[n + 1];
    Queue<Integer> q = new LinkedList<>(List.of(n));
    seen[n] = true;
    for (int level = 1; !q.isEmpty(); level++) {
        for (int sz = q.size(); sz > 0; sz--) {
            int cur = q.poll();
            for (int s = 1; s * s <= cur; s++) {
                int nx = cur - s * s;
                if (nx == 0) return level;
                if (!seen[nx]) { seen[nx] = true; q.add(nx); }
            }
        }
    }
    return n;
}
```

## Approach 3: Four-square theorem
```java
// Lagrange's four-square theorem: the answer is at most 4, and 4 exactly when n = 4^a (8b + 7)
public int numSquaresMath(int n) {
    if (isSquare(n)) return 1;
    int m = n;
    while (m % 4 == 0) m /= 4;
    if (m % 8 == 7) return 4;
    for (int a = 1; a * a < n; a++) if (isSquare(n - a * a)) return 2;
    return 3;
}

// True if x is a perfect square
private boolean isSquare(int x) { int r = (int) Math.sqrt(x); return r * r == x; }
```

| Approach | Time | Space |
|---|---|---|
| DP | O(n √n) | O(n) |
| BFS on remainders | O(n √n) | O(n) |
| Four-square theorem | O(√n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small inputs when it was written.

## Recall before you reveal
<details><summary>Why is the answer at most 4?</summary>

Every natural number is a sum of four squares (Lagrange).

</details>


## Connected
- [Coin Change](../Knapsack%20Series/Coin%20Change.md)
- [Integer Break](Integer%20Break.md)
