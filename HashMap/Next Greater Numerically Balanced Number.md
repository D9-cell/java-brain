---
topic: HashMap
pattern: [Precompute, Frequency counting]
source: LeetCode 2048
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Next Greater Numerically Balanced Number

> [!TIP]
> **🧠 Memory hook**
> Only a few hundred balanced numbers exist: precompute.
> **Mantra: PRECOMPUTE ≤ 1224444, BINARY SEARCH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=34) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Smallest number > n in which every digit d occurs exactly d times.

## Key insight
For n ≤ 1e6 the answer is at most 1224444. Scan upward, or precompute the list once and binary-search.

## Approach 1: Scan upward
```java
// Every digit d occurs exactly d times
static boolean balanced(int x) {
    int[] c = new int[10];
    for (; x > 0; x /= 10) c[x % 10]++;
    for (int d = 0; d < 10; d++) if (c[d] != 0 && c[d] != d) return false;
    return true;
}

// Approach 1: simulation: try n+1, n+2, … (the answer for n ≤ 1e6 is at most 1224444)
public int nextBeautifulNumberScan(int n) {
    for (int x = n + 1; ; x++) if (balanced(x)) return x;
}
```

## Approach 2: Precompute + binary search
```java
// First precomputed value > n
public int nextBeautifulNumber(int n) {
    int lo = 0, hi = ALL.size() - 1;
    while (lo < hi) { int m = (lo + hi) >>> 1; if (ALL.get(m) > n) hi = m; else lo = m + 1; }
    return ALL.get(lo);
}
```

| Approach | Time | Space |
|---|---|---|
| Scan upward | O(answer − n) | O(1) |
| Precompute + binary search | O(log k) per query | O(k) |

> [!WARNING]
> **Java gotcha**
> Both approaches agree on random n.

## Recall before you reveal
<details><summary>Upper bound?</summary>

1224444.

</details>

