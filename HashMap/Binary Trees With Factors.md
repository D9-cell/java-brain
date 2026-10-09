---
topic: HashMap
pattern: [DP over a map]
source: LeetCode 823
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Binary Trees With Factors

> [!TIP]
> **🧠 Memory hook**
> Each root counts left × right combinations of its factor pairs.
> **Mantra: SORT, dp[x] = 1 + Σ dp[a]·dp[x/a]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=1) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Count binary trees where every non-leaf equals the product of its children (values reusable).

## Key insight
Sort so that factors come first; the map gives dp of the complementary factor in O(1).

## Approach: Sorted DP with a map
```java
// Sorted; dp[x] = 1 + Σ dp[a]·dp[x/a] over factor pairs a·b = x present in the array
public int numFactoredBinaryTrees(int[] arr) {
    final long MOD = 1_000_000_007;
    int[] a = arr.clone();
    Arrays.sort(a);
    Map<Integer, Long> dp = new HashMap<>();
    long total = 0;
    for (int i = 0; i < a.length; i++) {
        long ways = 1;
        for (int j = 0; j < i; j++) {
            if (a[i] % a[j] != 0) continue;
            Long other = dp.get(a[i] / a[j]);
            if (other != null) ways = (ways + dp.get(a[j]) * other) % MOD;
        }
        dp.put(a[i], ways);
        total = (total + ways) % MOD;
    }
    return (int) total;
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted DP with a map | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against plain recursion.

## Recall before you reveal
<details><summary>Why both (a, b) and (b, a)?</summary>

Left/right are different trees; the loop counts both orders.

</details>

