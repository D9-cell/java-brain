---
topic: Bitmask Digit and Tree DP
pattern: [Tree knapsack, Boss bought?]
source: LeetCode 3562
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Profit from Trading Stocks with Discounts

> [!TIP]
> **🧠 Memory hook**
> Each employee has two price tags depending on whether the **boss bought**; combine the children with a knapsack over the budget.
> **Mantra: best[u][bossBought][b] = max(skip u: merge children, buy u: merge children (boss bought) + future − price)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Bitmask%20Digit%20and%20Tree%20DP/Bitmask%20Digit%20and%20Tree%20DP%20Animations.html#p=8) · **Pattern hub:** [Bitmask Digit and Tree DP - Pattern Map](Bitmask%20Digit%20and%20Tree%20DP%20-%20Pattern%20Map.md)

## Problem
Employees form a hierarchy. Employee i can buy one stock at present[i] and sell at future[i]; if their direct boss bought, they pay floor(present[i] / 2). Return the maximum profit within the budget.

## Key insight
The tables depend on whether the parent bought: that changes u's price. For each choice at u, merge the children's tables with a max-plus convolution over budget. The "bought" case uses the children's boss-bought tables, the "skip" case uses their other tables.

## Approach: Tree knapsack
```java
public class MaximumProfitFromTradingStocksWithDiscounts {
    private int[] present, future;
    private List<List<Integer>> kids;
    private int budget;

    // Tree knapsack: best[u][boss bought?][b] = top profit in u's subtree spending at most b; children are merged by convolution
    public int maxProfit(int n, int[] present, int[] future, int[][] hierarchy, int budget) {
        this.present = present;
        this.future = future;
        this.budget = budget;
        kids = new ArrayList<>();
        for (int i = 0; i < n; i++) kids.add(new ArrayList<>());
        for (int[] h : hierarchy) kids.get(h[0] - 1).add(h[1] - 1);
        int[][] root = solve(0);
        int ans = 0;
        for (int v : root[0]) ans = Math.max(ans, v);
        return ans;
    }

    // Returns {profits if the boss did not buy, profits if the boss bought}, each indexed by budget spent
    private int[][] solve(int u) {
        List<int[][]> child = new ArrayList<>();
        for (int v : kids.get(u)) child.add(solve(v));
        int[][] res = new int[2][];
        for (int bossBought = 0; bossBought <= 1; bossBought++) {
            int price = bossBought == 1 ? present[u] / 2 : present[u];
            int[] best = merge(child, 0);
            if (price <= budget) {
                int[] withU = merge(child, 1);
                for (int b = price; b <= budget; b++) best[b] = Math.max(best[b], withU[b - price] + future[u] - price);
            }
            res[bossBought] = best;
        }
        return res;
    }

    // Knapsack-merges the children, using their "boss bought" tables when u buys (which = 1) and the other tables otherwise
    private int[] merge(List<int[][]> child, int which) {
        int[] acc = new int[budget + 1];
        for (int[][] c : child) {
            int[] next = new int[budget + 1];
            for (int used = 0; used <= budget; used++)
                for (int take = 0; used + take <= budget; take++)
                    next[used + take] = Math.max(next[used + take], acc[used] + c[which][take]);
            acc = next;
        }
        return acc;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Tree knapsack | O(n · budget²) | O(n · budget) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why two tables per node?</summary>

The node's price depends on its boss, and its children's on it.

</details>


<details><summary>Why a convolution?</summary>

Each child spends part of the budget independently.

</details>


## Connected
- [Maximum Points After Collecting Coins From All Nodes](Maximum%20Points%20After%20Collecting%20Coins%20From%20All%20Nodes.md)
- [0-1 Knapsack](../Knapsack%20Series/0-1%20Knapsack.md)
