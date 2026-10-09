---
topic: Strings and Digits
pattern: [Sort frequencies, Lower until free]
source: LeetCode 1647
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Deletions to Make Character Frequencies Unique

> [!TIP]
> **🧠 Memory hook**
> Walk the frequencies from high to low and **push each below its predecessor**.
> **Mantra: EACH FREQUENCY ≤ PREVIOUS − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=15) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Delete the fewest characters so that no two letters have the same frequency.

## Key insight
Sort frequencies descending. Keep an allowed maximum (previous − 1, at least 0). A frequency above it is reduced to it and the difference is the number of deletions. A set of used frequencies gives the same answer.

## Approach 1: Sorted frequencies
```java
// Sort frequencies descending; each one may be at most (previous - 1), so lower it until it fits or reaches 0
public int minDeletions(String s) {
    int[] freq = new int[26];
    for (char c : s.toCharArray()) freq[c - 'a']++;
    Arrays.sort(freq);
    int deletions = 0, allowed = Integer.MAX_VALUE;
    for (int i = 25; i >= 0 && freq[i] > 0; i--) {
        if (freq[i] > allowed) { deletions += freq[i] - allowed; freq[i] = allowed; }
        allowed = Math.max(0, freq[i] - 1);
    }
    return deletions;
}
```

## Approach 2: Set of used frequencies
```java
// Set of used frequencies: lower each frequency until it is free
public int minDeletionsSet(String s) {
    int[] freq = new int[26];
    for (char c : s.toCharArray()) freq[c - 'a']++;
    Set<Integer> used = new HashSet<>();
    int deletions = 0;
    for (int f : freq) {
        while (f > 0 && !used.add(f)) { f--; deletions++; }
    }
    return deletions;
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted frequencies | O(n + 26 log 26) | O(1) |
| Set of used frequencies | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why can frequency 0 repeat?</summary>

A letter with no remaining copies does not exist in the string.

</details>


## Connected
- [Minimum Deletions to Make String K-Special](Minimum%20Deletions%20to%20Make%20String%20K-Special.md)
