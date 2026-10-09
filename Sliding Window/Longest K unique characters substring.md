---
topic: Sliding Window
pattern: [Longest window, HashMap]
source: GfG
difficulty: Medium
companies: [Google, Amazon, SAP Labs]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Longest K unique characters substring

> [!TIP]
> **🧠 Memory hook**
> John's mall: at most k toy types in a row.
> **Mantra: EXACTLY k ⇒ RECORD; > k ⇒ SHRINK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=30) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Longest substring with exactly k distinct characters, or −1.

## Key insight
Shrink when there are more than k distinct letters; record only when exactly k.

## Approach: Window
```java
// Record the length when the window has exactly k distinct letters, shrink when it has more
public int longestKSubstr(String s, int k) {
    Map<Character, Integer> win = new HashMap<>();
    int maxLen = -1;
    for (int i = 0, j = 0; j < s.length(); j++) {
        win.merge(s.charAt(j), 1, Integer::sum);
        if (win.size() == k) maxLen = Math.max(maxLen, j - i + 1);
        while (win.size() > k) {
            char c = s.charAt(i++);
            if (win.merge(c, -1, Integer::sum) == 0) win.remove(c);
        }
    }
    return maxLen;
}
```

| Approach | Time | Space |
|---|---|---|
| Window | O(n) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>k = 2?</summary>

Fruit Into Baskets.

</details>


## Connected
- [Fruit Into Baskets](Fruit%20Into%20Baskets.md)
