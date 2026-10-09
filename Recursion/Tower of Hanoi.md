---
topic: Recursion
pattern: [Trust the helper, Divide and conquer]
source: GFG
difficulty: Medium
companies: [Samsung, Goldman Sachs]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Tower of Hanoi

> [!TIP]
> **🧠 Memory hook**
> Moving house with a tall wardrobe at the bottom: clear everything above it, move the wardrobe, put everything back on top.
> **Mantra: n−1 AWAY, BIG ONE OVER, n−1 BACK**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=0) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Move n disks from rod `from` to rod `to` using `aux`, printing moves; return the move count.

## Key insight
`toh(n)` = `toh(n−1, from→aux)` + move disk n + `toh(n−1, aux→to)`.

## Approach: Recursion
```java
// Move n-1 out of the way, move the biggest disk, move n-1 back on top
long toh(int n, int from, int to, int aux) {
    if (n == 0) return 0;
    long count = toh(n - 1, from, aux, to);
    moves.add("move disk " + n + " from rod " + from + " to rod " + to);
    count++;
    count += toh(n - 1, aux, to, from);
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion | O(2^n) | O(n) stack |

## Recall before you reveal
<details><summary>Number of moves?</summary>

2^n − 1.

</details>


<details><summary>Helper rod in the second call?</summary>

`from`.

</details>


## Connected
- [Reverse a Stack](Reverse%20a%20Stack.md)
