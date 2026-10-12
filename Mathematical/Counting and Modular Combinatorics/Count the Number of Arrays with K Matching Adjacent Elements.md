---
topic: Counting and Modular Combinatorics
pattern: [Choose positions, Factorials]
source: LeetCode 3405
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count the Number of Arrays with K Matching Adjacent Elements

> [!TIP]
> **🧠 Memory hook**
> **m** choices for the first value, **C(n − 1, k)** ways to pick the equal joints, **(m − 1)** for every other joint.
> **Mantra: m · C(n−1, k) · (m−1)^(n−1−k)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=3) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
Count arrays of length n with values in [1, m] that have exactly k indices i with arr[i − 1] == arr[i], mod 1e9+7.

## Key insight
There are n − 1 joints between neighbours. Choose which k are equal; an equal joint copies the previous value (1 way), a different one has m − 1 choices. Factorials up to n − 1 with inverse factorials give nCr in O(1).

## Approach: Combinatorics
```java
// m choices for the first value, pick the k equal joints, every other joint has m - 1 choices
public int countGoodArrays(int n, int m, int k) {
    long[] fact = new long[n], inv = new long[n];
    fact[0] = 1;
    for (int i = 1; i < n; i++) fact[i] = fact[i - 1] * i % MOD;
    inv[n - 1] = power(fact[n - 1], MOD - 2);
    for (int i = n - 1; i > 0; i--) inv[i - 1] = inv[i] * i % MOD;
    long choose = fact[n - 1] * inv[k] % MOD * inv[n - 1 - k] % MOD;
    return (int) (m * choose % MOD * power(m - 1, n - 1 - k) % MOD);
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
| Combinatorics | O(n + log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the first element special?</summary>

It has no left neighbour, so it is free: m ways.

</details>


<details><summary>Inverse factorials backwards?</summary>

inv[i − 1] = inv[i] · i, starting from one Fermat inverse.

</details>


## Connected
- [Direction Assignments with Exactly K Visible People](Direction%20Assignments%20with%20Exactly%20K%20Visible%20People.md)
- [Count Good Numbers](Count%20Good%20Numbers.md)
