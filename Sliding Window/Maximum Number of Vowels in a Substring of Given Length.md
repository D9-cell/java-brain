---
topic: Sliding Window
pattern: [Fixed window]
source: LeetCode 1456
difficulty: Medium
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Maximum Number of Vowels in a Substring of Given Length

> [!TIP]
> **🧠 Memory hook**
> The plain fixed-window template.
> **Mantra: ADD, RECORD AT k, REMOVE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=36) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Maximum number of vowels in any substring of length k.

## Key insight
Add s[j]; when the size reaches k, record, then remove s[i].

## Approach: Fixed window
```java
// Fixed window of k: add the entering letter, record, remove the leaving letter
public int maxVowels(String s, int k) {
    int maxV = 0, count = 0;
    for (int i = 0, j = 0; j < s.length(); j++) {
        if (isVowel(s.charAt(j))) count++;
        if (j - i + 1 == k) {
            maxV = Math.max(maxV, count);
            if (isVowel(s.charAt(i++))) count--;
        }
    }
    return maxV;
}

// True for a, e, i, o, u
static boolean isVowel(char c) {
    return "aeiou".indexOf(c) >= 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Fixed window | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against counting each window.

## Recall before you reveal
<details><summary>Template?</summary>

Add j; if size == k: record, remove i, i++.

</details>


## Connected
- [Minimum Recolors to Get K Consecutive Black Blocks](Minimum%20Recolors%20to%20Get%20K%20Consecutive%20Black%20Blocks.md)
