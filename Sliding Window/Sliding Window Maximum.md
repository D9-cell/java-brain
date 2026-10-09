---
topic: Sliding Window
pattern: [Monotonic deque]
source: LeetCode 239
difficulty: Hard
companies: [Media.net, Google, Microsoft, Amazon, Flipkart]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Sliding Window Maximum

> [!TIP]
> **🧠 Memory hook**
> A queue of champions: a newcomer knocks out every weaker one behind them.
> **Mantra: DEQUE DECREASING; FRONT = MAX; EVICT EXPIRED**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=50) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Maximum of every window of size k.

## Key insight
Keep indices with decreasing values. A smaller element behind a newer bigger one can never be the max again. The front is the max; drop it when it leaves the window.

## Approach 1: Monotonic deque
```java
// Deque of indices with decreasing values: evict expired front, pop smaller backs, front is the max
public int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    int[] result = new int[n - k + 1];
    Deque<Integer> deq = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        while (!deq.isEmpty() && deq.peekFirst() <= i - k) deq.pollFirst();
        while (!deq.isEmpty() && nums[i] > nums[deq.peekLast()]) deq.pollLast();
        deq.addLast(i);
        if (i >= k - 1) result[i - k + 1] = nums[deq.peekFirst()];
    }
    return result;
}
```

## Approach 2: Max-heap with lazy deletion
```java
// Max-heap of (value, index); lazily discard tops that left the window
public int[] maxSlidingWindowHeap(int[] nums, int k) {
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[0] - a[0]);
    int[] result = new int[nums.length - k + 1];
    for (int i = 0; i < nums.length; i++) {
        while (!pq.isEmpty() && pq.peek()[1] <= i - k) pq.poll();
        pq.add(new int[]{nums[i], i});
        if (i >= k - 1) result[i - k + 1] = pq.peek()[0];
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Monotonic deque | O(n) | O(k) |
| Max-heap with lazy deletion | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Use ArrayDeque, not Stack/LinkedList. Verified against brute force.

## Recall before you reveal
<details><summary>Why O(n)?</summary>

Each index is pushed and popped once.

</details>


<details><summary>Why not a plain queue?</summary>

You pop from both ends.

</details>


## Connected
- [Constrained Subsequence Sum](../Heap/Constrained%20Subsequence%20Sum.md)
- [Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit](Longest%20Continuous%20Subarray%20With%20Absolute%20Diff%20Less%20Than%20or%20Equal%20to%20Limit.md)
- [First negative integer in every window of size k](First%20negative%20integer%20in%20every%20window%20of%20size%20k.md)
