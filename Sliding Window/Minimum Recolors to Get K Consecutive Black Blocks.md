---
topic: Sliding Window
pattern: [Fixed window]
source: LeetCode 2379
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Minimum Recolors to Get K Consecutive Black Blocks

> [!TIP]
> **🧠 Memory hook**
> Count the whites in each window of k.
> **Mantra: FIXED WINDOW, MIN WHITE COUNT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=57) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Minimum whites to repaint to get k consecutive black blocks.

## Key insight
Each window of k needs one repaint per white.

## Approach 1: Brute force
```java
// Counts the whites of every window of k separately
public int minimumRecolorsBrute(String blocks, int k) {
    int result = k;
    for (int i = 0; i + k <= blocks.length(); i++) {
        int w = 0;
        for (int j = i; j < i + k; j++) if (blocks.charAt(j) == 'W') w++;
        result = Math.min(result, w);
    }
    return result;
}
```

## Approach 2: Fixed window
```java
// Fixed window of k: slide the white count and keep its minimum
public int minimumRecolors(String blocks, int k) {
    int ops = k, w = 0;
    for (int i = 0, j = 0; j < blocks.length(); j++) {
        if (blocks.charAt(j) == 'W') w++;
        if (j - i + 1 == k) {
            ops = Math.min(ops, w);
            if (blocks.charAt(i++) == 'W') w--;
        }
    }
    return ops;
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force | O(n · k) | O(1) |
| Fixed window | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Both approaches agree on random strips.

## Recall before you reveal
<details><summary>Template?</summary>

Fixed window of k.

</details>


## Connected
- [Maximum Number of Vowels in a Substring of Given Length](Maximum%20Number%20of%20Vowels%20in%20a%20Substring%20of%20Given%20Length.md)
