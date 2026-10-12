---
topic: Counting and Modular Combinatorics
pattern: [Digit counting]
source: LeetCode 902
difficulty: Hard
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Numbers At Most N Given Digit Set

> [!TIP]
> **🧠 Memory hook**
> Shorter numbers are free: **d^len** each. For the same length walk n's digits: smaller digit → **d^(rest)**, equal → continue, none → stop.
> **Mantra: Σ d^len (len < L) · per position: smaller → + d^(L−1−i) · no equal → stop · end → +1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=13) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
Given a sorted set of digits (from 1..9) and n, count positive integers ≤ n that can be written using only those digits (with repetition).

## Key insight
A number shorter than n is always smaller. For L-digit numbers, the first position where we place a smaller digit than n frees the rest. If n's own digit is not in the set we cannot follow n further. Reaching the end means n itself is buildable.

## Approach: Digit walk
```java
// All shorter lengths are free; for the same length walk n's digits left to right
public int atMostNGivenDigitSet(String[] digits, int n) {
    String s = String.valueOf(n);
    int L = s.length(), d = digits.length, count = 0;
    for (int len = 1; len < L; len++) count += (int) Math.pow(d, len);
    for (int i = 0; i < L; i++) {
        boolean same = false;
        for (String dig : digits) {
            char c = dig.charAt(0);
            if (c < s.charAt(i)) count += (int) Math.pow(d, L - 1 - i);
            else if (c == s.charAt(i)) same = true;
        }
        if (!same) return count;
    }
    return count + 1;
}
```

| Approach | Time | Space |
|---|---|---|
| Digit walk | O(log n · |D|) | O(log n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why +1 at the end?</summary>

n itself is made only of allowed digits.

</details>


<details><summary>Why no zero handling?</summary>

The digit set never contains 0.

</details>


## Connected
- [Count Symmetric Integers](../Digits%20and%20Powers/Count%20Symmetric%20Integers.md)
