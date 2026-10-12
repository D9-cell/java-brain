---
topic: Digits and Powers
pattern: [Binary exponentiation]
source: LeetCode 50
difficulty: Medium
companies: [Meta, Amazon, Google, LinkedIn]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Pow(x, n)

> [!TIP]
> **🧠 Memory hook**
> Read the exponent **bit by bit**: square the base each step, multiply it in when the bit is 1.
> **Mantra: e < 0 → x = 1/x · WHILE e: IF e&1 r *= x · x *= x · e >>= 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=7) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Implement pow(x, n), which computes x raised to the power n (n can be negative).

## Key insight
x^13 = x^8 · x^4 · x^1 because 13 = 1101₂. That needs about log n multiplications. Store n in a long first: negating Integer.MIN_VALUE overflows an int.

## Approach: Iterative fast power
```java
// Fast power: square the base and halve the exponent, use long so -2^31 can be negated
public double myPow(double x, int n) {
    long e = n;
    if (e < 0) {
        x = 1 / x;
        e = -e;
    }
    double result = 1;
    while (e > 0) {
        if ((e & 1) == 1) result *= x;
        x *= x;
        e >>= 1;
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Iterative fast power | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why a long exponent?</summary>

-(-2³¹) does not fit in an int.

</details>


<details><summary>Recursive version?</summary>

half = pow(x, n/2); return n odd ? half·half·x : half·half.

</details>


## Connected
- [Power of Numbers](Power%20of%20Numbers.md)
- [Matrix Exponentiation](../Counting%20and%20Modular%20Combinatorics/Matrix%20Exponentiation.md)
- [Count Good Numbers](../Counting%20and%20Modular%20Combinatorics/Count%20Good%20Numbers.md)
