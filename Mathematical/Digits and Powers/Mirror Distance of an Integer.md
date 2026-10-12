---
topic: Digits and Powers
pattern: [Digit loop]
source: LeetCode 3783
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Mirror Distance of an Integer

> [!TIP]
> **🧠 Memory hook**
> Reverse the digits and take **|n − reverse(n)|**. Trailing zeros vanish in the reverse.
> **Mantra: rev = rev*10 + x % 10 · RETURN |n − rev|**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=2) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
The mirror distance of n is |n − reverse(n)|, where reverse(n) reads the digits of n backwards (leading zeros dropped). Return it.

## Key insight
A plain digit loop. 10 reverses to 1, so the distance is 9.

## Approach: Digit loop
```java
// Distance between n and its digit reversal
public int mirrorDistance(int n) {
    int rev = 0, x = n;
    while (x > 0) {
        rev = rev * 10 + x % 10;
        x /= 10;
    }
    return Math.abs(n - rev);
}
```

| Approach | Time | Space |
|---|---|---|
| Digit loop | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>What is the reverse of 120?</summary>

21: the leading zero after reversing is dropped.

</details>


<details><summary>Overflow?</summary>

n ≤ 10⁹ and its reverse fits in an int for the given range.

</details>


## Connected
- [Reverse Integer](Reverse%20Integer.md)
