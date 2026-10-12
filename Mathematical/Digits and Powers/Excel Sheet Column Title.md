---
topic: Digits and Powers
pattern: [Base 26, Bijective base]
source: LeetCode 168
difficulty: Easy
companies: [Microsoft, Amazon, Meta]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Excel Sheet Column Title

> [!TIP]
> **🧠 Memory hook**
> Letters are digits **1..26 with no zero**, so **subtract one** before each `% 26`.
> **Mantra: n−− · append A + n % 26 · n /= 26 · REVERSE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=3) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Given columnNumber, return its column title as it appears in Excel: 1 → A, 26 → Z, 27 → AA, 28 → AB.

## Key insight
In normal base 26, 26 would be "10". Excel has no zero digit: Z means 26. Decrementing first maps 1..26 to 0..25, takes the letter, and then the division continues on the shifted number.

## Approach: Shifted base 26
```java
// Base 26 with digits 1..26, so subtract one before every division
public String convertToTitle(int columnNumber) {
    StringBuilder sb = new StringBuilder();
    while (columnNumber > 0) {
        columnNumber--;
        sb.append((char) ('A' + columnNumber % 26));
        columnNumber /= 26;
    }
    return sb.reverse().toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Shifted base 26 | O(log n) | O(log n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why decrement first?</summary>

Without it 26 gives "A@" instead of "Z".

</details>


<details><summary>Reverse at the end?</summary>

Digits come out least significant first.

</details>


## Connected
- [Check if Number is a Sum of Powers of Three](Check%20if%20Number%20is%20a%20Sum%20of%20Powers%20of%20Three.md)
