---
topic: Intervals and Scheduling
pattern: [Expand ranges, Sort by end]
source: LeetCode 1520
difficulty: Hard
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Number of Non-Overlapping Substrings

> [!TIP]
> **🧠 Memory hook**
> Every substring must contain **all occurrences of its letters**: grow each letter's range until it is closed.
> **Mantra: EXPAND FIRST..LAST, THEN ACTIVITY SELECTION**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Intervals%20and%20Scheduling/Intervals%20and%20Scheduling%20Animations.html#p=10) · **Pattern hub:** [Intervals and Scheduling - Pattern Map](Intervals%20and%20Scheduling%20-%20Pattern%20Map.md)

## Problem
Choose the maximum number of non-overlapping substrings such that every letter in a chosen substring has all its occurrences inside it; among those choose the smallest total length.

## Key insight
For each letter expand `[first, last]` over every letter inside it; drop the range if a letter inside started earlier. Then pick ranges greedily by the earliest end (and for equal ends the shorter one) as in activity selection.

## Approach: Expand + select
```java
// Each letter's first..last range is grown until it holds all occurrences of every letter inside it; then pick intervals by the earliest end
public List<String> maxNumOfSubstrings(String s) {
    int n = s.length();
    int[] first = new int[26], last = new int[26];
    Arrays.fill(first, n);
    Arrays.fill(last, -1);
    for (int i = 0; i < n; i++) { int c = s.charAt(i) - 'a'; first[c] = Math.min(first[c], i); last[c] = i; }
    List<int[]> ranges = new ArrayList<>();
    for (int c = 0; c < 26; c++) {
        if (last[c] < 0) continue;
        int[] rg = expand(s, c, first, last);
        if (rg != null) ranges.add(rg);
    }
    ranges.sort((a, b) -> a[1] != b[1] ? a[1] - b[1] : b[0] - a[0]);
    List<String> res = new ArrayList<>();
    int end = -1;
    for (int[] r : ranges) if (r[0] > end) { res.add(s.substring(r[0], r[1] + 1)); end = r[1]; }
    return res;
}

// Grows [first, last] of letter c until stable; returns null if it would swallow a letter that starts before the range
private int[] expand(String s, int c, int[] first, int[] last) {
    int lo = first[c], hi = last[c];
    for (int i = lo; i <= hi; i++) {
        int d = s.charAt(i) - 'a';
        if (first[d] < lo) return null;
        hi = Math.max(hi, last[d]);
    }
    return new int[]{lo, hi};
}
```

| Approach | Time | Space |
|---|---|---|
| Expand + select | O(26 n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked count and total length against a search over all valid substrings. Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why discard ranges that include a letter starting earlier?</summary>

That letter's own (larger) range will be considered separately.

</details>


## Connected
- [Non-overlapping Intervals](Non-overlapping%20Intervals.md)
