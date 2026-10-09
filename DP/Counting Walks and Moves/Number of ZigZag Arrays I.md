---
topic: Counting Walks and Moves
pattern: [Direction as state, Prefix sums]
source: LeetCode 3699
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Number of ZigZag Arrays I

> [!TIP]
> **🧠 Memory hook**
> Every step must **switch direction**: up after down, down after up.
> **Mantra: up[v] = Σ down[u < v] · down[v] = Σ up[u > v] (PREFIX SUMS)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Counting%20Walks%20and%20Moves/Counting%20Walks%20and%20Moves%20Animations.html#p=16) · **Pattern hub:** [Counting Walks and Moves - Pattern Map](Counting%20Walks%20and%20Moves%20-%20Pattern%20Map.md)

## Problem
Count arrays of length n with every value in [l, r] where neighbours differ and no three consecutive values are strictly increasing or strictly decreasing (so the array zigzags). Answer modulo 1e9+7.

## Key insight
Shift values to 0..m − 1. `up[v]` counts arrays ending at v whose last step went up; such an array came from an array ending lower whose last step went down. A running sum over v gives each layer in O(m).

## Approach 1: Prefix-sum layers
```java
// up[v] / down[v] = arrays ending at value v whose last step went up / down; prefix sums make each layer O(m)
public int zigZagArrays(int n, int l, int r) {
    int m = r - l + 1;
    if (n == 1) return m;
    long[] up = new long[m], down = new long[m];
    Arrays.fill(up, 1);
    Arrays.fill(down, 1);
    for (int len = 2; len <= n; len++) {
        long[] nUp = new long[m], nDown = new long[m];
        long below = 0;
        for (int v = 0; v < m; v++) { nUp[v] = below; below = (below + down[v]) % MOD; }
        long above = 0;
        for (int v = m - 1; v >= 0; v--) { nDown[v] = above; above = (above + up[v]) % MOD; }
        up = nUp; down = nDown;
    }
    long total = 0;
    for (int v = 0; v < m; v++) total += up[v] + down[v];
    return (int) (total % MOD);
}
```

## Approach 2: Direct layers
```java
// Direct layer DP without prefix sums: O(n * m^2)
public int zigZagArraysSlow(int n, int l, int r) {
    int m = r - l + 1;
    if (n == 1) return m;
    long[] up = new long[m], down = new long[m];
    Arrays.fill(up, 1);
    Arrays.fill(down, 1);
    for (int len = 2; len <= n; len++) {
        long[] nUp = new long[m], nDown = new long[m];
        for (int v = 0; v < m; v++)
            for (int u = 0; u < m; u++) {
                if (u < v) nUp[v] = (nUp[v] + down[u]) % MOD;
                if (u > v) nDown[v] = (nDown[v] + up[u]) % MOD;
            }
        up = nUp; down = nDown;
    }
    long total = 0;
    for (int v = 0; v < m; v++) total += up[v] + down[v];
    return (int) (total % MOD);
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix-sum layers | O(n · m) | O(m) |
| Direct layers | O(n · m²) | O(m) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why start both up and down at 1?</summary>

A single element can be followed by either direction; length 2 then gets v − 1 ups and m − 1 − v downs.

</details>


<details><summary>Why prefix sums?</summary>

The sum over all u < v is a running total as v increases.

</details>


## Connected
- [K Inverse Pairs Array](K%20Inverse%20Pairs%20Array.md)
- [Longest Turbulent Subarray](../Stock%20and%20Kadane%20States/Longest%20Turbulent%20Subarray.md)
