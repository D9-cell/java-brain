---
topic: Binary Strings and Substring Counting
pattern: [Enumerate alignments]
source: LeetCode 1638
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Count Substrings That Differ by One Character

> [!TIP]
> **🧠 Memory hook**
> Fix a start in s and a start in t, extend together, and count while **exactly one** position differs; stop at the second difference.
> **Mantra: FOR i, j: extend k · diff == 1 → count · diff > 1 → stop**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=17) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
Count pairs of equal-length substrings of s and t that differ in exactly one position.

## Key insight
Lengths are at most 100, so O(n² · m) is fine. A DP of equal runs to the left and right of each mismatch gives O(n · m).

## Approach: Extend from each pair
```java
// Fix both start points and extend together, counting while exactly one position differs
public int countSubstrings(String s, String t) {
    int total = 0;
    for (int i = 0; i < s.length(); i++)
        for (int j = 0; j < t.length(); j++) {
            int diff = 0;
            for (int k = 0; i + k < s.length() && j + k < t.length(); k++) {
                if (s.charAt(i + k) != t.charAt(j + k)) diff++;
                if (diff > 1) break;
                if (diff == 1) total++;
            }
        }
    return total;
}
```

| Approach | Time | Space |
|---|---|---|
| Extend from each pair | O(n · m · min(n, m)) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why break at two differences?</summary>

Longer substrings only add differences.

</details>


<details><summary>Faster idea?</summary>

For each mismatch, (equal run on the left + 1) × (equal run on the right + 1).

</details>


## Connected
- [Words Within Two Edits of Dictionary](../Subsequences%20Stacks%20and%20Greedy/Words%20Within%20Two%20Edits%20of%20Dictionary.md)
- [One Edit Distance](../Subsequences%20Stacks%20and%20Greedy/One%20Edit%20Distance.md)
