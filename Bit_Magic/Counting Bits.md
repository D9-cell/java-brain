---
topic: Bit Magic
pattern: [DP on bits]
source: LeetCode 338
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Counting Bits

> [!TIP]
> **🧠 Memory hook**
> A number is its half plus its last bit.
> **Mantra: dp[i] = dp[i >> 1] + (i & 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=6) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Popcount of every number from 0 to n.

## Key insight
i >> 1 has the same bits except the last one, and it is already computed.

## Approach 1: Built-in popcount
```java
// Approach 1: popcount for every i
public int[] countBitsBuiltin(int n) {
    int[] res = new int[n + 1];
    for (int i = 0; i <= n; i++) res[i] = Integer.bitCount(i);
    return res;
}
```

## Approach 2: DP
```java
// Approach 2: dp[i] = dp[i >> 1] + (i & 1): drop the last bit, add it back
public int[] countBits(int n) {
    int[] res = new int[n + 1];
    for (int i = 1; i <= n; i++) res[i] = res[i >> 1] + (i & 1);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Built-in popcount | O(n log n) | O(n) |
| DP | O(n) | O(n) |

## Recall before you reveal
<details><summary>Another recurrence?</summary>

dp[i] = dp[i & (i−1)] + 1.

</details>


## Connected
- [Number of 1 Bits](Number%20of%201%20Bits.md)
