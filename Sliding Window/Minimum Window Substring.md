---
topic: Sliding Window
pattern: [Shortest window, Count array]
source: LeetCode 76
difficulty: Hard
companies: [Google, Amazon, Microsoft, Atlassian, Airbnb]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Minimum Window Substring

> [!TIP]
> **🧠 Memory hook**
> A shopping list: when nothing is missing, try to put items back.
> **Mantra: required == 0 ⇒ RECORD, SHRINK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=43) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Smallest substring of s containing every character of t (with multiplicity).

## Key insight
`need[c]` = how many more c we need (negative = surplus). `required` counts missing characters; at 0 the window covers t, so shrink and record.

## Approach: Window with a required counter
```java
// need[c] counts what t still wants; required hits 0 when the window covers t, then shrink and record
public String minWindow(String s, String t) {
    int[] need = new int[128];
    for (char c : t.toCharArray()) need[c]++;
    int required = t.length(), minStart = 0, minLen = Integer.MAX_VALUE;
    for (int i = 0, j = 0; j < s.length(); j++) {
        if (need[s.charAt(j)]-- > 0) required--;
        while (required == 0) {
            if (j - i + 1 < minLen) {
                minLen = j - i + 1;
                minStart = i;
            }
            if (++need[s.charAt(i++)] > 0) required++;
        }
    }
    return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
}
```

| Approach | Time | Space |
|---|---|---|
| Window with a required counter | O(m + n) | O(128) |

> [!WARNING]
> **Java gotcha**
> Verified against brute force on random strings.

## Recall before you reveal
<details><summary>Why `required`?</summary>

O(1) validity check instead of comparing arrays.

</details>


<details><summary>When does required go back up?</summary>

When a needed letter leaves and need[c] becomes positive.

</details>


## Connected
- [Smallest window containing 0, 1 and 2](Smallest%20window%20containing%200%2C%201%20and%202.md)
