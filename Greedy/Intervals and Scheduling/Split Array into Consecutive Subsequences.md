---
topic: Intervals and Scheduling
pattern: [Extend or start, Counts]
source: LeetCode 659
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Split Array into Consecutive Subsequences

> [!TIP]
> **🧠 Memory hook**
> Each number either **extends** a chain that needs it or **starts** a new chain of at least three.
> **Mantra: EXTEND FIRST, ELSE START x,x+1,x+2**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=9) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Can a sorted array be split into subsequences of consecutive integers, each of length at least 3?

## Key insight
Keep counts of available numbers and a map `need[x]` of chains waiting for x. For x: extend a chain if one needs it; otherwise start a new chain using x+1 and x+2; if neither works the answer is false.

## Approach 1: Counts + need map
```java
// Greedily extend an existing chain ending at x - 1; only start a new chain x, x+1, x+2 when no chain can be extended
public boolean isPossible(int[] nums) {
    Map<Integer, Integer> left = new HashMap<>(), need = new HashMap<>();
    for (int x : nums) left.merge(x, 1, Integer::sum);
    for (int x : nums) {
        if (left.get(x) == 0) continue;
        left.merge(x, -1, Integer::sum);
        if (need.getOrDefault(x, 0) > 0) {
            need.merge(x, -1, Integer::sum);
            need.merge(x + 1, 1, Integer::sum);
        } else if (left.getOrDefault(x + 1, 0) > 0 && left.getOrDefault(x + 2, 0) > 0) {
            left.merge(x + 1, -1, Integer::sum);
            left.merge(x + 2, -1, Integer::sum);
            need.merge(x + 3, 1, Integer::sum);
        } else return false;
    }
    return true;
}
```

## Approach 2: Heap of chain lengths
```java
// Min-heap per chain end: extend the shortest chain ending at x - 1
public boolean isPossibleHeap(int[] nums) {
    Map<Integer, PriorityQueue<Integer>> ends = new HashMap<>();
    for (int x : nums) {
        PriorityQueue<Integer> prev = ends.get(x - 1);
        int len = 1;
        if (prev != null && !prev.isEmpty()) len = prev.poll() + 1;
        ends.computeIfAbsent(x, k -> new PriorityQueue<>()).add(len);
    }
    for (PriorityQueue<Integer> pq : ends.values()) for (int len : pq) if (len < 3) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Counts + need map | O(n) | O(n) |
| Heap of chain lengths | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why extend before starting a new chain?</summary>

Extending uses one number, starting uses three; extending keeps more options open.

</details>


## Connected
- [Dota2 Senate](Dota2%20Senate.md)
