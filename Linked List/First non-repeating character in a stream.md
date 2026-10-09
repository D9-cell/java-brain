---
topic: Linked List
pattern: [Doubly linked list / queue]
source: GFG / InterviewBit
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, linked-list]
---
# First non-repeating character in a stream

> [!TIP]
> **🧠 Memory hook**
> A waiting line of candidates; repeat offenders leave.
> **Mantra: QUEUE / DLL OF CANDIDATES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Linked%20List/Linked%20List%20Animations.html#p=7) · **Pattern hub:** [Linked List - Pattern Map](Linked%20List%20-%20Pattern%20Map.md)

## Problem
After each character, output the first character that has appeared exactly once so far (or #).

## Key insight
Keep candidates in arrival order; drop the front while it has repeated. A DLL (LinkedHashSet) gives O(1) removal anywhere.

## Approach 1: LinkedHashSet as DLL
```java
// Approach 1: doubly linked list of non-repeating chars (LinkedHashSet gives O(1) remove + order)
public String firstNonRepeatingDll(String s) {
    LinkedHashSet<Character> dll = new LinkedHashSet<>();
    boolean[] repeated = new boolean[26];
    StringBuilder sb = new StringBuilder();
    for (char c : s.toCharArray()) {
        if (!repeated[c - 'a']) { if (!dll.add(c)) { dll.remove(c); repeated[c - 'a'] = true; } }
        sb.append(dll.isEmpty() ? '#' : dll.iterator().next());
    }
    return sb.toString();
}
```

## Approach 2: Queue
```java
// Approach 2: queue of candidates in arrival order; drop the front while it has repeated
public String firstNonRepeating(String s) {
    int[] cnt = new int[26];
    Deque<Character> q = new ArrayDeque<>();
    StringBuilder sb = new StringBuilder();
    for (char c : s.toCharArray()) {
        if (cnt[c - 'a']++ == 0) q.offer(c);
        while (!q.isEmpty() && cnt[q.peek() - 'a'] > 1) q.poll();
        sb.append(q.isEmpty() ? '#' : q.peek());
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| LinkedHashSet as DLL | O(n) | O(26) |
| Queue | O(n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Verified against recomputing the answer from scratch at every step.

## Recall before you reveal
<details><summary>Why can the queue drop lazily?</summary>

A repeated char never becomes non-repeating again.

</details>

