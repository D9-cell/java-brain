---
topic: Counting and Modular Combinatorics
pattern: [Generate palindromes]
source: LeetCode 906
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Super Palindromes

> [!TIP]
> **🧠 Memory hook**
> A super-palindrome is **p² with p a palindrome**. p ≤ 10⁹, so build p from halves **below 10⁵** and test p².
> **Mantra: FOR half < 10⁵: p odd and even · p² in [L, R] && palindrome → count**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=16) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
A super-palindrome is a palindrome that is the square of a palindrome. Count them in [left, right] (up to 10¹⁸).

## Key insight
Enumerating squares up to 10¹⁸ is hopeless, but their roots are palindromes up to 10⁹, and a palindrome is determined by its first half (at most 5 digits). Each half gives an odd- and an even-length palindrome.

## Approach: Build roots from halves
```java
// Every super-palindrome is p² for a palindrome p ≤ 10^9; build p from halves up to 10^5
public int superpalindromesInRange(String left, String right) {
    long L = Long.parseLong(left), R = Long.parseLong(right);
    int count = 0;
    for (int h = 1; h < 100000; h++) {
        String s = String.valueOf(h);
        String rev = new StringBuilder(s).reverse().toString();
        for (String pal : new String[]{s + rev.substring(1), s + rev}) {
            long p = Long.parseLong(pal);
            if (p > 1_000_000_000L) continue;
            long sq = p * p;
            if (sq >= L && sq <= R && isPalindrome(sq)) count++;
        }
    }
    return count;
}

// Reads a long backwards and compares
boolean isPalindrome(long x) {
    long rev = 0, y = x;
    while (y > 0) {
        rev = rev * 10 + y % 10;
        y /= 10;
    }
    return rev == x;
}
```

| Approach | Time | Space |
|---|---|---|
| Build roots from halves | O(10⁵ · 18) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why both s + rev and s + rev.substring(1)?</summary>

They are the even- and odd-length palindromes with that half.

</details>


<details><summary>Overflow?</summary>

p ≤ 10⁹ keeps p² ≤ 10¹⁸ < 2⁶³.

</details>


## Connected
- [Sum of k-Mirror Numbers](Sum%20of%20k-Mirror%20Numbers.md)
- [Find the Count of Good Integers](Find%20the%20Count%20of%20Good%20Integers.md)
