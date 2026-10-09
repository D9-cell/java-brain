---
topic: Sliding Window
pattern: [Longest window]
source: LeetCode 1208
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Get Equal Substrings Within Budget

> [!TIP]
> **🧠 Memory hook**
> Turn letters into a price tag per position.
> **Mantra: cost[i] = |s[i] − t[i]|; LONGEST SUM ≤ maxCost**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=24) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Longest substring of s that can be changed to the same substring of t with total cost ≤ maxCost.

## Key insight
Costs are non-negative, so it is "longest subarray with sum ≤ budget".

## Approach: Window
```java
// Each position costs |s[j] - t[j]|; longest window whose total cost stays within maxCost
public int equalSubstring(String s, String t, int maxCost) {
    int maxLen = 0, cost = 0;
    for (int i = 0, j = 0; j < s.length(); j++) {
        cost += Math.abs(s.charAt(j) - t.charAt(j));
        while (cost > maxCost) {
            cost -= Math.abs(s.charAt(i) - t.charAt(i));
            i++;
        }
        maxLen = Math.max(maxLen, j - i + 1);
    }
    return maxLen;
}
```

| Approach | Time | Space |
|---|---|---|
| Window | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Same as?</summary>

Longest subarray with sum ≤ budget.

</details>


## Connected
- [Minimum Size Subarray Sum](Minimum%20Size%20Subarray%20Sum.md)
