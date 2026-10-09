---
topic: Heap
pattern: [Top-k heap]
source: LeetCode 692
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Top K Frequent Words

> [!TIP]
> **🧠 Memory hook**
> A size-k lounge where the worst word stands at the door.
> **Mantra: MIN-HEAP OF WORST, REVERSE AT THE END**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=26) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Return the k most frequent words, ties in alphabetical order.

## Key insight
The heap comparator ranks "worse" first: lower count, or same count and alphabetically larger.

## Approach: Min-heap
```java
// Min-heap of size k whose "worst" word is on top (lower count, or later in alphabet); reverse at the end
public List<String> topKFrequent(String[] words, int k) {
    Map<String, Integer> cnt = new HashMap<>();
    for (String w : words) cnt.merge(w, 1, Integer::sum);
    PriorityQueue<String> pq = new PriorityQueue<>((a, b) -> !cnt.get(a).equals(cnt.get(b)) ? cnt.get(a) - cnt.get(b) : b.compareTo(a));
    for (String w : cnt.keySet()) { pq.offer(w); if (pq.size() > k) pq.poll(); }
    LinkedList<String> res = new LinkedList<>();
    while (!pq.isEmpty()) res.addFirst(pq.poll());
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Min-heap | O(n log k) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a full sort on random word lists.

## Recall before you reveal
<details><summary>Why reverse at the end?</summary>

Popping yields worst → best.

</details>


## Connected
- [Top K Frequent Elements](Top%20K%20Frequent%20Elements.md)
