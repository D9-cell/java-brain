---
topic: Design
pattern: [Direct addressing, Chaining]
source: LeetCode 705
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design HashSet

> [!TIP]
> **🧠 Memory hook**
> A light switch per key, or mailboxes when keys are huge.
> **Mantra: boolean[1e6+1] OR CHAINING**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=10) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
add/remove/contains.

## Key insight
Small key range → boolean array; otherwise chaining like Design HashMap.

## Approach 1: Boolean array
```java
// Approach 1: a direct-address boolean array (keys are 0..1e6)
static class MyHashSetArray {
    private final boolean[] present = new boolean[1_000_001];

    // Mark present
    public void add(int key) { present[key] = true; }

    // Mark absent
    public void remove(int key) { present[key] = false; }

    // Lookup
    public boolean contains(int key) { return present[key]; }
}
```

## Approach 2: Chaining
```java
// Approach 2: separate chaining with a prime number of buckets
static class MyHashSet {
    private static final int SIZE = 10007;
    private final List<Integer>[] buckets = new List[SIZE];

    // Add if absent
    public void add(int key) {
        if (buckets[key % SIZE] == null) buckets[key % SIZE] = new LinkedList<>();
        if (!buckets[key % SIZE].contains(key)) buckets[key % SIZE].add(key);
    }

    // Remove the boxed key (not the index!)
    public void remove(int key) { if (buckets[key % SIZE] != null) buckets[key % SIZE].remove(Integer.valueOf(key)); }

    // Lookup in the bucket
    public boolean contains(int key) { return buckets[key % SIZE] != null && buckets[key % SIZE].contains(key); }
}
```

| Approach | Time | Space |
|---|---|---|
| Boolean array | O(1) | O(1e6) |
| Chaining | O(1) average | O(SIZE + n) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Java trap?</summary>

List<Integer>.remove(int) removes by INDEX; use Integer.valueOf(key).

</details>


## Connected
- [Design HashMap](Design%20HashMap.md)
