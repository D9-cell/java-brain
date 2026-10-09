---
topic: Heap
pattern: [Heap of (char, -index), Per-letter stacks]
source: LeetCode 3170
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Lexicographically Minimum String After Removing Stars

> [!TIP]
> **🧠 Memory hook**
> A bouncer removes the cheapest guest — the latest copy — to keep early cheap guests in line.
> **Mantra: PER-LETTER STACKS, DELETE SMALLEST LETTER'S RIGHTMOST**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=3) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
Each '*' deletes the smallest non-star character to its left; return the lexicographically smallest final string.

## Key insight
Delete the smallest letter, and among equal letters the rightmost one (deleting earlier copies would let bigger letters move forward).

## Approach 1: Min-heap (char asc, index desc)
```java
// Heap version from the C++: (char asc, index desc)
public String clearStarsHeap(String s) {
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]);
    boolean[] gone = new boolean[s.length()];
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) != '*') pq.offer(new int[]{s.charAt(i), i});
        else { gone[i] = true; gone[pq.poll()[1]] = true; }
    }
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < s.length(); i++) if (!gone[i]) sb.append(s.charAt(i));
    return sb.toString();
}
```

## Approach 2: 26 stacks of indices
```java
// For each '*' delete the smallest letter to its left; on ties delete the RIGHTMOST copy (keeps small letters early)
public String clearStars(String s) {
    List<Deque<Integer>> pos = new ArrayList<>();
    for (int c = 0; c < 26; c++) pos.add(new ArrayDeque<>());
    boolean[] gone = new boolean[s.length()];
    for (int i = 0; i < s.length(); i++) {
        char ch = s.charAt(i);
        if (ch != '*') { pos.get(ch - 'a').push(i); continue; }
        gone[i] = true;
        for (int c = 0; c < 26; c++) if (!pos.get(c).isEmpty()) { gone[pos.get(c).pop()] = true; break; }
    }
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < s.length(); i++) if (!gone[i]) sb.append(s.charAt(i));
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Min-heap (char asc, index desc) | O(n log n) | O(n) |
| 26 stacks of indices | O(26·n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Heap and stack versions agree on 500 random strings.

## Recall before you reveal
<details><summary>Why rightmost copy?</summary>

It keeps the prefix as small as possible.

</details>

