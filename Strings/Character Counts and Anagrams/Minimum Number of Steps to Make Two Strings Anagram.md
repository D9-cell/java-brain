---
topic: Character Counts and Anagrams
pattern: [Count difference]
source: LeetCode 1347
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Minimum Number of Steps to Make Two Strings Anagram

> [!TIP]
> **🧠 Memory hook**
> Letters s has more of must be produced by rewriting t. Answer: **sum of positive (s − t) differences**.
> **Mantra: cnt = s − t · Σ max(cnt, 0)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=4) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
In one step replace any character of t. Return the minimum steps to make t an anagram of s (same lengths).

## Key insight
Every letter of t in excess must be changed, and each change can fix one missing letter. Because the lengths match, excess and shortage are equal, so counting one side is enough.

## Approach: Count difference
```java
// Letters t has in excess must be rewritten; that is the sum of positive count differences
public int minSteps(String s, String t) {
    int[] cnt = new int[26];
    for (int i = 0; i < s.length(); i++) {
        cnt[s.charAt(i) - 'a']++;
        cnt[t.charAt(i) - 'a']--;
    }
    int steps = 0;
    for (int c : cnt)
        if (c > 0) steps += c;
    return steps;
}
```

| Approach | Time | Space |
|---|---|---|
| Count difference | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why only positive differences?</summary>

Shortages and excesses balance; each step fixes one of each.

</details>


<details><summary>Different lengths?</summary>

Then insertions or deletions would be needed, a different problem.

</details>


## Connected
- [Valid Anagram](Valid%20Anagram.md)
- [Determine if Two Strings Are Close](Determine%20if%20Two%20Strings%20Are%20Close.md)
