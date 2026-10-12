---
topic: Simulation and Encoding
pattern: [Run-length]
source: LeetCode 38
difficulty: Medium
companies: [Meta, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Count and Say

> [!TIP]
> **🧠 Memory hook**
> Each term **reads the previous one aloud**: for every run write its **count, then the digit**.
> **Mantra: FOR run: append(count).append(digit)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=2) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
countAndSay(1) = "1"; countAndSay(n) is the run-length reading of countAndSay(n − 1). Return the n-th term.

## Key insight
A run is found by moving j while characters match. The terms grow by about 30% each step, so simulation is fine for n ≤ 30.

## Approach: Iterate runs
```java
// Each term reads the previous one as runs: count followed by digit
public String countAndSay(int n) {
    String s = "1";
    for (int t = 1; t < n; t++) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); ) {
            int j = i;
            while (j < s.length() && s.charAt(j) == s.charAt(i)) j++;
            sb.append(j - i).append(s.charAt(i));
            i = j;
        }
        s = sb.toString();
    }
    return s;
}
```

| Approach | Time | Space |
|---|---|---|
| Iterate runs | O(total length) | O(length) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Term 5?</summary>

111221: one 1, one 2, two 1s from 1211.

</details>


<details><summary>Can a digit above 3 appear?</summary>

No, runs never get longer than 3.

</details>


## Connected
- [String Compression](String%20Compression.md)
