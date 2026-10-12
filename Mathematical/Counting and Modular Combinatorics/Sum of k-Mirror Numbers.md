---
topic: Counting and Modular Combinatorics
pattern: [Generate palindromes, Base k]
source: LeetCode 2081
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Sum of k-Mirror Numbers

> [!TIP]
> **🧠 Memory hook**
> Generate base-10 palindromes **in increasing order** (by length, then by half) and keep those that are also palindromes in **base k**.
> **Mantra: FOR len, FOR half: mirror → p · palindrome in base k → sum, found++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=17) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
A k-mirror number reads the same forwards and backwards in base 10 and in base k. Return the sum of the n smallest k-mirror numbers (n ≤ 30).

## Key insight
Within one length, palindromes increase with their left half, and shorter lengths come first, so generation is already sorted. Checking base k reverses the digits in base k.

## Approach: Ordered generation
```java
// Generate base-10 palindromes in increasing order and keep those that are also palindromes in base k
public long kMirror(int k, int n) {
    long sum = 0;
    int found = 0;
    for (int len = 1; found < n; len++) {
        int half = (len + 1) / 2;
        long start = (long) Math.pow(10, half - 1), end = (long) Math.pow(10, half);
        for (long h = start; h < end && found < n; h++) {
            long p = h;
            for (long x = len % 2 == 1 ? h / 10 : h; x > 0; x /= 10) p = p * 10 + x % 10;
            if (isPalindromeInBase(p, k)) {
                sum += p;
                found++;
            }
        }
    }
    return sum;
}

// Checks the base-k digits read the same both ways
boolean isPalindromeInBase(long x, int k) {
    long rev = 0, y = x;
    while (y > 0) {
        rev = rev * k + y % k;
        y /= k;
    }
    return rev == x;
}
```

| Approach | Time | Space |
|---|---|---|
| Ordered generation | O(answer^½ · log answer) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why generate base 10 and test base k?</summary>

Base-10 palindromes are easy to list in order.

</details>


<details><summary>How to mirror an odd length?</summary>

Skip the last digit of the half before reflecting.

</details>


## Connected
- [Super Palindromes](Super%20Palindromes.md)
- [Check if Number is a Sum of Powers of Three](../Digits%20and%20Powers/Check%20if%20Number%20is%20a%20Sum%20of%20Powers%20of%20Three.md)
