---
topic: Sliding Window
pattern: [Count windows, TreeMap]
source: LeetCode 2762
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Continuous Subarrays

> [!TIP]
> **🧠 Memory hook**
> A thermometer that only reads max and min: a TreeMap.
> **Mantra: TREEMAP; SHRINK WHILE max − min > 2; ADD j − i + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=4) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Count subarrays where every two elements differ by at most 2.

## Key insight
Valid ⇔ max − min ≤ 2, which is monotone: shrinking keeps a window valid. So every start in [i..j] works for end j.

## Approach 1: TreeMap window
A valid window holds at most 3 distinct values, so TreeMap operations are O(1).

```java
// TreeMap window: shrink while max - min > 2, then every subarray ending at j is valid
public long continuousSubarrays(int[] nums) {
    TreeMap<Integer, Integer> win = new TreeMap<>();
    long count = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        win.merge(nums[j], 1, Integer::sum);
        while (win.lastKey() - win.firstKey() > 2) {
            if (win.merge(nums[i], -1, Integer::sum) == 0) win.remove(nums[i]);
            i++;
        }
        count += j - i + 1;
    }
    return count;
}
```

## Approach 2: Two heaps with lazy deletion
```java
// Min and max heaps of (value, index) with lazy deletion of indices left of i
public long continuousSubarraysHeaps(int[] nums) {
    PriorityQueue<int[]> minH = new PriorityQueue<>((a, b) -> a[0] - b[0]), maxH = new PriorityQueue<>((a, b) -> b[0] - a[0]);
    long count = 0;
    for (int i = 0, j = 0; j < nums.length; j++) {
        minH.add(new int[]{nums[j], j});
        maxH.add(new int[]{nums[j], j});
        while (maxH.peek()[0] - minH.peek()[0] > 2) {
            i++;
            while (maxH.peek()[1] < i) maxH.poll();
            while (minH.peek()[1] < i) minH.poll();
        }
        count += j - i + 1;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| TreeMap window | O(n) | O(1) |
| Two heaps with lazy deletion | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Answer can exceed int: return long. Verified against O(n²).

## Recall before you reveal
<details><summary>Why is the TreeMap version effectively O(n)?</summary>

At most 3 keys live in it.

</details>


<details><summary>Other O(n) way?</summary>

Two monotonic deques.

</details>


## Connected
- [Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit](Longest%20Continuous%20Subarray%20With%20Absolute%20Diff%20Less%20Than%20or%20Equal%20to%20Limit.md)
