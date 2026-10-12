---
topic: Bitmask Digit and Tree DP
pattern: [Digit DP on bits, Multinomial counts]
source: LeetCode 3539
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Find Sum of Array Product of Magical Sequences

> [!TIP]
> **🧠 Memory hook**
> Choose **how many times each index is used**; the sum of powers of two is built bit by bit with a **carry**, and orderings come from a multinomial coefficient.
> **Mantra: go(i, rem, onesLeft, carry) = Σ_t C(rem, t) · nums[i]^t · go(i + 1, rem − t, onesLeft − bit, carry')**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Bitmask%20Digit%20and%20Tree%20DP/Bitmask%20Digit%20and%20Tree%20DP%20Animations.html#p=6) · **Pattern hub:** [Bitmask Digit and Tree DP - Pattern Map](Bitmask%20Digit%20and%20Tree%20DP%20-%20Pattern%20Map.md)

## Problem
A sequence of m indices into nums is magical if the sum of 2^index has exactly k set bits. Its product is the product of nums at those indices. Return the sum of products over all magical sequences, mod 10⁹ + 7.

## Key insight
Process indices from 0 up. If index i is used t times, the running sum at bit i is carry + t: the low bit is the result bit (counted as a one or not) and the rest carries to the next bit. The t chosen positions among the remaining ones give C(rem, t) arrangements. After the last index the remaining carry contributes its own set bits.

## Approach: Memo on (i, rem, ones, carry)
```java
public class FindSumOfArrayProductOfMagicalSequences {
    static final long MOD = 1_000_000_007L;

    // Choose how many times each index is used; the sequence value sum 2^idx is built bit by bit with a carry,
    // and the multinomial factor is applied as C(remaining, t) * nums[i]^t
    public int magicalSum(int m, int k, int[] nums) {
        int n = nums.length;
        long[][] C = new long[m + 1][m + 1];
        for (int i = 0; i <= m; i++) {
            C[i][0] = 1;
            for (int j = 1; j <= i; j++) C[i][j] = (C[i - 1][j - 1] + (j <= i - 1 ? C[i - 1][j] : 0)) % MOD;
        }
        long[][] pow = new long[n][m + 1];
        for (int i = 0; i < n; i++) {
            pow[i][0] = 1;
            for (int t = 1; t <= m; t++) pow[i][t] = pow[i][t - 1] * nums[i] % MOD;
        }
        long[][][][] memo = new long[n + 1][m + 1][k + 1][m + 1];
        boolean[][][][] done = new boolean[n + 1][m + 1][k + 1][m + 1];
        return (int) go(0, m, k, 0, n, C, pow, memo, done);
    }

    // Weighted ways to distribute rem picks over indices i.. with onesLeft set bits still needed and carry pending
    private long go(int i, int rem, int onesLeft, int carry, int n, long[][] C, long[][] pow, long[][][][] memo, boolean[][][][] done) {
        if (onesLeft < 0) return 0;
        if (i == n) return rem == 0 && Integer.bitCount(carry) == onesLeft ? 1 : 0;
        if (done[i][rem][onesLeft][carry]) return memo[i][rem][onesLeft][carry];
        long total = 0;
        for (int t = 0; t <= rem; t++) {
            int sum = carry + t, bit = sum & 1;
            long ways = C[rem][t] * pow[i][t] % MOD;
            total = (total + ways * go(i + 1, rem - t, onesLeft - bit, sum >> 1, n, C, pow, memo, done)) % MOD;
        }
        done[i][rem][onesLeft][carry] = true;
        return memo[i][rem][onesLeft][carry] = total;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Memo on (i, rem, ones, carry) | O(n · m² · k · m) | O(n · m · k · m) |

> [!WARNING]
> **Java gotcha**
> Binomials and powers are precomputed mod 10⁹ + 7; the carry never exceeds m.

## Recall before you reveal
<details><summary>Why a carry?</summary>

Using an index several times adds 2^i that many times, which spills into higher bits.

</details>


<details><summary>Why binomials?</summary>

They count which of the remaining positions get this index.

</details>


## Connected
- [Total Waviness of Numbers in Range II](Total%20Waviness%20of%20Numbers%20in%20Range%20II.md)
- [Number of Music Playlists](../Counting%20Walks%20and%20Moves/Number%20of%20Music%20Playlists.md)
