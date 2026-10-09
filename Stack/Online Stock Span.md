---
topic: Stack
pattern: [Monotonic stack (previous greater)]
source: LeetCode 901 / GFG
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Online Stock Span

> [!TIP]
> **🧠 Memory hook**
> Each day absorbs the spans of all cheaper days before it.
> **Mantra: (price, span) STACK, SWALLOW ≤**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=22) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
For each price, how many consecutive days (including today) had price ≤ today?

## Key insight
Stack of (price, span); a new price pops every ≤ block and adds their spans.

## Approach: Monotonic stack
```java
// Stack of (price, span): a new price swallows every smaller-or-equal block before it
static class StockSpanner {
    private final Deque<int[]> st = new ArrayDeque<>();

    // Merge spans of all popped entries
    public int next(int price) {
        int span = 1;
        while (!st.isEmpty() && st.peek()[0] <= price) span += st.pop()[1];
        st.push(new int[]{price, span});
        return span;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Monotonic stack | amortised O(1) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a look-back scan.

## Recall before you reveal
<details><summary>Why keep spans?</summary>

Popped blocks must still be counted.

</details>


## Connected
- [Daily Temperatures](Daily%20Temperatures.md)
