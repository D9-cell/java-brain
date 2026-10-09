---
topic: Queue
pattern: [Stack reversal, Queue rotation]
source: GFG
difficulty: Easy
companies: [Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, queue]
---
# Reverse First K elements of Queue

> [!TIP]
> **🧠 Memory hook**
> A train of **k cars** enters a **dead-end siding** (stack) and backs out reversed. The rest of the train then goes once round the loop (**rotation**) to line up behind them.
> **Mantra: POUR → POUR BACK → ROTATE REST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Queue/Queue%20Animations.html) (tab "Reverse First K")
**Pattern hub:** [Queue - Pattern Map](Queue%20-%20Pattern%20Map.md)

## Problem
Reverse the first `k` elements of a queue and keep the rest in their original order.
`[1,2,3,4,5], k = 3  →  [3,2,1,4,5]`

## Approach (3 moves)
1. **Pour**: poll the first `k` into a stack. LIFO stores them reversed.
2. **Pour back**: pop everything into the back of the queue → `[4,5,3,2,1]`.
3. **Rotate rest**: the `n − k` untouched items are now in front. Send each to the back with `q.offer(q.poll())` → `[3,2,1,4,5]`.

```java
// Pours first k into a stack (reverses them), pours back, then rotates the rest to the back
public Queue<Integer> modifyQueue(Queue<Integer> q, int k) {
    int remaining = q.size() - k;
    Deque<Integer> st = new ArrayDeque<>();
    while (k-- > 0) st.push(q.poll());
    while (!st.isEmpty()) q.offer(st.pop());
    while (remaining-- > 0) q.offer(q.poll());
    return q;
}
```
| Time | Space |
|---|---|
| O(n) | O(k) |

> [!WARNING]
> **Java gotcha**
> The original Java port gave TLE because `java.util.Stack` is synchronized (it extends `Vector`). Use **`ArrayDeque`** as a stack: `push` / `pop` / `peek`.

## Recall before you reveal
<details><summary>Why a stack and not a second queue?</summary>

Reversal is LIFO. A queue would keep the same order.

</details>


<details><summary>After pouring back, where is the reversed block?</summary>

At the **back**. Fix it by rotating exactly `n − k` times.

</details>


<details><summary>Write the 3 while-loops from memory.</summary>

`while (k-- > 0) st.push(q.poll());`
`while (!st.isEmpty()) q.offer(st.pop());`
`while (remaining-- > 0) q.offer(q.poll());`

</details>


## Connected
- Same rotation move: [Reveal Cards In Increasing Order](Reveal%20Cards%20In%20Increasing%20Order.md)
- Stack ↔ Queue conversions: Implement Queue using Stacks · Implement Stack using Queues
