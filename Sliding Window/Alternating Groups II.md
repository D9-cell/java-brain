---
topic: Sliding Window
pattern: [Fixed window, Circular]
source: LeetCode 3208
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Alternating Groups II

> [!TIP]
> **🧠 Memory hook**
> A zebra crossing on a roundabout: a repeated colour breaks the stripes, so start counting again there.
> **Mantra: REPEAT ⇒ i = j; LENGTH k ⇒ COUNT, i++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=0) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Tiles on a circle are coloured 0/1. Count groups of k consecutive tiles whose colours alternate.

## Key insight
A window can never contain two equal neighbours, so jump `i` to `j` at a repeat. Read the circle once plus k − 1 tiles to catch groups that wrap.

## Approach 1: Window over the circle read twice
```java
// Window over the circle read twice: a repeat resets the start, length k counts and slides
public int numberOfAlternatingGroupsWindow(int[] colors, int k) {
    int n = colors.length, N = n + k - 1, result = 0;
    for (int i = 0, j = 1; j < N; j++) {
        if (colors[j % n] == colors[(j - 1) % n]) {
            i = j;
            continue;
        }
        if (j - i + 1 == k) {
            result++;
            i++;
        }
    }
    return result;
}
```

## Approach 2: Run length in two passes
Every position where the alternating run reaches length ≥ k ends one group; the second pass handles the wrap.

```java
// Two passes of run length: one over the array, one over the first k-1 wrap-around tiles
public int numberOfAlternatingGroups(int[] colors, int k) {
    int n = colors.length, result = 0, length = 1, last = colors[0];
    for (int i = 1; i < n; i++) {
        length = colors[i] == last ? 1 : length + 1;
        if (length >= k) result++;
        last = colors[i];
    }
    for (int i = 0; i < k - 1; i++) {
        if (colors[i] == last) break;
        length++;
        if (length >= k) result++;
        last = colors[i];
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Window over the circle read twice | O(n + k) | O(1) |
| Run length in two passes | O(n + k) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against checking every start on 3000 random circles.

## Recall before you reveal
<details><summary>Why n + k − 1 positions?</summary>

Groups starting near the end wrap into the first k − 1 tiles.

</details>


<details><summary>What does `i++` after a count do?</summary>

Keeps the window at exactly k so the next start is counted.

</details>


## Connected
- [Minimum Swaps to Group All 1's Together II](Minimum%20Swaps%20to%20Group%20All%201%27s%20Together%20II.md)
