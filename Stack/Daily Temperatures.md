---
topic: Stack
pattern: [Monotonic stack (next greater)]
source: LeetCode 739
difficulty: Medium
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Daily Temperatures

> [!TIP]
> **🧠 Memory hook**
> Days stand in line waiting for a warmer day.
> **Mantra: DECREASING STACK OF INDICES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=5) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
For each day, how many days until a warmer temperature (0 if never)?

## Key insight
Indices wait on a decreasing stack; a warmer day pops and answers them.

## Approach: Monotonic stack
```java
// Monotonic decreasing stack of indices still waiting for a warmer day; a warmer day answers them
public int[] dailyTemperatures(int[] t) {
    int[] res = new int[t.length];
    Deque<Integer> st = new ArrayDeque<>();
    for (int i = 0; i < t.length; i++) {
        while (!st.isEmpty() && t[st.peek()] < t[i]) { int j = st.pop(); res[j] = i - j; }
        st.push(i);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Monotonic stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on random inputs when it was written.

## Recall before you reveal
<details><summary>Why indices?</summary>

The answer is a distance.

</details>


## Connected
- [Online Stock Span](Online%20Stock%20Span.md)
- [Final Prices With a Special Discount in a Shop](Final%20Prices%20With%20a%20Special%20Discount%20in%20a%20Shop.md)
