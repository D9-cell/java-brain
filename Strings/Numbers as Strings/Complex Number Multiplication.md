---
topic: Numbers as Strings
pattern: [Parse and compute]
source: LeetCode 537
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Complex Number Multiplication

> [!TIP]
> **🧠 Memory hook**
> Split each "a+bi" at **+**, then **(ac − bd) + (ad + bc)i**.
> **Mantra: parse a, b, c, d · real = ac − bd · imag = ad + bc**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Numbers%20as%20Strings/Numbers%20as%20Strings%20Animations.html#p=3) · **Pattern hub:** [Numbers as Strings - Pattern Map](Numbers%20as%20Strings%20-%20Pattern%20Map.md)

## Problem
Multiply two complex numbers given as strings "real+imaginaryi" (parts can be negative) and return the result in the same format.

## Key insight
The first + separates the parts, since a negative imaginary part is written "+-". i² = −1 gives the minus in the real part.

## Approach: Parse and multiply
```java
// (a + bi)(c + di) = (ac - bd) + (ad + bc)i
public String complexNumberMultiply(String num1, String num2) {
    int[] x = parse(num1), y = parse(num2);
    int real = x[0] * y[0] - x[1] * y[1], imag = x[0] * y[1] + x[1] * y[0];
    return real + "+" + imag + "i";
}

// Splits "a+bi" into a and b
int[] parse(String s) {
    int plus = s.indexOf('+');
    return new int[]{Integer.parseInt(s.substring(0, plus)), Integer.parseInt(s.substring(plus + 1, s.length() - 1))};
}
```

| Approach | Time | Space |
|---|---|---|
| Parse and multiply | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against the LeetCode samples.

## Recall before you reveal
<details><summary>Why split at the first +?</summary>

The format always has "+" before the imaginary part, even if it is negative.

</details>


<details><summary>Where does −bd come from?</summary>

bi · di = bd · i² = −bd.

</details>


## Connected
- [Fraction Addition and Subtraction](Fraction%20Addition%20and%20Subtraction.md)
