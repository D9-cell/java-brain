---
topic: Stack
pattern: [Histogram per row]
source: LeetCode 85
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Maximal Rectangle

> [!TIP]
> **🧠 Memory hook**
> Each row is the floor of a skyline.
> **Mantra: ROW HISTOGRAMS + LARGEST RECTANGLE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=13) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Largest rectangle of 1s in a binary matrix.

## Key insight
heights[j] = consecutive 1s ending at the current row; apply Largest Rectangle in Histogram per row.

## Approach: Row histograms
```java
// Largest rectangle in a histogram with one monotonic-stack pass
static int mah(int[] h) {
    int best = 0;
    Deque<Integer> st = new ArrayDeque<>();
    for (int i = 0; i <= h.length; i++) {
        int cur = i == h.length ? 0 : h[i];
        while (!st.isEmpty() && h[st.peek()] >= cur) {
            int height = h[st.pop()], left = st.isEmpty() ? -1 : st.peek();
            best = Math.max(best, height * (i - left - 1));
        }
        st.push(i);
    }
    return best;
}

// Each row is the floor of a histogram whose bar heights count consecutive 1s above
public int maximalRectangle(char[][] m) {
    int[] h = new int[m[0].length];
    int best = 0;
    for (char[] row : m) {
        for (int j = 0; j < h.length; j++) h[j] = row[j] == '1' ? h[j] + 1 : 0;
        best = Math.max(best, mah(h));
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Row histograms | O(R·C) | O(C) |

> [!WARNING]
> **Java gotcha**
> Verified against checking every rectangle.

## Recall before you reveal
<details><summary>Height update?</summary>

1 → h + 1, 0 → 0.

</details>


## Connected
- [Largest Rectangle in Histogram](Largest%20Rectangle%20in%20Histogram.md)
