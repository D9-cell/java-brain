---
topic: Stack
pattern: [Stack simulation]
source: LeetCode 946
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Validate Stack Sequences

> [!TIP]
> **🧠 Memory hook**
> Replay the pushes and pop greedily.
> **Mantra: PUSH, POP WHILE TOP == NEXT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=35) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Could popped come from pushing pushed in order with pops in between?

## Key insight
Simulate; pop whenever the top equals the next expected value; valid iff the stack ends empty.

## Approach: Simulation
```java
// Replay: push each value, then pop while the top matches the next expected pop
public boolean validateStackSequences(int[] pushed, int[] popped) {
    Deque<Integer> st = new ArrayDeque<>();
    int j = 0;
    for (int x : pushed) {
        st.push(x);
        while (!st.isEmpty() && j < popped.length && st.peek() == popped[j]) { st.pop(); j++; }
    }
    return st.isEmpty();
}
```

| Approach | Time | Space |
|---|---|---|
| Simulation | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked all 120 orders of 1..5 against the exhaustively generated reachable set.

## Recall before you reveal
<details><summary>Why greedy?</summary>

Distinct values: a matching top must be popped now or it gets buried.

</details>

