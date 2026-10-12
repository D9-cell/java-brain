---
topic: Binary Strings and Substring Counting
pattern: [Runs, Running count]
source: LeetCode 1759
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Count Number of Homogenous Substrings

> [!TIP]
> **🧠 Memory hook**
> At index i inside a run of length L so far, **L new homogenous substrings end here**. Add the run length every step.
> **Mantra: run = same ? run + 1 : 1 · total += run**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=1) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
Count substrings made of one repeated character, mod 1e9+7.

## Key insight
Summing 1 + 2 + … + L over a run gives L(L + 1)/2, the number of its substrings, without a formula.

## Approach: Running run length
```java
// A substring ending at i inside a run of length L: add L for each position
public int countHomogenous(String s) {
    long MOD = 1_000_000_007, total = 0;
    int run = 0;
    for (int i = 0; i < s.length(); i++) {
        run = i > 0 && s.charAt(i) == s.charAt(i - 1) ? run + 1 : 1;
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
<details><summary>Why add run each step?</summary>

Exactly run substrings end at this position.

</details>


<details><summary>Why mod?</summary>

n up to 10⁵ gives about 5·10⁹ substrings.

</details>


## Connected
- [Number of Substrings With Only 1s](Number%20of%20Substrings%20With%20Only%201s.md)
- [Count Binary Substrings](Count%20Binary%20Substrings.md)
