---
topic: Binary Strings and Substring Counting
pattern: [Kadane per letter pair]
source: LeetCode 2272
difficulty: Hard
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Substring With Largest Variance

> [!TIP]
> **🧠 Memory hook**
> Try every ordered pair (a, b): +1 for a, −1 for b, and run **Kadane** that requires **at least one b**. Reset only when another b is still to come.
> **Mantra: FOR a ≠ b: countA, countB · countB > 0 → best · countA < countB && b remains → reset**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=18) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
The variance of a string is the largest difference between the counts of two characters in it. Return the largest variance among all substrings.

## Key insight
With a and b fixed, the variance of a substring is countA − countB, but only if b occurs in it. Plain Kadane could drop every b; resetting only when a later b exists keeps a b reachable.

## Approach: 26 × 26 Kadane
```java
// For every ordered pair (a, b) run Kadane on +1 for a, -1 for b, resetting only while a later b remains
public int largestVariance(String s) {
    int[] freq = new int[26];
    for (char c : s.toCharArray()) freq[c - 'a']++;
    int best = 0;
    for (int a = 0; a < 26; a++)
        for (int b = 0; b < 26; b++) {
            if (a == b || freq[a] == 0 || freq[b] == 0) continue;
            int countA = 0, countB = 0, restB = freq[b];
            for (char ch : s.toCharArray()) {
                int c = ch - 'a';
                if (c == a) countA++;
                if (c == b) {
                    countB++;
                    restB--;
                }
                if (countB > 0) best = Math.max(best, countA - countB);
                if (countA < countB && restB > 0) {
                    countA = 0;
                    countB = 0;
                }
            }
        }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| 26 × 26 Kadane | O(26² · n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why require one b?</summary>

A substring of only a has variance 0, not countA.

</details>


<details><summary>Why check restB > 0?</summary>

Without a later b the reset would leave a run with no b.

</details>


## Connected
- [Maximum Product Subarray](../../DP/Stock%20and%20Kadane%20States/Maximum%20Product%20Subarray.md)
