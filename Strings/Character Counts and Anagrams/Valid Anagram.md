---
topic: Character Counts and Anagrams
pattern: [Count and compare]
source: LeetCode 242
difficulty: Easy
companies: [Amazon, Bloomberg, Meta]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Valid Anagram

> [!TIP]
> **🧠 Memory hook**
> One counter array: **+1 for s, −1 for t**. Anagrams bring every counter back to **0**.
> **Mantra: cnt[s[i]]++, cnt[t[i]]−− · ALL zero**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=0) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Return true if t is an anagram of s (same letters with the same counts).

## Key insight
Sorting both strings also works in O(n log n). Counting is O(n) and needs only one array when the lengths match.

## Approach: One count array
```java
// One count array: add for s, subtract for t, everything must return to zero
public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] cnt = new int[26];
    for (int i = 0; i < s.length(); i++) {
        cnt[s.charAt(i) - 'a']++;
        cnt[t.charAt(i) - 'a']--;
    }
    for (int c : cnt)
        if (c != 0) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| One count array | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why check the lengths first?</summary>

Different lengths can never be anagrams, and the shared loop assumes equal length.

</details>


<details><summary>Unicode?</summary>

Use a HashMap<Integer, Integer> over code points instead of int[26].

</details>


## Connected
- [Find the Difference](Find%20the%20Difference.md)
- [Minimum Number of Steps to Make Two Strings Anagram](Minimum%20Number%20of%20Steps%20to%20Make%20Two%20Strings%20Anagram.md)
