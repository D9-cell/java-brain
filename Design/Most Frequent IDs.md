---
topic: Design
pattern: [Lazy max-heap]
source: LeetCode 3092
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Most Frequent IDs

> [!TIP]
> **🧠 Memory hook**
> A leaderboard that keeps old printouts; ignore printouts that no longer match.
> **Mantra: COUNT MAP + LAZY MAX-HEAP**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=25) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
After each update (id, ±freq), output the maximum frequency.

## Key insight
Push (newCount, id) every time; pop tops whose stored count differs from the live count.

## Approach: Lazy heap
```java
// id → count, plus a max-heap of (count, id) cleaned lazily when its top is stale
public long[] mostFrequentIDs(int[] nums, int[] freq) {
    Map<Integer, Long> count = new HashMap<>();
    PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(b[0], a[0]));
    long[] ans = new long[nums.length];
    for (int i = 0; i < nums.length; i++) {
        long c = count.merge(nums[i], (long) freq[i], Long::sum);
        pq.offer(new long[]{c, nums[i]});
        while (!pq.isEmpty() && pq.peek()[0] != count.get((int) pq.peek()[1])) pq.poll();
        ans[i] = pq.isEmpty() ? 0 : pq.peek()[0];
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Lazy heap | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against recomputing the max after every step.

## Recall before you reveal
<details><summary>TreeMap alternative?</summary>

Count → how many ids have it; lastKey().

</details>

