---
topic: Design
pattern: [Hashing, Separate chaining]
source: LeetCode 706
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design HashMap

> [!TIP]
> **🧠 Memory hook**
> A wall of mailboxes: the hash picks the box; a box can hold several letters.
> **Mantra: key % SIZE → BUCKET LIST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=9) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
put/get/remove without built-in hash tables.

## Key insight
Array of buckets; bucket = small list of (key, value). Prime bucket count.

## Approach: Chaining
```java
// Separate chaining: an array of buckets, each a small list of (key, value) pairs
static class MyHashMap {
    private static final int SIZE = 10007;
    private final List<int[]>[] buckets = new List[SIZE];

    // Finds the pair for key in its bucket, or null
    private int[] find(int key) {
        List<int[]> b = buckets[key % SIZE];
        if (b == null) return null;
        for (int[] p : b) if (p[0] == key) return p;
        return null;
    }

    // Update if present, else append to the bucket
    public void put(int key, int value) {
        int[] p = find(key);
        if (p != null) { p[1] = value; return; }
        if (buckets[key % SIZE] == null) buckets[key % SIZE] = new LinkedList<>();
        buckets[key % SIZE].add(new int[]{key, value});
    }

    // Value or -1
    public int get(int key) {
        int[] p = find(key);
        return p == null ? -1 : p[1];
    }

    // Remove the pair from its bucket
    public void remove(int key) {
        List<int[]> b = buckets[key % SIZE];
        if (b != null) b.removeIf(p -> p[0] == key);
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Chaining | O(1) average | O(SIZE + n) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Brute alternative?</summary>

int[1e6+1] filled with -1.

</details>


## Connected
- [Design HashSet](Design%20HashSet.md)
