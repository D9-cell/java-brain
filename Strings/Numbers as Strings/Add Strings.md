---
topic: Numbers as Strings
pattern: [Carry from the right]
source: LeetCode 415
difficulty: Easy
companies: [Meta, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Add Strings

> [!TIP]
> **🧠 Memory hook**
> Two pointers from the **right**, add digits plus **carry**, keep going while either has digits or carry is left.
> **Mantra: sum = carry + d1 + d2 · append sum % 10 · carry = sum / 10 · reverse**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Numbers%20as%20Strings/Numbers%20as%20Strings%20Animations.html#p=0) · **Pattern hub:** [Numbers as Strings - Pattern Map](Numbers%20as%20Strings%20-%20Pattern%20Map.md)

## Problem
Return the sum of two non-negative integers given as strings, without converting them to integers.

## Key insight
Exactly how addition is done by hand. The loop condition includes carry so a final carry becomes a new leading digit.

## Approach: Grade-school addition
```java
// Grade-school addition from the right with a carry
public String addStrings(String num1, String num2) {
    StringBuilder sb = new StringBuilder();
    int i = num1.length() - 1, j = num2.length() - 1, carry = 0;
    while (i >= 0 || j >= 0 || carry > 0) {
        int sum = carry;
        if (i >= 0) sum += num1.charAt(i--) - '0';
        if (j >= 0) sum += num2.charAt(j--) - '0';
        sb.append(sum % 10);
        carry = sum / 10;
    }
    return sb.reverse().toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Grade-school addition | O(max(m, n)) | O(max(m, n)) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why include carry in the loop condition?</summary>

999 + 1 needs an extra digit.

</details>


<details><summary>Why reverse?</summary>

Digits are produced least significant first.

</details>


## Connected
- [Multiply Strings](Multiply%20Strings.md)
- [Add Binary](../../Bit_Magic/Add%20Binary.md)
