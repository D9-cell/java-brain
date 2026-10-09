---
topic: Stack
pattern: [Monotonic stack]
source: LeetCode 962
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Maximum Width Ramp

> [!TIP]
> **🧠 Memory hook**
> Only record lows can be good starts; sweep ends from the far right.
> **Mantra: PREFIX-MIN STACK, SWEEP j BACKWARDS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=19) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Maximum j − i with i < j and nums[i] ≤ nums[j].

## Key insight
Push strictly decreasing prefix-minimum indices; scan j from the end popping every start with value ≤ nums[j].

## Approach: Monotonic stack
```java
// Stack of strictly decreasing prefix-minimum indices (the only useful left ends); scan right ends from the back
public int maxWidthRamp(int[] a) {
    Deque<Integer> st = new ArrayDeque<>();
    for (int i = 0; i < a.length; i++) if (st.isEmpty() || a[i] < a[st.peek()]) st.push(i);
    int best = 0;
    for (int j = a.length - 1; j >= 0; j--)
        while (!st.isEmpty() && a[st.peek()] <= a[j]) best = Math.max(best, j - st.pop());
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Monotonic stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on random inputs when it was written.

## Recall before you reveal
<details><summary>Why is popping safe?</summary>

A smaller j would give a narrower ramp for that start.

</details>

