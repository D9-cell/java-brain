---
topic: Digits and Powers
pattern: [Base 3]
source: LeetCode 1780
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Check if Number is a Sum of Powers of Three

> [!TIP]
> **🧠 Memory hook**
> Distinct powers of three means **base 3 digits that are only 0 or 1**. A digit 2 kills it.
> **Mantra: WHILE n: IF n % 3 == 2 → false · n /= 3**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=9) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Return true if n can be written as a sum of distinct powers of three.

## Key insight
Every number has a unique base-3 representation. Using each power at most once is the same as each digit being 0 or 1.

## Approach: Base-3 digits
```java
// Distinct powers of three means every base-3 digit is 0 or 1
public boolean checkPowersOfThree(int n) {
    while (n > 0) {
        if (n % 3 == 2) return false;
        n /= 3;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Base-3 digits | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why not try subsets?</summary>

There is only one base-3 representation, so no search is needed.

</details>


<details><summary>Same idea in base 2?</summary>

Every number is a sum of distinct powers of two, so it would always be true.

</details>


## Connected
- [Power of Three](Power%20of%20Three.md)
- [Excel Sheet Column Title](Excel%20Sheet%20Column%20Title.md)
