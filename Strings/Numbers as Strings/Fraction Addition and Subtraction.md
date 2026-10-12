---
topic: Numbers as Strings
pattern: [Parse and compute, gcd]
source: LeetCode 592
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Fraction Addition and Subtraction

> [!TIP]
> **🧠 Memory hook**
> Read signed fractions one at a time, add to a running **num/den**, and **reduce by gcd** after each step.
> **Mantra: num = num·b + sign·a·den · den *= b · divide both by gcd**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Numbers%20as%20Strings/Numbers%20as%20Strings%20Animations.html#p=4) · **Pattern hub:** [Numbers as Strings - Pattern Map](Numbers%20as%20Strings%20-%20Pattern%20Map.md)

## Problem
Evaluate an expression like "-1/2+1/3" and return the result as an irreducible fraction (an integer is written with denominator 1).

## Key insight
a/b + c/d = (ad + cb)/bd. Reducing every step keeps numbers small. A zero sum reduces to 0/1 because gcd(0, d) = d.

## Approach: Running fraction
```java
// Parse signed fractions one by one and keep a reduced running sum
public String fractionAddition(String expression) {
    long num = 0, den = 1;
    int i = 0, n = expression.length();
    while (i < n) {
        int sign = 1;
        if (expression.charAt(i) == '+' || expression.charAt(i) == '-') sign = expression.charAt(i++) == '-' ? -1 : 1;
        long a = 0, b = 0;
        while (expression.charAt(i) != '/') a = a * 10 + (expression.charAt(i++) - '0');
        i++;
        while (i < n && Character.isDigit(expression.charAt(i))) b = b * 10 + (expression.charAt(i++) - '0');
        num = num * b + sign * a * den;
        den *= b;
        long g = gcd(Math.abs(num), den);
        num /= g;
        den /= g;
    }
    return num + "/" + den;
}

// Euclid's algorithm
long gcd(long a, long b) {
    return b == 0 ? a : gcd(b, a % b);
}
```

| Approach | Time | Space |
|---|---|---|
| Running fraction | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against the LeetCode samples and extra cases.

## Recall before you reveal
<details><summary>Why gcd of |num|?</summary>

The sign stays on the numerator.

</details>


<details><summary>Why is 0 printed as 0/1?</summary>

gcd(0, den) = den.

</details>


## Connected
- [Complex Number Multiplication](Complex%20Number%20Multiplication.md)
- [Fraction to Recurring Decimal](../../Mathematical/Primes%20Divisors%20and%20Remainders/Fraction%20to%20Recurring%20Decimal.md)
