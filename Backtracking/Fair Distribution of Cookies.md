---
topic: Backtracking
pattern: [Partition into groups, Pruning]
source: LeetCode 2305
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Fair Distribution of Cookies

> [!TIP]
> **🧠 Memory hook**
> Dealing cards to children, pruning hands that are already too big.
> **Mantra: GIVE BAG TO EACH KID, BOUND + SYMMETRY PRUNES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=8) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Minimise the maximum total of any child when distributing bags to k children.

## Key insight
Assign each bag to each child; prune when a child reaches the best so far; empty children are interchangeable.

## Approach: Backtracking with prunes
```java
// Give bag i to each child in turn; prune when a child already exceeds the best unfairness
private void solve(int[] cookies, int i, int[] kids) {
    if (i == cookies.length) { best = Math.min(best, Arrays.stream(kids).max().getAsInt()); return; }
    for (int c = 0; c < kids.length; c++) {
        if (kids[c] + cookies[i] >= best) continue;
        kids[c] += cookies[i];
        solve(cookies, i + 1, kids);
        kids[c] -= cookies[i];
        if (kids[c] == 0) break;
    }
}

// Entry point
public int distributeCookies(int[] cookies, int k) {
    best = Integer.MAX_VALUE;
    solve(cookies, 0, new int[k]);
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking with prunes | O(k^n) worst | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against all k^n assignments.

## Recall before you reveal
<details><summary>Symmetry break?</summary>

After trying an empty child, stop.

</details>


## Connected
- [Partition to K Equal Sum Subsets](Partition%20to%20K%20Equal%20Sum%20Subsets.md)
