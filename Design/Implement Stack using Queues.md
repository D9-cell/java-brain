---
topic: Design
pattern: [Queue rotation]
source: LeetCode 225
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Implement Stack using Queues

> [!TIP]
> **🧠 Memory hook**
> A revolving door: after someone enters, everyone older walks round behind them.
> **Mantra: OFFER x, ROTATE n−1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=21) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
LIFO stack using only queue operations.

## Key insight
Push x then rotate the n−1 older elements behind it, so the newest element is at the front.

## Approach 1: Two queues (O(n) pop)
```java
// Approach 1: two queues, O(n) pop (move all but the last into the helper)
static class TwoQueueStack {
    private Queue<Integer> q1 = new ArrayDeque<>(), q2 = new ArrayDeque<>();

    // O(1)
    public void push(int x) { q1.offer(x); }

    // Move n-1 elements over; the last one is the top
    public int pop() {
        while (q1.size() > 1) q2.offer(q1.poll());
        int top = q1.poll();
        Queue<Integer> t = q1; q1 = q2; q2 = t;
        return top;
    }

    // Same as pop but put the element back
    public int top() {
        int x = pop();
        push(x);
        return x;
    }

    // Empty check
    public boolean empty() { return q1.isEmpty(); }
}
```

## Approach 2: One queue (O(n) push)
```java
// Approach 2: one queue, O(n) push: after offering x, rotate the older n-1 elements behind it
static class MyStack {
    private final Queue<Integer> q = new ArrayDeque<>();

    // New element ends up at the front
    public void push(int x) {
        q.offer(x);
        for (int i = 1; i < q.size(); i++) q.offer(q.poll());
    }

    // Front is the top
    public int pop() { return q.poll(); }

    // Peek the front
    public int top() { return q.peek(); }

    // Empty check
    public boolean empty() { return q.isEmpty(); }
}
```

| Approach | Time | Space |
|---|---|---|
| Two queues (O(n) pop) | push O(1), pop O(n) | O(n) |
| One queue (O(n) push) | push O(n), pop O(1) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Which op pays O(n)?</summary>

Your choice: push (rotate) or pop (move n−1).

</details>


## Connected
- [Reverse First K elements of Queue](../Queue/Reverse%20First%20K%20elements%20of%20Queue.md)
- Implement Queue using Stacks
