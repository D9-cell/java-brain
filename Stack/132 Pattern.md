---
topic: Stack
pattern: [Monotonic stack]
source: LeetCode 456
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# 132 Pattern

> [!TIP]
> **🧠 Memory hook**
> Scan from the right with a trophy shelf of "3"s; anything knocked off is the best "2".
> **Mantra: RIGHT→LEFT, POPPED = BEST "2", a[i] < two → FOUND**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=0) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Is there i < j < k with nums[i] < nums[k] < nums[j]?

## Key insight
From the right, keep a decreasing stack of "3" candidates. When a bigger value arrives, the popped values are valid "2"s (each has a bigger "3" to its left); keep the largest. A later (further left) value smaller than it is a "1".

## Approach 1: Triple loop
```java
// Approach 1: try every triple
public boolean find132patternBrute(int[] a) {
    for (int i = 0; i < a.length; i++) for (int j = i + 1; j < a.length; j++) for (int k = j + 1; k < a.length; k++)
        if (a[i] < a[k] && a[k] < a[j]) return true;
    return false;
}
```

## Approach 2: Prefix min + scan
```java
// Approach 2: fix j, keep the minimum to its left as the best "1", scan for a "2" on the right
public boolean find132patternN2(int[] a) {
    int min = Integer.MAX_VALUE;
    for (int j = 0; j < a.length; j++) {
        min = Math.min(min, a[j]);
        for (int k = j + 1; k < a.length; k++) if (min < a[k] && a[k] < a[j]) return true;
    }
    return false;
}
```

## Approach 3: Monotonic stack
```java
// Approach 3: scan right to left; the stack holds "3" candidates; popped smaller values become the best "2"
public boolean find132pattern(int[] a) {
    Deque<Integer> st = new ArrayDeque<>();
    int two = Integer.MIN_VALUE;
    for (int i = a.length - 1; i >= 0; i--) {
        if (a[i] < two) return true;
        while (!st.isEmpty() && st.peek() < a[i]) two = st.pop();
        st.push(a[i]);
    }
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Triple loop | O(n³) | O(1) |
| Prefix min + scan | O(n²) | O(1) |
| Monotonic stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> All three approaches agree on 500 random arrays.

## Recall before you reveal
<details><summary>Why from the right?</summary>

So "3" and "2" are known when the candidate "1" appears.

</details>

