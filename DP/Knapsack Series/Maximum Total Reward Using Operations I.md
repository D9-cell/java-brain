---
topic: Knapsack Series
pattern: [Sorted subset sum, Bounded reachability]
source: LeetCode 3180
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Maximum Total Reward Using Operations I

> [!TIP]
> **🧠 Memory hook**
> A value can be added only when it is **bigger than everything collected so far**, so take values in increasing order.
> **Mantra: FOR v ASCENDING: reach[s + v] |= reach[s] FOR s < v**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Knapsack%20Series/Knapsack%20Series%20Animations.html#p=16) · **Pattern hub:** [Knapsack Series - Pattern Map](Knapsack%20Series%20-%20Pattern%20Map.md)

## Problem
Starting from total x = 0, you may pick an unused value v with v > x and set x += v. Return the maximum total.

## Key insight
Any valid pick sequence is increasing, so sort and process values in order. A total s can be extended by v only if s < v, and the final total is below 2 · max. Duplicates are useless.

## Approach: Sorted reachability
```java
// Sorted ascending: reach[s] = total s is achievable; value v extends only totals below v
public int maxTotalReward(int[] rewardValues) {
    int[] v = Arrays.stream(rewardValues).distinct().sorted().toArray();
    int max = v[v.length - 1];
    boolean[] reach = new boolean[2 * max];
    reach[0] = true;
    for (int x : v)
        for (int s = x - 1; s >= 0; s--) if (reach[s]) reach[s + x] = true;
    for (int s = 2 * max - 1; ; s--) if (reach[s]) return s;
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted reachability | O(n · max) | O(max) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the answer below 2 · max?</summary>

Before adding v the total is < v ≤ max.

</details>


<details><summary>Why sort?</summary>

A picked sequence is strictly increasing, so the order is forced.

</details>


## Connected
- [Subset Sum Problem](Subset%20Sum%20Problem.md)
- [Reducing Dishes](../Counting%20Walks%20and%20Moves/Reducing%20Dishes.md)
