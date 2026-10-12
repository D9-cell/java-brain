---
topic: Digits and Powers
pattern: [Two pointers, Integer square root]
source: LeetCode 633
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Sum of Square Numbers

> [!TIP]
> **🧠 Memory hook**
> Start **a = 0, b = √c** and squeeze: too small moves a up, too big moves b down.
> **Mantra: a=0, b=√c · s<c a++ · s>c b−− · s==c true**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=12) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Given a non-negative integer c, decide whether there are integers a and b with a² + b² = c.

## Key insight
Like two-sum on a sorted list of squares. Use long: b² + a² can pass the int range when c is near 2³¹.

## Approach: Two pointers
```java
// Two pointers on a and b: too small moves a up, too big moves b down
public boolean judgeSquareSum(int c) {
    long a = 0, b = (long) Math.sqrt(c);
    while (a <= b) {
        long s = a * a + b * b;
        if (s == c) return true;
        if (s < c) a++;
        else b--;
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Two pointers | O(√c) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why long?</summary>

a² + b² can reach about 2·c, beyond the int range for large c.

</details>


<details><summary>Another way?</summary>

Fermat: c works iff every prime 3 mod 4 appears an even number of times.

</details>


## Connected
- [Count Square Sum Triples](Count%20Square%20Sum%20Triples.md)
- [Missing Number](Missing%20Number.md)
