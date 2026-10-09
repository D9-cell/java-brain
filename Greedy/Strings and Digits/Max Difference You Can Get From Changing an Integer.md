---
topic: Strings and Digits
pattern: [Leftmost digit change, Maximum and minimum]
source: LeetCode 1432
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Max Difference You Can Get From Changing an Integer

> [!TIP]
> **🧠 Memory hook**
> Make the biggest number by raising the first non-9 digit to 9 everywhere; the smallest by turning the first digit into 1 (or the next unusual digit into 0).
> **Mantra: MAX: FIRST NON-9 → 9. MIN: FIRST DIGIT → 1, ELSE FIRST NON-0/1 → 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=8) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Pick digits x and y and replace every x in the number by y, twice (a and b). The result must not have leading zeros or be zero. Return the maximum of a − b.

## Key insight
For the maximum replace the first digit that is not 9 (all its copies) by 9. For the minimum, if the first digit is not 1 turn it (and its copies) into 1; otherwise turn the first later digit that is neither 0 nor 1 into 0.

## Approach: Greedy digits
```java
// Maximum: turn the first digit that is not 9 into 9. Minimum: turn the first digit into 1, or if it already is 1 the first later digit that is not 0 or 1 into 0
public int maxDiff(int num) {
    String s = String.valueOf(num);
    String hi = s, lo = s;
    for (char c : s.toCharArray()) if (c != '9') { hi = s.replace(c, '9'); break; }
    if (s.charAt(0) != '1') lo = s.replace(s.charAt(0), '1');
    else for (int i = 1; i < s.length(); i++) { char c = s.charAt(i); if (c != '0' && c != '1') { lo = s.replace(c, '0'); break; } }
    return Integer.parseInt(hi) - Integer.parseInt(lo);
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy digits | O(d) | O(d) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why `1` and not `0` for the first digit?</summary>

A leading zero is not allowed.

</details>


## Connected
- [Maximum Difference by Remapping a Digit](Maximum%20Difference%20by%20Remapping%20a%20Digit.md)
- [Maximum 69 Number](Maximum%2069%20Number.md)
