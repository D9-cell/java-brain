---
topic: Counting and Modular Combinatorics
pattern: [Choose positions, Fermat inverse]
source: LeetCode 3881
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Direction Assignments with Exactly K Visible People

> [!TIP]
> **🧠 Memory hook**
> Each other person is visible or not from their own direction alone, so **pick which k are visible**: C(n − 1, k), times **2** for the person at pos.
> **Mantra: 2 · C(n − 1, k) % MOD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=2) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
n people stand in a row and each faces left or right. Whether another person counts as visible to the person at pos depends only on that person's direction; pos's own direction does not matter. Count assignments with exactly k visible people, mod 1e9+7.

## Key insight
Every other person has exactly one direction that makes them visible. Choosing the visible set fixes all those directions, and the person at pos is free, giving 2 · C(n − 1, k). nCr uses a running numerator and a Fermat inverse of k!.

## Approach: nCr + Fermat
```java
// Choose which k of the other n - 1 people are visible; the person at pos faces either way
public int countVisiblePeople(int n, int pos, int k) {
    return (int) (nCr(n - 1, k) * 2 % MOD);
}

// n choose r with a Fermat inverse of r!
long nCr(int n, int r) {
    if (r < 0 || r > n) return 0;
    long num = 1, den = 1;
    for (int i = 0; i < r; i++) {
        num = num * (n - i) % MOD;
        den = den * (i + 1) % MOD;
    }
    return num * power(den, MOD - 2) % MOD;
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
| nCr + Fermat | O(k + log MOD) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why times 2?</summary>

The person at pos can face either way without changing the count.

</details>


<details><summary>Why MOD − 2?</summary>

Fermat: a^(p−1) ≡ 1, so a^(p−2) is the inverse of a mod a prime p.

</details>


## Connected
- [Count the Number of Arrays with K Matching Adjacent Elements](Count%20the%20Number%20of%20Arrays%20with%20K%20Matching%20Adjacent%20Elements.md)
