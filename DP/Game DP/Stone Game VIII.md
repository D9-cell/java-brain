---
topic: Game DP
pattern: [Prefix sums, One pass]
source: LeetCode 1872
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Stone Game VIII

> [!TIP]
> **🧠 Memory hook**
> Taking x stones leaves their **prefix sum** as the new first stone, so a move is "jump to prefix i".
> **Mantra: best = max(best, pre[i] − best), WALKING i FROM THE END**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Game%20DP/Game%20DP%20Animations.html#p=6) · **Pattern hub:** [Game DP - Pattern Map](Game%20DP%20-%20Pattern%20Map.md)

## Problem
Players alternately remove x > 1 stones from the left, score their sum and put a stone with that sum back on the left. The game ends with one stone. Return Alice's lead.

## Key insight
After a move that took the first x stones the leftmost stone equals the prefix sum pre[x−1]; the score of that move is also pre[x−1]. So the game is a sequence of increasing prefix indexes, and the mover's best lead from index i is max(best from i+1, pre[i] − best from i+1).

## Approach: Prefix sums, one pass
```java
// Taking the first x stones leaves the prefix sum pre[x - 1] as the new first stone, so the game is a walk over prefix sums
public int stoneGameVIII(int[] stones) {
    int n = stones.length;
    int[] pre = new int[n];
    pre[0] = stones[0];
    for (int i = 1; i < n; i++) pre[i] = pre[i - 1] + stones[i];
    int best = pre[n - 1];
    for (int i = n - 2; i >= 1; i--) best = Math.max(best, pre[i] - best);
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix sums, one pass | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an explicit two-player minimax on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why start from pre[n−1]?</summary>

The last allowed move takes everything and ends the game.

</details>


<details><summary>Why is x > 1 shown as i ≥ 1?</summary>

pre[0] would mean taking just one stone.

</details>


## Connected
- [Stone Game III](Stone%20Game%20III.md)
- [Stone Game VII](Stone%20Game%20VII.md)
