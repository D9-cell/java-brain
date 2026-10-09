---
topic: Stack
pattern: [Split point, Stack]
source: LeetCode 1653
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Minimum Deletions to Make String Balanced

> [!TIP]
> **🧠 Memory hook**
> Draw a line: b's before it and a's after it go.
> **Mantra: TRY EVERY SPLIT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=16) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Minimum deletions so no "b" appears before an "a".

## Key insight
For every split, cost = b's to the left + a's to the right; or with a stack count cancelled "ba" pairs.

## Approach 1: Stack
```java
// Approach 1: stack; every "ba" pair (b on the stack, a arriving) costs one deletion
public int minimumDeletionsStack(String s) {
    Deque<Character> st = new ArrayDeque<>();
    int del = 0;
    for (char c : s.toCharArray()) {
        if (c == 'a' && !st.isEmpty() && st.peek() == 'b') { st.pop(); del++; }
        else st.push(c);
    }
    return del;
}
```

## Approach 2: Split counting
```java
// Approach 2: choose a split: delete every 'b' before it and every 'a' after it
public int minimumDeletions(String s) {
    int aRight = 0, bLeft = 0;
    for (char c : s.toCharArray()) if (c == 'a') aRight++;
    int best = aRight;
    for (char c : s.toCharArray()) {
        if (c == 'a') aRight--; else bLeft++;
        best = Math.min(best, aRight + bLeft);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Stack | O(n) | O(n) |
| Split counting | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against trying every deletion set.

## Recall before you reveal
<details><summary>DP view?</summary>

dp = min(dp + 1, bCount) on each "a".

</details>

