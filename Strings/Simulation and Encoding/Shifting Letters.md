---
topic: Simulation and Encoding
pattern: [Suffix sum]
source: LeetCode 848
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Shifting Letters

> [!TIP]
> **🧠 Memory hook**
> shifts[i] moves letters 0..i, so letter i moves by the **suffix sum** shifts[i] + … + shifts[n−1].
> **Mantra: FROM right: suffix = (suffix + shifts[i]) % 26 · shift a[i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=5) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
For each i, shift the first i + 1 letters of s by shifts[i] (wrapping z → a). Return the final string.

## Key insight
Walking from the right accumulates exactly the shifts that affect position i. Reduce mod 26 as you go so the sum never overflows.

## Approach: Suffix sum
```java
// Letter i moves by the suffix sum of shifts from i onward
public String shiftingLetters(String s, int[] shifts) {
    char[] a = s.toCharArray();
    long suffix = 0;
    for (int i = a.length - 1; i >= 0; i--) {
        suffix = (suffix + shifts[i]) % 26;
        a[i] = (char) ('a' + (a[i] - 'a' + suffix) % 26);
    }
    return new String(a);
}
```

| Approach | Time | Space |
|---|---|---|
| Suffix sum | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why mod 26 each step?</summary>

shifts up to 10⁹ would overflow an int sum.

</details>


<details><summary>Brute force cost?</summary>

O(n²).

</details>


## Connected
- [Process String with Special Operations I](Process%20String%20with%20Special%20Operations%20I.md)
