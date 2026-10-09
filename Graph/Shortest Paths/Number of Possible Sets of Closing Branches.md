---
topic: Shortest Paths
pattern: [Bitmask subsets, Floyd-Warshall]
source: LeetCode 2959
difficulty: Hard
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, shortest-paths]
---
# Number of Possible Sets of Closing Branches

> [!TIP]
> **🧠 Memory hook**
> With few branches, try every set to keep open and test whether every pair is still close enough.
> **Mantra: 2ⁿ SUBSETS × FLOYD INSIDE THE SUBSET**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Shortest%20Paths/Shortest%20Paths%20Animations.html#p=29) · **Pattern hub:** [Shortest Paths - Pattern Map](Shortest%20Paths%20-%20Pattern%20Map.md)

## Problem
Choose which branches to close. Count the sets for which every pair of remaining branches is within maxDistance using only open branches.

## Key insight
n ≤ 10, so enumerate all 2ⁿ subsets. For each, run Floyd-Warshall restricted to the open nodes and check all pairs. Total O(2ⁿ · n³).

## Approach: Subsets + Floyd
```java
// n is at most 10: for each subset of branches kept open, run Floyd-Warshall on just those nodes and check all pairs
public int numberOfSets(int n, int maxDistance, int[][] roads) {
    int INF = 1 << 28;
    int[][] base = new int[n][n];
    for (int[] row : base) Arrays.fill(row, INF);
    for (int i = 0; i < n; i++) base[i][i] = 0;
    for (int[] r : roads) { base[r[0]][r[1]] = Math.min(base[r[0]][r[1]], r[2]); base[r[1]][r[0]] = Math.min(base[r[1]][r[0]], r[2]); }
    int count = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        int[][] d = new int[n][n];
        for (int i = 0; i < n; i++) d[i] = base[i].clone();
        for (int k = 0; k < n; k++) {
            if ((mask >> k & 1) == 0) continue;
            for (int i = 0; i < n; i++) {
                if ((mask >> i & 1) == 0) continue;
                for (int j = 0; j < n; j++) if ((mask >> j & 1) == 1) d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
            }
        }
        boolean ok = true;
        for (int i = 0; i < n && ok; i++) for (int j = i + 1; j < n && ok; j++) if ((mask >> i & 1) == 1 && (mask >> j & 1) == 1 && d[i][j] > maxDistance) ok = false;
        if (ok) count++;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Subsets + Floyd | O(2ⁿ · n³) | O(n²) |

## Recall before you reveal
<details><summary>Why Floyd inside each subset?</summary>

Roads may only pass through branches that stay open.

</details>


<details><summary>Is the empty set counted?</summary>

Yes, it trivially satisfies the condition.

</details>


## Connected
- [Floyd Warshall](Floyd%20Warshall.md)
