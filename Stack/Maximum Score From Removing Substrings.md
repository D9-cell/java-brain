---
topic: Stack
pattern: [Greedy + stack]
source: LeetCode 1717
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Maximum Score From Removing Substrings

> [!TIP]
> **🧠 Memory hook**
> Cash in the more valuable pair first.
> **Mantra: GREEDY: HIGH PAIR FIRST, STACK REMOVAL**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=14) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Remove "ab" (x points) and "ba" (y points) repeatedly; maximise points.

## Key insight
Remove all occurrences of the more valuable pair with a stack, then the other pair from the remainder.

## Approach: Two stack passes
```java
// Removes every occurrence of the pair (a, b) with a stack; returns [points, remaining string]
static Object[] removePairs(String s, char a, char b, int pts) {
    StringBuilder st = new StringBuilder();
    int score = 0;
    for (char c : s.toCharArray()) {
        if (c == b && st.length() > 0 && st.charAt(st.length() - 1) == a) { st.deleteCharAt(st.length() - 1); score += pts; }
        else st.append(c);
    }
    return new Object[]{score, st.toString()};
}

// Greedy: remove the more valuable pair first everywhere, then the other pair from what is left
public int maximumGain(String s, int x, int y) {
    String first = x >= y ? "ab" : "ba";
    int hi = Math.max(x, y), lo = Math.min(x, y);
    Object[] r1 = removePairs(s, first.charAt(0), first.charAt(1), hi);
    Object[] r2 = removePairs((String) r1[1], first.charAt(1), first.charAt(0), lo);
    return (int) r1[0] + (int) r2[0];
}
```

| Approach | Time | Space |
|---|---|---|
| Two stack passes | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search over every removal order.

## Recall before you reveal
<details><summary>Why is greedy safe?</summary>

Each letter is used once; taking a high pair never reduces the number of high pairs available.

</details>

