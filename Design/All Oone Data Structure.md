---
topic: Design
pattern: [HashMap + DLL of buckets]
source: LeetCode 432
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# All Oone Data Structure

> [!TIP]
> **🧠 Memory hook**
> An elevator of count buckets; keys only move one floor at a time.
> **Mantra: COUNT BUCKETS IN A DLL, MOVE ±1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=2) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
inc, dec, getMaxKey, getMinKey all in O(1).

## Key insight
Buckets (count, set of keys) live in a DLL sorted by count. A key moves to the neighbouring bucket, created on demand right next to the current one, so the order never needs sorting.

## Approach: Bucket DLL
```java
// One bucket per distinct count, kept in a doubly linked list sorted by count
static class Bucket {
    int count;
    Set<String> keys = new HashSet<>();
    Bucket prev, next;

    Bucket(int c) { count = c; }
}

// Buckets between head and tail sentinels + key → bucket map, all operations O(1)
static class AllOne {
    private final Bucket head = new Bucket(0), tail = new Bucket(Integer.MAX_VALUE);
    private final Map<String, Bucket> where = new HashMap<>();

    AllOne() { head.next = tail; tail.prev = head; }

    // Inserts a new bucket right after b
    private Bucket addAfter(Bucket b, int count) {
        Bucket nb = new Bucket(count);
        nb.prev = b; nb.next = b.next;
        b.next.prev = nb; b.next = nb;
        return nb;
    }

    // Unlinks an empty bucket
    private void removeIfEmpty(Bucket b) {
        if (b == head || !b.keys.isEmpty()) return;
        b.prev.next = b.next; b.next.prev = b.prev;
    }

    // Moves key to the bucket with count + 1 (creating it next door if needed)
    public void inc(String key) {
        Bucket cur = where.getOrDefault(key, head);
        Bucket nx = cur.next.count == cur.count + 1 ? cur.next : addAfter(cur, cur.count + 1);
        nx.keys.add(key);
        where.put(key, nx);
        if (cur != head) { cur.keys.remove(key); removeIfEmpty(cur); }
    }

    // Moves key to the bucket with count - 1, or drops it at count 0
    public void dec(String key) {
        Bucket cur = where.get(key);
        if (cur == null) return;
        cur.keys.remove(key);
        if (cur.count == 1) where.remove(key);
        else {
            Bucket pv = cur.prev.count == cur.count - 1 ? cur.prev : addAfter(cur.prev, cur.count - 1);
            pv.keys.add(key);
            where.put(key, pv);
        }
        removeIfEmpty(cur);
    }

    // Any key in the last bucket
    public String getMaxKey() { return tail.prev == head ? "" : tail.prev.keys.iterator().next(); }

    // Any key in the first bucket
    public String getMinKey() { return head.next == tail ? "" : head.next.keys.iterator().next(); }
}
```

| Approach | Time | Space |
|---|---|---|
| Bucket DLL | O(1) | O(keys) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Why is the DLL always sorted?</summary>

New buckets are created only adjacent to existing ones.

</details>


## Connected
- [LFU Cache](LFU%20Cache.md)
