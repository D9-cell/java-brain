---
topic: Graph Basics
pattern: [Elimination, Two pass]
source: LeetCode 277
difficulty: Medium
companies: [Google, Microsoft]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Find the Celebrity

> [!TIP]
> **🧠 Memory hook**
> At a party, ask one question to throw one person out: if A knows B, A is not the celebrity; if A does not know B, B is not.
> **Mantra: ELIMINATE, THEN VERIFY**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=14) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Among n people a celebrity is known by all and knows nobody. Using knows(a, b), find them with O(n) calls.

## Key insight
Each call discards one candidate: if the candidate knows i, the candidate is out; otherwise i is out. After n − 1 calls one candidate remains. A second pass verifies it.

## Approach: Eliminate then verify
```java
// Two passes: eliminate down to one candidate, then verify it against everyone
public int findCelebrity(int n) {
    int celebrity = 0;
    for (int i = 1; i < n; i++) if (knows(celebrity, i)) celebrity = i;
    for (int i = 0; i < n; i++) {
        if (i != celebrity && (knows(celebrity, i) || !knows(i, celebrity))) return -1;
    }
    return celebrity;
}

// The helper the problem provides: does a know b?
private boolean knows(int a, int b) {
    calls++;
    return relation[a][b];
}
```

| Approach | Time | Space |
|---|---|---|
| Eliminate then verify | O(n) | O(1) |

## Recall before you reveal
<details><summary>How many knows() calls?</summary>

At most 3n: n − 1 to eliminate and 2(n − 1) to verify.

</details>


<details><summary>Why verify?</summary>

Elimination only finds a possible celebrity; there may be none.

</details>


## Connected
- [Find Champion II](Find%20Champion%20II.md)
