---
topic: Counting and Modular Combinatorics
pattern: [Linear recurrence, Matrix power]
source: Classic (Fibonacci by matrix power)
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Matrix Exponentiation

> [!TIP]
> **🧠 Memory hook**
> A linear recurrence is **one matrix applied n times**. Raise the matrix by squaring: **O(log n)** products.
> **Mantra: M = (1 1 / 1 0) · M^n has F(n) in the top-right corner**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=10) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
Compute the n-th Fibonacci number mod 1e9+7 for n up to 10¹⁸.

## Key insight
[F(n+1), F(n)] = M · [F(n), F(n−1)], so M^n holds F(n) in its corner. Matrix multiplication is associative, so the same square-and-multiply as Pow(x, n) works. Any recurrence of order k uses a k × k matrix.

## Approach: 2 × 2 power
```java
// [F(n+1), F(n)] = [[1,1],[1,0]]^n · [1, 0], so F(n) is the top-right of the power
public long fib(long n) {
    long[][] result = {{1, 0}, {0, 1}}, base = {{1, 1}, {1, 0}};
    while (n > 0) {
        if ((n & 1) == 1) result = multiply(result, base);
        base = multiply(base, base);
        n >>= 1;
    }
    return result[0][1];
}

// 2 x 2 matrix product mod MOD
long[][] multiply(long[][] a, long[][] b) {
    long[][] c = new long[2][2];
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
    return c;
}
```

| Approach | Time | Space |
|---|---|---|
| 2 × 2 power | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Identity matrix role?</summary>

It is the "1" that the product starts from.

</details>


<details><summary>Order-3 recurrence?</summary>

Use a 3 × 3 companion matrix.

</details>


## Connected
- [Pow(x, n)](../Digits%20and%20Powers/Pow%28x%2C%20n%29.md)
- [Total Characters in String After Transformations II](Total%20Characters%20in%20String%20After%20Transformations%20II.md)
- [Fibonacci Number](../../DP/Stairs%20and%20Robbers/Fibonacci%20Number.md)
