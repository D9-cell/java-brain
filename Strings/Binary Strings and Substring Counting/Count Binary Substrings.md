---
topic: Binary Strings and Substring Counting
pattern: [Runs]
source: LeetCode 696
difficulty: Easy
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Count Binary Substrings

> [!TIP]
> **🧠 Memory hook**
> A valid substring sits on **one boundary between runs**. Each boundary gives **min(previous run, current run)**.
> **Mantra: run lengths · Σ min(prev, cur)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=0) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
Count non-empty substrings with equal numbers of 0s and 1s where all 0s and all 1s are grouped consecutively.

## Key insight
Such a substring is k of one digit followed by k of the other, centred on a run boundary. With runs of lengths p and c around it, k can be 1..min(p, c). Only the previous run length is needed.

## Approach: Run lengths
```java
// Each boundary between runs gives min(previous run, current run) substrings
public int countBinarySubstrings(String s) {
    int prev = 0, cur = 1, count = 0;
    for (int i = 1; i < s.length(); i++) {
        if (s.charAt(i) == s.charAt(i - 1)) cur++;
        else {
            count += Math.min(prev, cur);
            prev = cur;
            cur = 1;
        }
    }
    return count + Math.min(prev, cur);
}
```

| Approach | Time | Space |
|---|---|---|
| Run lengths | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>"00110011"?</summary>

Runs 2, 2, 2, 2 → 2 + 2 + 2 = 6.

</details>


<details><summary>Why min?</summary>

Both sides must supply k characters.

</details>


## Connected
- [Count Number of Homogenous Substrings](Count%20Number%20of%20Homogenous%20Substrings.md)
