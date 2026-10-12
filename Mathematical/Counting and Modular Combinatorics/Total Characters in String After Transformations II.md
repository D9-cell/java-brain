---
topic: Counting and Modular Combinatorics
pattern: [Matrix power, Letter counts]
source: LeetCode 3337
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Total Characters in String After Transformations II

> [!TIP]
> **🧠 Memory hook**
> Only **counts per letter** matter. One step is a fixed **26 × 26 matrix**; t steps are its t-th power.
> **Mantra: T[(c+j)%26][c]++ · P = T^t · Σ P · counts**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=11) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
In one transformation every letter c is replaced by the next nums[c] letters of the alphabet (wrapping). Return the length after t transformations (t up to 10⁹), mod 1e9+7.

## Key insight
Column c of T says which letters one c turns into. Applying the step is cnt' = T · cnt, so after t steps cnt = T^t · cnt. Fast matrix power gives 26³ · log t work.

## Approach: Matrix power
```java
// One transformation is a 26 x 26 matrix on letter counts; raise it to the t-th power
public int lengthAfterTransformations(String s, int t, List<Integer> nums) {
    long[][] T = new long[26][26];
    for (int c = 0; c < 26; c++)
        for (int j = 1; j <= nums.get(c); j++) T[(c + j) % 26][c]++;
    long[][] P = power(T, t);
    long[] cnt = new long[26];
    for (char ch : s.toCharArray()) cnt[ch - 'a']++;
    long total = 0;
    for (int i = 0; i < 26; i++)
        for (int j = 0; j < 26; j++) total = (total + P[i][j] * cnt[j]) % MOD;
    return (int) total;
}

// Square-and-multiply on matrices
long[][] power(long[][] m, long e) {
    int n = m.length;
    long[][] r = new long[n][n];
    for (int i = 0; i < n; i++) r[i][i] = 1;
    while (e > 0) {
        if ((e & 1) == 1) r = multiply(r, m);
        m = multiply(m, m);
        e >>= 1;
    }
    return r;
}

// Matrix product mod MOD
long[][] multiply(long[][] a, long[][] b) {
    int n = a.length;
    long[][] c = new long[n][n];
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++) {
            if (a[i][k] == 0) continue;
            for (int j = 0; j < n; j++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
        }
    return c;
}
```

| Approach | Time | Space |
|---|---|---|
| Matrix power | O(26³ log t) | O(26²) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why not simulate?</summary>

t can be 10⁹.

</details>


<details><summary>Skip zero entries?</summary>

Yes, it speeds the product when the matrix is sparse.

</details>


## Connected
- [Matrix Exponentiation](Matrix%20Exponentiation.md)
- [Total Characters in String After Transformations I](../../HashMap/Total%20Characters%20in%20String%20After%20Transformations%20I.md)
