---
topic: Numbers as Strings
pattern: [Greedy table]
source: LeetCode 12
difficulty: Medium
companies: [Amazon, Microsoft, Adobe]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Integer to Roman

> [!TIP]
> **🧠 Memory hook**
> List values **including the subtractive pairs** (900, 400, 90, 40, 9, 4) and greedily take the biggest that fits.
> **Mantra: FOR value desc: WHILE num ≥ value: append symbol, subtract**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Numbers%20as%20Strings/Numbers%20as%20Strings%20Animations.html#p=2) · **Pattern hub:** [Numbers as Strings - Pattern Map](Numbers%20as%20Strings%20-%20Pattern%20Map.md)

## Problem
Convert an integer in 1..3999 to a Roman numeral.

## Key insight
With the six subtractive forms in the table, greedy produces the standard numeral, because Roman numerals are written largest first.

## Approach: Greedy over 13 values
```java
// Greedy over values including the subtractive pairs like 900 and 4
public String intToRoman(int num) {
    int[] val = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    String[] sym = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
    StringBuilder sb = new StringBuilder();
    for (int k = 0; k < val.length; k++)
        while (num >= val[k]) {
            sb.append(sym[k]);
            num -= val[k];
        }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy over 13 values | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why include 900 and 4?</summary>

Otherwise greedy writes DCCCC and IIII.

</details>


<details><summary>Reverse direction?</summary>

Roman to Integer subtracts when a smaller value comes before a larger one.

</details>


## Connected
- [Add Strings](Add%20Strings.md)
