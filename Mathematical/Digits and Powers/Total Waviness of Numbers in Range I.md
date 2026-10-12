---
topic: Digits and Powers
pattern: [Digit scan]
source: LeetCode 3751
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Total Waviness of Numbers in Range I

> [!TIP]
> **🧠 Memory hook**
> A digit is a **peak** if it beats both neighbours, a **valley** if both beat it. Count them for every number.
> **Mantra: FOR x IN range: FOR inner digit b: b > both OR b < both → +1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=18) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
The waviness of a number is the count of its inner digits that are strictly greater than both neighbours or strictly smaller than both. Return the total waviness of all integers in [num1, num2] (range up to 10⁵).

## Key insight
The range is small, so a direct scan of each number's digits is enough. Numbers with fewer than three digits contribute nothing.

## Approach: Scan each number
```java
// Sums the peak and valley digits of every number in the range
public int totalWaviness(int num1, int num2) {
    int total = 0;
    for (int x = num1; x <= num2; x++) total += waviness(x);
    return total;
}

// Counts inner digits strictly above or strictly below both neighbours
int waviness(int x) {
    String s = Integer.toString(x);
    int score = 0;
    for (int i = 1; i + 1 < s.length(); i++) {
        char a = s.charAt(i - 1), b = s.charAt(i), c = s.charAt(i + 1);
        if ((b > a && b > c) || (b < a && b < c)) score++;
    }
    return score;
}
```

| Approach | Time | Space |
|---|---|---|
| Scan each number | O((num2 − num1) · log num2) | O(log num2) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>What about 1 or 2 digit numbers?</summary>

No inner digit, so 0.

</details>


<details><summary>Larger ranges?</summary>

Part II uses digit DP with the last two digits in the state.

</details>


## Connected
- [Total Waviness of Numbers in Range II](../../DP/Bitmask%20Digit%20and%20Tree%20DP/Total%20Waviness%20of%20Numbers%20in%20Range%20II.md)
- [Count Symmetric Integers](Count%20Symmetric%20Integers.md)
