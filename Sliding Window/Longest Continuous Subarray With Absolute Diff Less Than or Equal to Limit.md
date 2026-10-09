---
topic: Sliding Window
pattern: [Longest window, Monotonic deque]
source: LeetCode 1438
difficulty: Medium
companies: [Uber]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

> [!TIP]
> **🧠 Memory hook**
> Two monotonic queues: one remembers the tallest, one the shortest.
> **Mantra: MAX DEQUE − MIN DEQUE > limit ⇒ SHRINK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=29) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Longest subarray whose max − min ≤ limit.

## Key insight
Need window max and min. Heaps or a TreeMap give O(n log n); two monotonic deques give O(1) each.

## Approach 1: Two heaps
```java
// Max and min heaps of (value, index); on a violation jump i past the older extreme and drop stale tops
public int longestSubarrayHeaps(int[] nums, int limit) {
    PriorityQueue<int[]> maxH = new PriorityQueue<>((a, b) -> b[0] - a[0]), minH = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    int best = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        maxH.add(new int[]{nums[j], j});
        minH.add(new int[]{nums[j], j});
        while (maxH.peek()[0] - minH.peek()[0] > limit) {
            i = Math.min(maxH.peek()[1], minH.peek()[1]) + 1;
            while (maxH.peek()[1] < i) maxH.poll();
            while (minH.peek()[1] < i) minH.poll();
        }
        best = Math.max(best, j - i + 1);
    }
    return best;
}
```

## Approach 2: TreeMap multiset
```java
// TreeMap as a multiset: shrink while lastKey - firstKey > limit
public int longestSubarrayTreeMap(int[] nums, int limit) {
    TreeMap<Integer, Integer> win = new TreeMap<>();
    int best = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        win.merge(nums[j], 1, Integer::sum);
        while (win.lastKey() - win.firstKey() > limit) {
            if (win.merge(nums[i], -1, Integer::sum) == 0) win.remove(nums[i]);
            i++;
        }
        best = Math.max(best, j - i + 1);
    }
    return best;
}
```

## Approach 3: Two monotonic deques
```java
// Two monotonic deques (decreasing for max, increasing for min) give O(n)
public int longestSubarray(int[] nums, int limit) {
    Deque<Integer> maxD = new ArrayDeque<>(), minD = new ArrayDeque<>();
    int best = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        while (!maxD.isEmpty() && maxD.peekLast() < nums[j]) maxD.pollLast();
        while (!minD.isEmpty() && minD.peekLast() > nums[j]) minD.pollLast();
        maxD.addLast(nums[j]);
        minD.addLast(nums[j]);
        while (maxD.peekFirst() - minD.peekFirst() > limit) {
            if (maxD.peekFirst() == nums[i]) maxD.pollFirst();
            if (minD.peekFirst() == nums[i]) minD.pollFirst();
            i++;
        }
        best = Math.max(best, j - i + 1);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Two heaps | O(n log n) | O(n) |
| TreeMap multiset | O(n log n) | O(n) |
| Two monotonic deques | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> The deque version is new (the C++ stops at O(n log n)). All three verified against O(n²).

## Recall before you reveal
<details><summary>When do you pop a deque front?</summary>

When it equals nums[i], the leaving element.

</details>


## Connected
- [Sliding Window Maximum](Sliding%20Window%20Maximum.md)
- [Continuous Subarrays](Continuous%20Subarrays.md)
