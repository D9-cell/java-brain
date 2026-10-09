---
topic: Backtracking
pattern: [String partition backtracking]
source: LeetCode 1593
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Split a String Into the Max Number of Unique Substrings

> [!TIP]
> **🧠 Memory hook**
> Cut a ribbon so no two pieces are identical.
> **Mantra: NEW PIECE ONLY, ADD/REMOVE FROM SET**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=27) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Maximum number of unique substrings s can be split into.

## Key insight
Try every next piece that is not already used; maximise.

## Approach: Backtracking + set
```java
// Try every next piece s[i..j]; use it only if it is not already in the set; undo after recursing
private int solve(String s, int i, Set<String> used) {
    if (i == s.length()) return 0;
    int best = Integer.MIN_VALUE;
    for (int j = i + 1; j <= s.length(); j++) {
        String part = s.substring(i, j);
        if (!used.add(part)) continue;
        best = Math.max(best, 1 + solve(s, j, used));
        used.remove(part);
    }
    return best;
}

// Entry point
public int maxUniqueSplit(String s) { return solve(s, 0, new HashSet<>()); }
```

| Approach | Time | Space |
|---|---|---|
| Backtracking + set | O(n·2^n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against all cut masks.

## Recall before you reveal
<details><summary>Prune idea?</summary>

Stop if used + remaining chars ≤ best.

</details>

