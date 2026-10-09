---
topic: Backtracking
pattern: [Ordered generation]
source: LeetCode 1415
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# The k-th Lexicographical String of All Happy Strings of Length n

> [!TIP]
> **🧠 Memory hook**
> A dictionary walk: generate in order and stop at the k-th.
> **Mantra: a,b,c ORDER, NO EQUAL NEIGHBOURS, STOP AT k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=30) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Return the k-th happy string of length n (or "").

## Key insight
DFS in a, b, c order yields lexicographic order; count leaves and stop at k.

## Approach: Counting DFS
```java
// Approach 2: DFS in a, b, c order; count completed strings and stop at the k-th (no list stored)
private void solve(int n, int k, StringBuilder cur) {
    if (result != null) return;
    if (cur.length() == n) { if (++count == k) result = cur.toString(); return; }
    for (char c = 'a'; c <= 'c'; c++) {
        if (cur.length() > 0 && cur.charAt(cur.length() - 1) == c) continue;
        cur.append(c);
        solve(n, k, cur);
        cur.deleteCharAt(cur.length() - 1);
    }
}

// Entry point: "" if there are fewer than k happy strings
public String getHappyString(int n, int k) {
    count = 0;
    result = null;
    solve(n, k, new StringBuilder());
    return result == null ? "" : result;
}
```

| Approach | Time | Space |
|---|---|---|
| Counting DFS | O(n · 3·2^(n−1)) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified for every k and n ≤ 6 against a sorted list of all happy strings.

## Recall before you reveal
<details><summary>Math shortcut?</summary>

Each first letter owns 2^(n−1) strings: index directly.

</details>

