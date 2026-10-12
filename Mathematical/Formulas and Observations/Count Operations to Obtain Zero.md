---
topic: Formulas and Observations
pattern: [Euclid in bulk]
source: LeetCode 2169
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count Operations to Obtain Zero

> [!TIP]
> **🧠 Memory hook**
> Repeated subtraction of the smaller number is **division**: add a / b operations at once and keep a % b.
> **Mantra: ops += big / small · big %= small**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=4) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
In one operation subtract the smaller of num1, num2 from the larger. Return the number of operations until either becomes 0.

## Key insight
This is the subtraction form of Euclid's algorithm. Doing all the subtractions of one phase at once turns O(max) into O(log max) steps.

## Approach: Bulk Euclid
```java
// Euclid with subtraction counted in bulk: a / b subtractions at once
public int countOperations(int num1, int num2) {
    int ops = 0;
    while (num1 != 0 && num2 != 0) {
        if (num1 >= num2) {
            ops += num1 / num2;
            num1 %= num2;
        } else {
            ops += num2 / num1;
            num2 %= num1;
        }
    }
    return ops;
}
```

| Approach | Time | Space |
|---|---|---|
| Bulk Euclid | O(log max) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is it Euclid?</summary>

gcd(a, b) = gcd(a − b, b), applied until one is 0.

</details>


<details><summary>Edge case 0?</summary>

The loop does not run, answer 0.

</details>


## Connected
- [GCD of Odd and Even Sums](../Primes%20Divisors%20and%20Remainders/GCD%20of%20Odd%20and%20Even%20Sums.md)
