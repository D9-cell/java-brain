---
topic: Sliding Window
pattern: [Fixed window, Queue]
source: GfG
difficulty: Medium
companies: [Amazon, MentorGraphics]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# First negative integer in every window of size k

> [!TIP]
> **🧠 Memory hook**
> A queue of suspects: the oldest negative in view is first in line.
> **Mantra: QUEUE OF NEGATIVES; FRONT LEAVES WITH A[i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=21) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
For every window of size k, report its first negative number (0 if none).

## Key insight
Negatives enter a queue in order. When A[i] leaves and is negative, it is exactly the front.

## Approach 1: Queue of values
```java
// Queue of the negatives inside the window; its front is the answer, pop it when it leaves
public List<Long> firstNegative(long[] a, int k) {
    Deque<Long> negs = new ArrayDeque<>();
    List<Long> result = new ArrayList<>();
    for (int i = 0, j = 0; j < a.length; j++) {
        if (a[j] < 0) negs.addLast(a[j]);
        if (j - i + 1 == k) {
            result.add(negs.isEmpty() ? 0 : negs.peekFirst());
            if (a[i] < 0 && !negs.isEmpty()) negs.pollFirst();
            i++;
        }
    }
    return result;
}
```

## Approach 2: Deque of indices
```java
// Deque of negative indices; drop indices that fell out of the window before reading the front
public List<Long> firstNegativeIndices(long[] a, int k) {
    Deque<Integer> deq = new ArrayDeque<>();
    List<Long> result = new ArrayList<>();
    for (int i = 0; i < a.length; i++) {
        while (!deq.isEmpty() && deq.peekFirst() <= i - k) deq.pollFirst();
        if (a[i] < 0) deq.addLast(i);
        if (i >= k - 1) result.add(deq.isEmpty() ? 0 : a[deq.peekFirst()]);
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Queue of values | O(n) | O(k) |
| Deque of indices | O(n) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against scanning each window.

## Recall before you reveal
<details><summary>Why pop only when A[i] < 0?</summary>

Then A[i] is the queue front.

</details>


## Connected
- [Sliding Window Maximum](Sliding%20Window%20Maximum.md)
