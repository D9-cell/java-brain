---
topic: Design
pattern: [HashMap + DLL]
source: LeetCode 146
difficulty: Medium
companies: [Amazon, Microsoft, Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# LRU Cache

> [!TIP]
> **🧠 Memory hook**
> A stack of books on your desk: touched books go on top; when full, the bottom book leaves.
> **Mantra: HASHMAP + DLL, TOUCH → FRONT, EVICT TAIL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=0) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
Implement get and put in O(1), evicting the least recently used key when over capacity.

## Key insight
The map finds the node; the DLL keeps recency order with O(1) unlink/insert. Sentinel head/tail remove the null checks.

## Approach 1: Brute list
```java
// Approach 0 (brute force): a list ordered by recency, O(n) per operation
static class BruteCache {
    private final int capacity;
    private final LinkedList<int[]> list = new LinkedList<>();

    BruteCache(int capacity) { this.capacity = capacity; }

    // Scan, move to the end on hit
    public int get(int key) {
        for (int[] p : list) if (p[0] == key) { list.remove(p); list.addLast(p); return p[1]; }
        return -1;
    }

    // Scan, update or append; evict the first when full
    public void put(int key, int value) {
        for (int[] p : list) if (p[0] == key) { list.remove(p); p[1] = value; list.addLast(p); return; }
        if (list.size() == capacity) list.removeFirst();
        list.addLast(new int[]{key, value});
    }
}
```

## Approach 2: HashMap + DLL
```java
// Doubly linked list node
static class Node {
    int key, val;
    Node prev, next;

    Node(int k, int v) { key = k; val = v; }
}

// HashMap for O(1) lookup + DLL for O(1) recency order (head side = most recent)
static class Cache {
    private final int capacity;
    private final Map<Integer, Node> map = new HashMap<>();
    private final Node head = new Node(0, 0), tail = new Node(0, 0);

    Cache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    // Unlink a node
    private void remove(Node n) { n.prev.next = n.next; n.next.prev = n.prev; }

    // Insert right after head
    private void addFront(Node n) { n.next = head.next; n.prev = head; head.next.prev = n; head.next = n; }

    // Hit → move to the front
    public int get(int key) {
        Node n = map.get(key);
        if (n == null) return -1;
        remove(n);
        addFront(n);
        return n.val;
    }

    // Update + move to front, or insert and evict tail.prev when over capacity
    public void put(int key, int value) {
        Node n = map.get(key);
        if (n != null) { n.val = value; remove(n); addFront(n); return; }
        if (map.size() == capacity) { Node lru = tail.prev; remove(lru); map.remove(lru.key); }
        n = new Node(key, value);
        addFront(n);
        map.put(key, n);
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Brute list | O(n) | O(n) |
| HashMap + DLL | O(1) | O(capacity) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>What does a node store?</summary>

key AND value (the key is needed to delete from the map on eviction).

</details>


<details><summary>Java one-liner alternative?</summary>

LinkedHashMap with accessOrder = true and removeEldestEntry.

</details>


## Connected
- [LFU Cache](LFU%20Cache.md)
