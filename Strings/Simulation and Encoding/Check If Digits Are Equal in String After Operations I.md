---
topic: Simulation and Encoding
pattern: [In-place reduction]
source: LeetCode 3461
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Check If Digits Are Equal in String After Operations I

> [!TIP]
> **🧠 Memory hook**
> Replace neighbours by **(a + b) % 10** in place, shrinking by one each round, until **two digits** remain.
> **Mantra: WHILE len > 2: d[i] = (d[i] + d[i+1]) % 10 · d[0] == d[1]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=11) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
While s has more than two digits, replace it with the sequence of (s[i] + s[i + 1]) % 10. Return true if the final two digits are equal.

## Key insight
Writing into d[i] is safe because d[i + 1] is read in the same step before it changes. n ≤ 100, so O(n²) is fine.

## Approach: Shrink in place
```java
// Replace neighbours by their sum mod 10 until two digits remain
public boolean hasSameDigits(String s) {
    int[] d = new int[s.length()];
    for (int i = 0; i < d.length; i++) d[i] = s.charAt(i) - '0';
    for (int len = d.length; len > 2; len--)
        for (int i = 0; i + 1 < len; i++) d[i] = (d[i] + d[i + 1]) % 10;
    return d[0] == d[1];
}
```

| Approach | Time | Space |
|---|---|---|
| Shrink in place | O(n²) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is in place safe?</summary>

d[i] uses d[i + 1], which is overwritten only in the next iteration.

</details>


<details><summary>Faster idea?</summary>

The final digits are binomial-weighted sums mod 10 (part II).

</details>


## Connected
- [Count and Say](Count%20and%20Say.md)
