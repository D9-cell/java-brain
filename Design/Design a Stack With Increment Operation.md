---
topic: Design
pattern: [Lazy propagation]
source: LeetCode 1381
difficulty: Medium
companies: [LinkedIn]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design a Stack With Increment Operation

> [!TIP]
> **🧠 Memory hook**
> A sticky note on the k-th plate that passes down when the plate leaves.
> **Mantra: LAZY inc[k−1], PASS DOWN ON POP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=6) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
push, pop, increment(k, val) (add val to the bottom k elements).

## Key insight
Store the increment only at index min(k, size) − 1. On pop add it to the value and pass it to the element below.

## Approach: Array + lazy inc[]
```java
// Array stack + lazy inc[]: inc[i] is added to every element at or below i when it is popped
static class CustomStack {
    private final int[] st, inc;
    private int top = -1;

    CustomStack(int maxSize) { st = new int[maxSize]; inc = new int[maxSize]; }

    // Push if there is room
    public void push(int x) { if (top + 1 < st.length) st[++top] = x; }

    // Pop applies the pending increment and hands it down to the element below
    public int pop() {
        if (top < 0) return -1;
        int res = st[top] + inc[top];
        if (top > 0) inc[top - 1] += inc[top];
        inc[top] = 0;
        top--;
        return res;
    }

    // Only tag the highest affected index: O(1)
    public void increment(int k, int val) {
        int i = Math.min(k, top + 1) - 1;
        if (i >= 0) inc[i] += val;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Array + lazy inc[] | O(1) all | O(maxSize) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Why does passing down work?</summary>

Everything below the popped element was also covered by that increment.

</details>


## Connected
- [Lazy Propagation Range Update](../Segment%20Tree/Lazy%20Propagation%20Range%20Update.md)
