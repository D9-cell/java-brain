---
topic: LIS and Variants
pattern: [Pair-state DP, Counting]
source: LeetCode 3336
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Find the Number of Subsequences With Equal GCD

> [!TIP]
> **🧠 Memory hook**
> Each element goes to **sequence A, sequence B, or neither**; the state is the pair of running GCDs.
> **Mantra: dp[a][b] → ×3: skip, gcd(a,x), gcd(b,x)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=20) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Count pairs of disjoint non-empty subsequences of nums whose GCDs are equal. Return the count mod 10⁹ + 7.

## Key insight
dp[a][b] counts ways to have built A with gcd a and B with gcd b (0 = still empty). Each element has three choices. At the end sum dp[g][g] for g ≥ 1.

## Approach: GCD pair table
```java
// dp[a][b] = ways to build two disjoint subsequences with gcds a and b (0 means still empty)
public int subsequencePairCount(int[] nums) {
    int max = 0;
    for (int x : nums) max = Math.max(max, x);
    long[][] dp = new long[max + 1][max + 1];
    dp[0][0] = 1;
    for (int x : nums) {
        long[][] next = new long[max + 1][max + 1];
        for (int a = 0; a <= max; a++)
            for (int b = 0; b <= max; b++) {
                long w = dp[a][b];
                if (w == 0) continue;
                next[a][b] = (next[a][b] + w) % MOD;
                int ga = gcd(a, x), gb = gcd(b, x);
                next[ga][b] = (next[ga][b] + w) % MOD;
                next[a][gb] = (next[a][gb] + w) % MOD;
            }
        dp = next;
    }
    long total = 0;
    for (int g = 1; g <= max; g++) total += dp[g][g];
    return (int) (total % MOD);
}

// Greatest common divisor
private int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
```

| Approach | Time | Space |
|---|---|---|
| GCD pair table | O(n · V² · log V) | O(V²) |

> [!WARNING]
> **Java gotcha**
> Take MOD after each addition; three adds into the same cell can exceed int.

## Recall before you reveal
<details><summary>Why gcd(0, x) = x?</summary>

The first element of an empty sequence becomes its gcd.

</details>


<details><summary>Why exclude g = 0?</summary>

Both sequences must be non-empty.

</details>


## Connected
- [Number of Music Playlists](../Counting%20Walks%20and%20Moves/Number%20of%20Music%20Playlists.md)
