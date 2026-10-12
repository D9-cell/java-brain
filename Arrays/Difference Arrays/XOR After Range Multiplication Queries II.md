---
topic: Difference Arrays
pattern: [Square root split, Multiplicative difference]
source: LeetCode 3655
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# XOR After Range Multiplication Queries II

> [!TIP]
> **🧠 Memory hook**
> Steps **k ≥ √n** touch few indexes: apply directly. For small k, use a **difference array that jumps by k and multiplies**: ×v at l, ×v⁻¹ just past the last touched index.
> **Mantra: k ≥ √n → direct · ELSE diff[l] *= v, diff[next] *= v⁻¹ · diff[i] *= diff[i − k] · multiply in**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=9) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
Each query [l, r, k, v] multiplies nums[l], nums[l + k], … (up to r) by v mod 1e9+7. Return the XOR of the final array.

## Key insight
With a large step a query touches at most √n indexes. For one small k, all its queries share one difference array whose prefix "product" walks in steps of k. Division becomes a Fermat inverse since the modulus is prime.

## Approach: Square root decomposition
```java
// Large steps are applied directly; small steps use a multiplicative difference array that jumps by k
public int xorAfterQueries(int[] nums, int[][] queries) {
    int n = nums.length, block = (int) Math.ceil(Math.sqrt(n));
    long[] val = new long[n];
    for (int i = 0; i < n; i++) val[i] = nums[i];
    Map<Integer, List<int[]>> small = new HashMap<>();
    for (int[] q : queries) {
        if (q[2] >= block) {
            for (int i = q[0]; i <= q[1]; i += q[2]) val[i] = val[i] * q[3] % MOD;
        } else small.computeIfAbsent(q[2], key -> new ArrayList<>()).add(q);
    }
    for (Map.Entry<Integer, List<int[]>> e : small.entrySet()) {
        int k = e.getKey();
        long[] diff = new long[n];
        Arrays.fill(diff, 1);
        for (int[] q : e.getValue()) {
            diff[q[0]] = diff[q[0]] * q[3] % MOD;
            int next = q[0] + ((q[1] - q[0]) / k + 1) * k;
            if (next < n) diff[next] = diff[next] * power(q[3], MOD - 2) % MOD;
        }
        for (int i = k; i < n; i++) diff[i] = diff[i] * diff[i - k] % MOD;
        for (int i = 0; i < n; i++) val[i] = val[i] * diff[i] % MOD;
    }
    int result = 0;
    for (long v : val) result ^= (int) v;
    return result;
}

// Binary exponentiation under the modulus
long power(long b, long e) {
    long r = 1;
    b %= MOD;
    while (e > 0) {
        if ((e & 1) == 1) r = r * b % MOD;
        b = b * b % MOD;
        e >>= 1;
    }
    return r;
}
```

| Approach | Time | Space |
|---|---|---|
| Square root decomposition | O((n + q)√n + q log MOD) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the inverse?</summary>

It cancels the multiplication after the last touched index.

</details>


<details><summary>Where does next point?</summary>

The first index of the progression past r.

</details>


## Connected
- [Range Addition](Range%20Addition.md)
- [Range Sum Query - Mutable](../../Segment%20Tree/Range%20Sum%20Query%20-%20Mutable.md)
