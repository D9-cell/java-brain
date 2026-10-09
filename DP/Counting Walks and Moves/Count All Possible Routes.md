---
topic: Counting Walks and Moves
pattern: [Fuel in the state, Memo over (city, fuel)]
source: LeetCode 1575
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Count All Possible Routes

> [!TIP]
> **🧠 Memory hook**
> Fuel only goes down, so **(city, fuel left)** can never repeat on one route: a DAG.
> **Mantra: routes(i, f) = [i == finish] + Σ routes(j, f − |loc i − loc j|)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=22) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Cities at distinct positions; moving from i to j costs |loc[i] − loc[j]| fuel. Count routes from start to finish with the given fuel (cities, including start and finish, may be visited many times). Answer modulo 1e9+7.

## Key insight
Every move strictly lowers the fuel, so states form a DAG ordered by fuel. Each time a route stands on finish it counts once, then it may continue.

## Approach 1: Top-down memo
```java
// Top-down over (city, fuel left); every visit to finish counts as one route
public int countRoutes(int[] locations, int start, int finish, int fuel) {
    long[][] memo = new long[locations.length][fuel + 1];
    for (long[] row : memo) Arrays.fill(row, -1);
    return (int) routes(locations, start, finish, fuel, memo);
}

// Routes that end at finish from city i with f fuel
private long routes(int[] loc, int i, int finish, int f, long[][] memo) {
    if (memo[i][f] >= 0) return memo[i][f];
    long res = i == finish ? 1 : 0;
    for (int j = 0; j < loc.length; j++) {
        int cost = Math.abs(loc[i] - loc[j]);
        if (j != i && cost <= f) res += routes(loc, j, finish, f - cost, memo);
    }
    return memo[i][f] = res % MOD;
}
```

## Approach 2: Bottom-up by fuel
```java
// Bottom-up: dp[f][i] filled for increasing fuel
public int countRoutesTable(int[] locations, int start, int finish, int fuel) {
    int n = locations.length;
    long[][] dp = new long[fuel + 1][n];
    for (int f = 0; f <= fuel; f++)
        for (int i = 0; i < n; i++) {
            long res = i == finish ? 1 : 0;
            for (int j = 0; j < n; j++) {
                int cost = Math.abs(locations[i] - locations[j]);
                if (j != i && cost <= f) res += dp[f - cost][j];
            }
            dp[f][i] = res % MOD;
        }
    return (int) dp[fuel][start];
}
```

| Approach | Time | Space |
|---|---|---|
| Top-down memo | O(n² · fuel) | O(n · fuel) |
| Bottom-up by fuel | O(n² · fuel) | O(n · fuel) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is there no cycle?</summary>

Distinct positions make every move cost at least 1 fuel.

</details>


<details><summary>Why add 1 at finish before moving on?</summary>

Stopping there is one route; continuing gives the others.

</details>


## Connected
- [Out of Boundary Paths](Out%20of%20Boundary%20Paths.md)
- [Cheapest Flights Within K Stops](../../Graph/Shortest%20Paths/Cheapest%20Flights%20Within%20K%20Stops.md)
