---
topic: Difference Arrays
pattern: [Range updates, Mod 26]
source: LeetCode 2381
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Shifting Letters II

> [!TIP]
> **🧠 Memory hook**
> Forward is +1, backward −1 over a range: a difference array of **net shifts**, then shift each letter mod 26.
> **Mantra: diff[s] += d · diff[e+1] −= d · letter + run mod 26**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=3) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
Each shift [start, end, direction] moves letters in that range forward (1) or backward (0) by one, wrapping around. Return the final string.

## Key insight
Shifts commute, so only the net shift per index matters. The run can be negative, hence the double mod.

## Approach: Difference array
```java
// Difference array of net shifts, then apply each letter's total mod 26
public String shiftingLetters(String s, int[][] shifts) {
    int n = s.length();
    int[] diff = new int[n + 1];
    for (int[] sh : shifts) {
        int d = sh[2] == 1 ? 1 : -1;
        diff[sh[0]] += d;
        diff[sh[1] + 1] -= d;
    }
    char[] out = s.toCharArray();
    for (int i = 0, run = 0; i < n; i++) {
        run += diff[i];
        out[i] = (char) ('a' + ((out[i] - 'a' + run) % 26 + 26) % 26);
    }
    return new String(out);
}
```

| Approach | Time | Space |
|---|---|---|
| Difference array | O(n + q) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why double mod?</summary>

A negative net shift must wrap to a valid letter.

</details>


<details><summary>Same as which problem?</summary>

Range Addition with letters.

</details>


## Connected
- [Range Addition](Range%20Addition.md)
- [Shifting Letters](../../Strings/Simulation%20and%20Encoding/Shifting%20Letters.md)
