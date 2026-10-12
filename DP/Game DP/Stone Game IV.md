---
topic: Game DP
pattern: [Win flag, Perfect squares]
source: LeetCode 1510
difficulty: Hard
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Stone Game IV

> [!TIP]
> **🧠 Memory hook**
> A position is **winning** if some square move leaves the opponent in a losing one.
> **Mantra: win[i] = ∃ s: !win[i − s²]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Game%20DP/Game%20DP%20Animations.html#p=7) · **Pattern hub:** [Game DP - Pattern Map](Game%20DP%20-%20Pattern%20Map.md)

## Problem
Players alternately remove a non-zero square number of stones from a pile of n. A player who cannot move loses. Return true if Alice wins.

## Key insight
win[0] is false. For each i try every square s² ≤ i; if any resulting win[i − s²] is false, then i is winning.

## Approach: Boolean DP
```java
// dp[i] = the mover wins with i stones if some square move leaves the opponent in a losing position
public boolean winnerSquareGame(int n) {
    boolean[] win = new boolean[n + 1];
    for (int i = 1; i <= n; i++)
        for (int s = 1; s * s <= i && !win[i]; s++) win[i] = !win[i - s * s];
    return win[n];
}
```

| Approach | Time | Space |
|---|---|---|
| Boolean DP | O(n√n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an explicit two-player minimax on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is win[0] false?</summary>

The player to move has no stones to remove.

</details>


<details><summary>Early exit?</summary>

The loop stops as soon as one winning move is found.

</details>


## Connected
- [Stone Game III](Stone%20Game%20III.md)
