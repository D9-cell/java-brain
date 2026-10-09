---
topic: Stack
pattern: [Monotonic stack]
source: LeetCode 42
difficulty: Hard
companies: [Amazon, Google, Goldman Sachs]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Trapping Rain Water (using stack)

> [!TIP]
> **🧠 Memory hook**
> Fill basins layer by layer when a taller wall arrives.
> **Mantra: DECREASING STACK, FILL HORIZONTAL LAYERS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=34) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Total water trapped between bars.

## Key insight
A decreasing stack of walls; when a taller bar arrives, pop the bottom and fill the layer between the new top and the current bar.

## Approach: Stack
```java
// Decreasing stack of bars; a taller bar closes a basin: water = (min(left, right) - bottom) × width
public int trap(int[] h) {
    Deque<Integer> st = new ArrayDeque<>();
    int water = 0;
    for (int i = 0; i < h.length; i++) {
        while (!st.isEmpty() && h[st.peek()] < h[i]) {
            int bottom = h[st.pop()];
            if (st.isEmpty()) break;
            int left = st.peek();
            water += (Math.min(h[left], h[i]) - bottom) * (i - left - 1);
        }
        st.push(i);
    }
    return water;
}
```

| Approach | Time | Space |
|---|---|---|
| Stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against the per-bar min(maxLeft, maxRight) formula.

## Recall before you reveal
<details><summary>Other approaches?</summary>

Prefix/suffix max arrays, or two pointers in O(1) space.

</details>


## Connected
- [Trapping Rain Water II](../Heap/Trapping%20Rain%20Water%20II.md)
