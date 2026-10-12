---
topic: Simulation and Encoding
pattern: [Window of three]
source: LeetCode 2264
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Largest 3-Same-Digit Number in String

> [!TIP]
> **🧠 Memory hook**
> Slide a window of three: when all equal, keep the **largest digit**.
> **Mantra: num[i] == num[i−1] == num[i−2] → best = max**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=17) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
Return the largest substring of length 3 consisting of one repeated digit, or "".

## Key insight
Only ten candidates exist ("000".."999"); comparing their digit is enough.

## Approach: Window scan
```java
// Look at every window of three equal digits and keep the biggest digit
public String largestGoodInteger(String num) {
    char best = 0;
    for (int i = 2; i < num.length(); i++)
        if (num.charAt(i) == num.charAt(i - 1) && num.charAt(i) == num.charAt(i - 2)) best = (char) Math.max(best, num.charAt(i));
    return best == 0 ? "" : String.valueOf(best).repeat(3);
}
```

| Approach | Time | Space |
|---|---|---|
| Window scan | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Is "000" valid?</summary>

Yes, it is returned as "000".

</details>


<details><summary>Why compare chars?</summary>

Same-length digit strings compare like numbers.

</details>


## Connected
- [Largest Odd Number in String](Largest%20Odd%20Number%20in%20String.md)
