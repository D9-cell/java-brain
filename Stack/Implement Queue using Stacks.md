---
topic: Stack
pattern: [Two stacks]
source: LeetCode 232 / GFG
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Implement Queue using Stacks

> [!TIP]
> **🧠 Memory hook**
> Two buckets: pour from in to out only when out runs dry.
> **Mantra: IN FOR PUSH, OUT FOR POP, POUR WHEN EMPTY**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=10) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
FIFO queue with push, pop, peek, empty using two stacks.

## Key insight
Pouring reverses the order once; pour only when out is empty → amortised O(1).

## Approach: Two stacks
```java
// in-stack takes pushes; out-stack serves pops; refill out only when it is empty → amortised O(1)
static class MyQueue {
    private final Deque<Integer> in = new ArrayDeque<>(), out = new ArrayDeque<>();

    // O(1)
    public void push(int x) { in.push(x); }

    // Pour in → out only when out is empty (reverses the order once)
    private void move() { if (out.isEmpty()) while (!in.isEmpty()) out.push(in.pop()); }

    // Front of the queue
    public int pop() { move(); return out.pop(); }

    // Peek the front
    public int peek() { move(); return out.peek(); }

    // Both stacks empty
    public boolean empty() { return in.isEmpty() && out.isEmpty(); }
}
```

| Approach | Time | Space |
|---|---|---|
| Two stacks | amortised O(1) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified with random operations against ArrayDeque.

## Recall before you reveal
<details><summary>Why not pour on every pop?</summary>

That would be O(n) per pop.

</details>


## Connected
- [Implement Stack using Queues](../Design/Implement%20Stack%20using%20Queues.md)
