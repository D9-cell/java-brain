---
topic: Strings and Digits
pattern: [Leftmost digit change]
source: LeetCode 1323
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum 69 Number

> [!TIP]
> **🧠 Memory hook**
> Only a 6 can grow, and the **leftmost 6** is worth the most.
> **Mantra: LEFTMOST 6 → 9**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=9) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
You may change at most one digit (6↔9). Return the maximum number.

## Key insight
Flip the first 6 to 9; if there is none the number is already maximal. Arithmetic: add `3 * 10^k` for the highest 6.

## Approach 1: String edit
```java
// Changing the leftmost 6 to 9 gains the most
public int maximum69Number(int num) {
    char[] c = String.valueOf(num).toCharArray();
    for (int i = 0; i < c.length; i++) if (c[i] == '6') { c[i] = '9'; break; }
    return Integer.parseInt(new String(c));
}
```

## Approach 2: Arithmetic
```java
// Arithmetic: find the weight of the highest 6 and add 3 times it
public int maximum69NumberMath(int num) {
    int weight = 0, place = 1;
    for (int n = num; n > 0; n /= 10, place *= 10) if (n % 10 == 6) weight = place;
    return num + 3 * weight;
}
```

| Approach | Time | Space |
|---|---|---|
| String edit | O(d) | O(d) |
| Arithmetic | O(d) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does an earlier digit beat a later one?</summary>

A higher place value contributes more.

</details>


## Connected
- [Break a Palindrome](Break%20a%20Palindrome.md)
