---
topic: HashSet
pattern: [TreeSet, Counter + overflow set]
source: LeetCode 2336
difficulty: Medium
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Smallest Number in Infinite Set

> [!TIP]
> **🧠 Memory hook**
> A ticket roll (the counter) plus a small tray of returned tickets; serve from the tray first.
> **Mantra: TAIL COUNTER + TREESET OF RETURNS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=9) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
Implement popSmallest() and addBack(num) on the set of all positive integers.

## Key insight
Everything ≥ `curr` is untouched. Only numbers returned below `curr` need storing, in sorted order.

## Approach 1: boolean array + pointer
```java
// Approach 1: boolean[1001] presence array with a moving pointer
static class ArraySet {
    private final boolean[] present = new boolean[1002];
    private int smallest = 1;

    ArraySet() { Arrays.fill(present, true); }

    // Returns the pointer value and advances to the next present number
    public int popSmallest() {
        int res = smallest;
        present[res] = false;
        while (smallest < 1001 && !present[smallest]) smallest++;
        return res;
    }

    // Marks num present again and moves the pointer back if needed
    public void addBack(int num) {
        present[num] = true;
        smallest = Math.min(smallest, num);
    }
}
```

## Approach 2: Min-heap + HashSet
```java
// Approach 2: min-heap + HashSet (no duplicates) for added-back numbers, plus a counter for the untouched tail
static class HeapSet {
    private final PriorityQueue<Integer> pq = new PriorityQueue<>();
    private final Set<Integer> inHeap = new HashSet<>();
    private int curr = 1;

    // Takes from the heap first, otherwise from the counter
    public int popSmallest() {
        if (!pq.isEmpty()) { int x = pq.poll(); inHeap.remove(x); return x; }
        return curr++;
    }

    // Only numbers below the counter that are not already back need storing
    public void addBack(int num) {
        if (num < curr && inHeap.add(num)) pq.offer(num);
    }
}
```

## Approach 3: TreeSet
```java
// Approach 3: a TreeSet does the job of heap + HashSet
static class SmallestInfiniteSet {
    private final TreeSet<Integer> back = new TreeSet<>();
    private int curr = 1;

    // Smallest added-back number if any, otherwise the counter
    public int popSmallest() {
        return back.isEmpty() ? curr++ : back.pollFirst();
    }

    // Ignore numbers that are still in the untouched tail
    public void addBack(int num) {
        if (num < curr) back.add(num);
    }
}
```

| Approach | Time | Space |
|---|---|---|
| boolean array + pointer | O(1000) per pop | O(1000) |
| Min-heap + HashSet | O(log n) | O(n) |
| TreeSet | O(log n) | O(n) |

## Recall before you reveal
<details><summary>Why the HashSet beside the heap?</summary>

A PriorityQueue allows duplicates.

</details>


<details><summary>Why ignore addBack(num ≥ curr)?</summary>

It was never removed.

</details>


## Connected
- Heap folder (PQ patterns)
