---
topic: Design
pattern: [Frequency buckets, LinkedHashSet]
source: LeetCode 460
difficulty: Hard
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# LFU Cache

> [!TIP]
> **🧠 Memory hook**
> A popularity chart with floors; evict from the lowest floor, oldest first.
> **Mantra: FREQ BUCKETS (LinkedHashSet) + minFreq**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=1) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
get/put in O(1); evict the least frequently used key, ties → least recently used.

## Key insight
freq → LinkedHashSet of keys (insertion order = recency), key → (value, freq), and minFreq. Touch moves a key one bucket up.

## Approach: Buckets + minFreq
```java
// key → [value, freq]; freq → keys in recency order (LinkedHashSet); minFreq tracks the eviction bucket
static class Cache {
    private final int capacity;
    private int minFreq = 0;
    private final Map<Integer, int[]> data = new HashMap<>();
    private final Map<Integer, LinkedHashSet<Integer>> buckets = new HashMap<>();

    Cache(int capacity) { this.capacity = capacity; }

    // Moves key from bucket f to bucket f + 1 (and fixes minFreq if bucket f emptied)
    private void touch(int key) {
        int[] d = data.get(key);
        LinkedHashSet<Integer> b = buckets.get(d[1]);
        b.remove(key);
        if (b.isEmpty() && d[1] == minFreq) minFreq++;
        d[1]++;
        buckets.computeIfAbsent(d[1], f -> new LinkedHashSet<>()).add(key);
    }

    // Hit → bump frequency
    public int get(int key) {
        if (!data.containsKey(key)) return -1;
        touch(key);
        return data.get(key)[0];
    }

    // Update + bump, or evict the least-recent key of minFreq and insert with freq 1
    public void put(int key, int value) {
        if (capacity == 0) return;
        if (data.containsKey(key)) { data.get(key)[0] = value; touch(key); return; }
        if (data.size() == capacity) {
            Iterator<Integer> it = buckets.get(minFreq).iterator();
            data.remove(it.next());
            it.remove();
        }
        data.put(key, new int[]{value, 1});
        buckets.computeIfAbsent(1, f -> new LinkedHashSet<>()).add(key);
        minFreq = 1;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Buckets + minFreq | O(1) | O(capacity) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>minFreq on insert?</summary>

Always 1.

</details>


<details><summary>minFreq on touch?</summary>

+1 if its old bucket became empty and was the min.

</details>


## Connected
- [LRU Cache](LRU%20Cache.md)
- [All Oone Data Structure](All%20Oone%20Data%20Structure.md)
