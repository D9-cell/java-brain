---
topic: Stack
pattern: [Monotonic stack]
source: LeetCode 3542
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Minimum Operations to Convert All Elements to Zero

> [!TIP]
> **🧠 Memory hook**
> Equal values on one level share an operation until a smaller value cuts the level.
> **Mantra: INCREASING STACK, NEW LEVEL = +1 OP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=20) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
An operation zeroes every copy of the minimum in a chosen zero-free subarray; minimise operations.

## Key insight
Keep an increasing stack of open levels: pop larger values (they are cut), and a value not already on top opens a new level (+1).

## Approach: Monotonic stack
```java
// Monotonic increasing stack: a value needs a NEW operation unless the same value is still "open" on the stack
public int minOperations(int[] nums) {
    Deque<Integer> st = new ArrayDeque<>();
    int ops = 0;
    for (int x : nums) {
        while (!st.isEmpty() && st.peek() > x) st.pop();
        if (x == 0) continue;
        if (st.isEmpty() || st.peek() < x) { st.push(x); ops++; }
    }
    return ops;
}
```

| Approach | Time | Space |
|---|---|---|
| Monotonic stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against BFS over array states.

## Recall before you reveal
<details><summary>Zeros?</summary>

They cut everything (pop all) and need no operation.

</details>

