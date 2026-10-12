---
topic: Bitmask Digit and Tree DP
pattern: [Tree DP, Halvings as state]
source: LeetCode 2920
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Points After Collecting Coins From All Nodes

> [!TIP]
> **🧠 Memory hook**
> The only thing a node inherits from its ancestors is **how many times its coins were halved**, and after 14 halvings everything is 0.
> **Mantra: dp[v][p] = max(coins>>p − k + Σ dp[child][p], coins>>(p+1) + Σ dp[child][p+1])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Bitmask%20Digit%20and%20Tree%20DP/Bitmask%20Digit%20and%20Tree%20DP%20Animations.html#p=7) · **Pattern hub:** [Bitmask Digit and Tree DP - Pattern Map](Bitmask%20Digit%20and%20Tree%20DP%20-%20Pattern%20Map.md)

## Problem
On a tree rooted at 0, each node can be collected for coins − k points, or for floor(coins / 2) points while halving every coin in its subtree. Return the maximum points over all nodes.

## Key insight
State (v, p): v is visited after p ancestors chose the halving option. Choosing "minus k" keeps p for the children; choosing "halve" raises p by one. coins ≤ 10⁴ means p can stop at 14. Process nodes in reverse BFS order to avoid deep recursion.

## Approach: Reverse BFS tree DP
```java
// dp[v][p] = best points in v's subtree when p halvings already apply; coins <= 10^4 are 0 after 14 halvings
public int maximumPoints(int[][] edges, int[] coins, int k) {
    int n = coins.length, P = 14;
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) {
        adj.get(e[0]).add(e[1]);
        adj.get(e[1]).add(e[0]);
    }
    int[] parent = new int[n], order = new int[n];
    Arrays.fill(parent, -1);
    int head = 0, tail = 0;
    order[tail++] = 0;
    while (head < tail) {
        int u = order[head++];
        for (int v : adj.get(u)) if (v != parent[u]) {
            parent[v] = u;
            order[tail++] = v;
        }
    }
    int[][] dp = new int[n][P + 2];
    for (int idx = n - 1; idx >= 0; idx--) {
        int u = order[idx];
        for (int p = 0; p <= P; p++) {
            int keep = (coins[u] >> p) - k, halve = coins[u] >> (p + 1);
            for (int v : adj.get(u)) if (v != parent[u]) {
                keep += dp[v][p];
                halve += dp[v][p + 1];
            }
            dp[u][p] = Math.max(keep, halve);
        }
    }
    return dp[0][0];
}
```

| Approach | Time | Space |
|---|---|---|
| Reverse BFS tree DP | O(n · 15) | O(n · 15) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why p ≤ 14?</summary>

10⁴ < 2¹⁴, so the coin value is zero after 14 halvings.

</details>


<details><summary>Why not recursion?</summary>

The tree can have 10⁵ nodes and be a long chain.

</details>


## Connected
- [Maximum Profit from Trading Stocks with Discounts](Maximum%20Profit%20from%20Trading%20Stocks%20with%20Discounts.md)
