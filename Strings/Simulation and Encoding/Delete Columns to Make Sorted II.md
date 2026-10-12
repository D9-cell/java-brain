---
topic: Simulation and Encoding
pattern: [Greedy columns, Decided pairs]
source: LeetCode 955
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Delete Columns to Make Sorted II

> [!TIP]
> **🧠 Memory hook**
> Go left to right. Keep a column unless it puts some **undecided** adjacent pair out of order. Kept columns **decide** pairs that become strictly increasing.
> **Mantra: bad if !decided[r] && s[r][c] > s[r+1][c] → delete · ELSE mark s[r][c] < s[r+1][c] decided**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=15) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
Delete the minimum number of columns so the remaining rows are in lexicographic order.

## Key insight
Lexicographic order compares the first differing kept column. Once a pair differs in a kept column it is settled forever. Keeping a column never hurts if it causes no inversion among unsettled pairs, so greedy keeping is optimal.

## Approach: Greedy with decided pairs
```java
// Keep a column unless it breaks a pair not yet decided; kept columns can decide pairs
public int minDeletionSize(String[] strs) {
    int n = strs.length, del = 0;
    boolean[] decided = new boolean[n - 1];
    for (int c = 0; c < strs[0].length(); c++) {
        boolean bad = false;
        for (int r = 0; r + 1 < n && !bad; r++)
            if (!decided[r] && strs[r].charAt(c) > strs[r + 1].charAt(c)) bad = true;
        if (bad) {
            del++;
            continue;
        }
        for (int r = 0; r + 1 < n; r++)
            if (strs[r].charAt(c) < strs[r + 1].charAt(c)) decided[r] = true;
    }
    return del;
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy with decided pairs | O(n · m) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why only adjacent pairs?</summary>

Sorted order is transitive: adjacent pairs in order imply all.

</details>


<details><summary>Why is keeping safe?</summary>

It can only settle more pairs.

</details>


## Connected
- [Delete Columns to Make Sorted](Delete%20Columns%20to%20Make%20Sorted.md)
