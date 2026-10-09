---
topic: Sliding Window
pattern: [Fixed window, Count array]
source: GfG
difficulty: Medium
companies: [Amazon, Intuit, Microsoft, Flipkart]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Count Occurences of Anagrams

> [!TIP]
> **🧠 Memory hook**
> Start with a shopping list (pat's counts); the window buys letters.
> **Mantra: FIXED WINDOW, COUNTS ALL ZERO**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=7) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count the windows of txt that are anagrams of pat.

## Key insight
Start from pat's counts, subtract letters entering the window, add back letters leaving. All zeros ⇔ anagram.

## Approach: Fixed window
```java
// Start from pat's counts and subtract the window; all zeros means an anagram
public int search(String pat, String txt) {
    int k = pat.length(), result = 0;
    int[] count = new int[26];
    for (char ch : pat.toCharArray()) count[ch - 'a']++;
    for (int i = 0, j = 0; j < txt.length(); j++) {
        count[txt.charAt(j) - 'a']--;
        if (j - i + 1 == k) {
            if (allZero(count)) result++;
            count[txt.charAt(i++) - 'a']++;
        }
    }
    return result;
}

// True when every letter count is zero
static boolean allZero(int[] count) {
    for (int c : count) if (c != 0) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Fixed window | O(26 · n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Verified against sorting every window.

## Recall before you reveal
<details><summary>Make the check O(1)?</summary>

Track how many letters currently have count 0.

</details>


## Connected
- [Find All Anagrams in a String](Find%20All%20Anagrams%20in%20a%20String.md)
- [Permutation in String](Permutation%20in%20String.md)
