---
topic: Strings and Digits
pattern: [Leftmost digit change]
source: LeetCode 2566
difficulty: Easy
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Difference by Remapping a Digit

> [!TIP]
> **🧠 Memory hook**
> Remap one digit everywhere: **max** raises the first non-9 digit to 9, **min** turns the first digit into 0.
> **Mantra: MAX: FIRST NON-9 → 9, MIN: FIRST DIGIT → 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=24) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Remap all occurrences of a chosen digit to another digit. Return the difference between the maximum and minimum values you can get (leading zeros are allowed).

## Key insight
The maximum comes from replacing the first digit that is not 9 by 9; the minimum from replacing the first digit by 0.

## Approach 1: String replace
```java
// Remap all copies of one digit: the maximum turns the first non-9 digit into 9, the minimum turns the first digit into 0
public int minMaxDifference(int num) {
    String s = String.valueOf(num);
    String max = s;
    for (char c : s.toCharArray()) if (c != '9') { max = s.replace(c, '9'); break; }
    String min = s.replace(s.charAt(0), '0');
    return Integer.parseInt(max) - Integer.parseInt(min);
}
```

## Approach 2: Digit loop
```java
// Arithmetic version over the digit string
public int minMaxDifferenceDigits(int num) {
    String s = String.valueOf(num);
    char first9 = 0;
    for (char c : s.toCharArray()) if (c != '9') { first9 = c; break; }
    int hi = 0, lo = 0;
    for (char c : s.toCharArray()) {
        hi = hi * 10 + (c == first9 ? 9 : c - '0');
        lo = lo * 10 + (c == s.charAt(0) ? 0 : c - '0');
    }
    return hi - lo;
}
```

| Approach | Time | Space |
|---|---|---|
| String replace | O(d) | O(d) |
| Digit loop | O(d) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is a leading zero fine here?</summary>

The problem allows it, unlike Max Difference From Changing an Integer.

</details>


## Connected
- [Max Difference You Can Get From Changing an Integer](Max%20Difference%20You%20Can%20Get%20From%20Changing%20an%20Integer.md)
