---
topic: Sliding Window
pattern: [Fixed window, Circular]
source: LeetCode 1888
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Minimum Number of Flips to Make the Binary String Alternating

> [!TIP]
> **🧠 Memory hook**
> Rotations are windows over s + s.
> **Mantra: WINDOW n OVER 2n, COMPARE 0101 AND 1010**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=39) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Type 1 moves the first char to the end; type 2 flips a char. Minimum type-2 operations.

## Key insight
Type 1 = rotation = a window of length n over s + s. Count mismatches against both alternating patterns while sliding.

## Approach 1: Build s + s
```java
// Rotations = windows of length n over s + s; compare with both alternating patterns of length 2n
public int minFlipsDoubled(String s) {
    int n = s.length();
    String d = s + s;
    int f1 = 0, f2 = 0, result = Integer.MAX_VALUE;
    for (int i = 0, j = 0; j < 2 * n; j++) {
        if (d.charAt(j) != (j % 2 == 0 ? '0' : '1')) f1++;
        if (d.charAt(j) != (j % 2 == 0 ? '1' : '0')) f2++;
        if (j - i + 1 > n) {
            if (d.charAt(i) != (i % 2 == 0 ? '0' : '1')) f1--;
            if (d.charAt(i) != (i % 2 == 0 ? '1' : '0')) f2--;
            i++;
        }
        if (j - i + 1 == n) result = Math.min(result, Math.min(f1, f2));
    }
    return result;
}
```

## Approach 2: Index j % n
```java
// Same window without building s + s: read s.charAt(j % n), expected chars come from j's parity
public int minFlips(String s) {
    int n = s.length(), f1 = 0, f2 = 0, result = Integer.MAX_VALUE;
    for (int i = 0, j = 0; j < 2 * n; j++) {
        char c = s.charAt(j % n);
        if (c != (j % 2 == 0 ? '0' : '1')) f1++;
        if (c != (j % 2 == 0 ? '1' : '0')) f2++;
        if (j - i + 1 > n) {
            char out = s.charAt(i % n);
            if (out != (i % 2 == 0 ? '0' : '1')) f1--;
            if (out != (i % 2 == 0 ? '1' : '0')) f2--;
            i++;
        }
        if (j - i + 1 == n) result = Math.min(result, Math.min(f1, f2));
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Build s + s | O(n) | O(n) |
| Index j % n | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against every rotation.

## Recall before you reveal
<details><summary>Why compare by j's parity, not position in the window?</summary>

Shifting by one swaps the two patterns, and we check both.

</details>

