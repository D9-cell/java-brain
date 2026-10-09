---
topic: Sliding Window
pattern: [Shortest window]
source: GfG
difficulty: Easy
companies: [Paytm]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Smallest window containing 0, 1 and 2

> [!TIP]
> **🧠 Memory hook**
> Minimum Window Substring on a 3-letter alphabet.
> **Mantra: HAS 0, 1, 2 ⇒ RECORD, SHRINK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=51) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Length of the smallest substring containing 0, 1 and 2, or −1.

## Key insight
Shortest valid window: shrink while all three digits are present.

## Approach: Window
```java
// Grow until all three digits are present, then shrink from the left while recording the length
public int smallestSubstring(String s) {
    int[] cnt = new int[3];
    int result = Integer.MAX_VALUE;
    for (int i = 0, j = 0; j < s.length(); j++) {
        cnt[s.charAt(j) - '0']++;
        while (cnt[0] > 0 && cnt[1] > 0 && cnt[2] > 0) {
            result = Math.min(result, j - i + 1);
            cnt[s.charAt(i++) - '0']--;
        }
    }
    return result == Integer.MAX_VALUE ? -1 : result;
}
```

| Approach | Time | Space |
|---|---|---|
| Window | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against brute force.

## Recall before you reveal
<details><summary>None?</summary>

Return −1.

</details>


## Connected
- [Minimum Window Substring](Minimum%20Window%20Substring.md)
