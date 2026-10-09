---
topic: Heap
pattern: [Counting + heap]
source: LeetCode 451
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Sort Characters By Frequency

> [!TIP]
> **🧠 Memory hook**
> Line up letters by popularity.
> **Mantra: COUNT, POUR BY COUNT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=24) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Sort characters by decreasing frequency.

## Key insight
Count, then output via a max-heap (or buckets).

## Approach: Max-heap
```java
// Count, then pour characters out of a max-heap by count
public String frequencySort(String s) {
    Map<Character, Integer> cnt = new HashMap<>();
    for (char c : s.toCharArray()) cnt.merge(c, 1, Integer::sum);
    PriorityQueue<Character> pq = new PriorityQueue<>((a, b) -> cnt.get(b) - cnt.get(a));
    pq.addAll(cnt.keySet());
    StringBuilder sb = new StringBuilder();
    while (!pq.isEmpty()) { char c = pq.poll(); sb.append(String.valueOf(c).repeat(cnt.get(c))); }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Max-heap | O(n + k log k) | O(k) |

## Recall before you reveal
<details><summary>Bucket version?</summary>

bucket[count] → letters.

</details>


## Connected
- [Top K Frequent Elements](Top%20K%20Frequent%20Elements.md)
