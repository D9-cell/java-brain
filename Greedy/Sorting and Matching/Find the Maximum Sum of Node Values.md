---
topic: Sorting and Matching
pattern: [XOR parity, Take every gain]
source: LeetCode 3068
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Find the Maximum Sum of Node Values

> [!TIP]
> **🧠 Memory hook**
> The tree is a red herring: any **even number of nodes** can be XORed with k.
> **Mantra: TAKE ALL GAINS, FIX PARITY WITH THE SMALLEST LOSS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=18) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
An operation XORs both endpoints of an edge with k. Maximise the sum of node values.

## Key insight
Applying operations along a path toggles only its two ends, so any even-sized set of nodes can be toggled. Toggle every node that gains; if the count is odd, undo the cheapest toggle (smallest `|x - (x ^ k)|`).

## Approach 1: Greedy with parity
```java
// Any even-sized set of nodes can be XORed with k (the tree edges let pairs be toggled), so take every gain and fix the parity
public long maximumValueSum(int[] nums, int k, int[][] edges) {
    long sum = 0;
    int toggled = 0, minLoss = Integer.MAX_VALUE;
    for (int x : nums) {
        int y = x ^ k;
        if (y > x) { sum += y; toggled++; } else sum += x;
        minLoss = Math.min(minLoss, Math.abs(x - y));
    }
    return toggled % 2 == 0 ? sum : sum - minLoss;
}
```

## Approach 2: Sorted pairs
```java
// Same result by sorting the per-node gains and pairing them
public long maximumValueSumSorted(int[] nums, int k, int[][] edges) {
    long sum = 0;
    int n = nums.length;
    long[] gain = new long[n];
    for (int i = 0; i < n; i++) { sum += nums[i]; gain[i] = (nums[i] ^ k) - nums[i]; }
    Arrays.sort(gain);
    for (int i = n - 1; i > 0; i -= 2) {
        long pair = gain[i] + gain[i - 1];
        if (pair <= 0) break;
        sum += pair;
    }
    return sum;
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy with parity | O(n) | O(1) |
| Sorted pairs | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against all subsets of edges. Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does the edge list not matter?</summary>

The graph is connected, so toggling two arbitrary nodes is possible via the path between them.

</details>


## Connected
- [Rearranging Fruits](Rearranging%20Fruits.md)
