---
topic: Stack
pattern: [Monotonic stack (NSL/NSR)]
source: LeetCode 84
difficulty: Hard
companies: [Amazon, Google, Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Largest Rectangle in Histogram

> [!TIP]
> **🧠 Memory hook**
> Each bar stretches until a shorter neighbour on each side.
> **Mantra: INCREASING STACK, POP → AREA WITH NSL/NSR**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=11) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Largest rectangle area in a histogram.

## Key insight
For bar i the best rectangle uses height h[i] and width between its nearest smaller bars. One pass: when a bar is popped, the current index is its NSR and the new top its NSL.

## Approach 1: NSL + NSR arrays
```java
// Approach 1: NSL and NSR (nearest smaller left/right) with monotonic stacks; width = NSR - NSL - 1
public int largestRectangleAreaNsl(int[] h) {
    int n = h.length;
    int[] left = new int[n], right = new int[n];
    Deque<Integer> st = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        while (!st.isEmpty() && h[st.peek()] >= h[i]) st.pop();
        left[i] = st.isEmpty() ? -1 : st.peek();
        st.push(i);
    }
    st.clear();
    for (int i = n - 1; i >= 0; i--) {
        while (!st.isEmpty() && h[st.peek()] >= h[i]) st.pop();
        right[i] = st.isEmpty() ? n : st.peek();
        st.push(i);
    }
    int best = 0;
    for (int i = 0; i < n; i++) best = Math.max(best, h[i] * (right[i] - left[i] - 1));
    return best;
}
```

## Approach 2: One-pass stack
```java
// Approach 2: one pass; when a bar is popped, the current index is its NSR and the new top is its NSL
public int largestRectangleArea(int[] h) {
    int n = h.length, best = 0;
    Deque<Integer> st = new ArrayDeque<>();
    for (int i = 0; i <= n; i++) {
        int cur = i == n ? 0 : h[i];
        while (!st.isEmpty() && h[st.peek()] >= cur) {
            int height = h[st.pop()], left = st.isEmpty() ? -1 : st.peek();
            best = Math.max(best, height * (i - left - 1));
        }
        st.push(i);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| NSL + NSR arrays | O(n) | O(n) |
| One-pass stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on random inputs when it was written.

## Recall before you reveal
<details><summary>Sentinel?</summary>

Process a height-0 bar at index n.

</details>


## Connected
- [Maximal Rectangle](Maximal%20Rectangle.md)
