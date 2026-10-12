---
topic: Numbers as Strings
pattern: [Product slots]
source: LeetCode 43
difficulty: Medium
companies: [Meta, Amazon, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Multiply Strings

> [!TIP]
> **🧠 Memory hook**
> Digit i of num1 times digit j of num2 belongs at **positions i + j and i + j + 1** of the product.
> **Mantra: sum = a·b + pos[i+j+1] · pos[i+j+1] = sum % 10 · pos[i+j] += sum / 10**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Numbers%20as%20Strings/Numbers%20as%20Strings%20Animations.html#p=1) · **Pattern hub:** [Numbers as Strings - Pattern Map](Numbers%20as%20Strings%20-%20Pattern%20Map.md)

## Problem
Return the product of two non-negative integers given as strings, without big-integer libraries.

## Key insight
An m-digit times n-digit product has at most m + n digits. Filling slots from the right and pushing carries left builds it directly. Skip leading zeros when printing.

## Approach: Slot array
```java
// Digit i times digit j lands in positions i + j and i + j + 1 of the product
public String multiply(String num1, String num2) {
    int m = num1.length(), n = num2.length();
    int[] pos = new int[m + n];
    for (int i = m - 1; i >= 0; i--)
        for (int j = n - 1; j >= 0; j--) {
            int sum = (num1.charAt(i) - '0') * (num2.charAt(j) - '0') + pos[i + j + 1];
            pos[i + j + 1] = sum % 10;
            pos[i + j] += sum / 10;
        }
    StringBuilder sb = new StringBuilder();
    for (int d : pos)
        if (!(sb.length() == 0 && d == 0)) sb.append(d);
    return sb.length() == 0 ? "0" : sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Slot array | O(m · n) | O(m + n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why m + n slots?</summary>

The product of an m-digit and an n-digit number has at most m + n digits.

</details>


<details><summary>Zero result?</summary>

All slots are 0, so return "0".

</details>


## Connected
- [Add Strings](Add%20Strings.md)
