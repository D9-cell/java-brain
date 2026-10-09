---
topic: Sliding Window
pattern: [Fixed window, Count array]
source: LeetCode 438
difficulty: Medium
companies: [Microsoft, Google, Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Find All Anagrams in a String

> [!TIP]
> **🧠 Memory hook**
> A stencil of p's letter counts sliding along s.
> **Mantra: FIXED WINDOW |p|, COUNTS ZERO ⇒ ADD i**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=15) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Return every start index of an anagram of p in s.

## Key insight
Same as Count Occurrences, but collect the start index.

## Approach: Fixed window
```java
// Fixed window of |p|: subtract entering letters from p's counts, all zeros means an anagram start
public List<Integer> findAnagrams(String s, String p) {
    int[] count = new int[26];
    for (char ch : p.toCharArray()) count[ch - 'a']++;
    List<Integer> result = new ArrayList<>();
    for (int i = 0, j = 0; j < s.length(); j++) {
        count[s.charAt(j) - 'a']--;
        if (j - i + 1 == p.length()) {
            if (Arrays.equals(count, new int[26])) result.add(i);
            count[s.charAt(i++) - 'a']++;
        }
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Fixed window | O(26 · n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Verified against sorting every window.

## Recall before you reveal
<details><summary>Return?</summary>

The list of start indices i.

</details>


## Connected
- [Count Occurences of Anagrams](Count%20Occurences%20of%20Anagrams.md)
- [Permutation in String](Permutation%20in%20String.md)
