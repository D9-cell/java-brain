---
topic: Binary Strings and Substring Counting
pattern: [Runs, Running count]
source: LeetCode 1513
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Number of Substrings With Only 1s

> [!TIP]
> **🧠 Memory hook**
> Same trick: every **1 ends run** all-ones substrings; a **0 resets** the run.
> **Mantra: run = c == '1' ? run + 1 : 0 · total += run**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=2) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
Count substrings consisting only of 1s, mod 1e9+7.

## Key insight
Homogenous substrings restricted to 1s.

## Approach: Running run length
```java
// Every 1 ends as many all-ones substrings as the current run length
public int numSub(String s) {
    long MOD = 1_000_000_007, total = 0;
    int run = 0;
    for (char c : s.toCharArray()) {
        run = c == '1' ? run + 1 : 0;
        total = (total + run) % MOD;
    }
    return (int) total;
}
```

| Approach | Time | Space |
|---|---|---|
| Running run length | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Run of 3 ones?</summary>

1 + 2 + 3 = 6 substrings.

</details>


<details><summary>Difference from Homogenous?</summary>

Zeros reset instead of counting.

</details>


## Connected
- [Count Number of Homogenous Substrings](Count%20Number%20of%20Homogenous%20Substrings.md)
