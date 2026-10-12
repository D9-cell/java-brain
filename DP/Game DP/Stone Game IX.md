---
topic: Game DP
pattern: [Math invariant, Counting]
source: LeetCode 2029
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Stone Game IX

> [!TIP]
> **🧠 Memory hook**
> Only **stone % 3** matters. Zeros act as passes, so parity of the zero count decides the shape.
> **Mantra: zeros even → need both 1s and 2s · zeros odd → |c1 − c2| ≥ 3**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Game%20DP/Game%20DP%20Animations.html#p=9) · **Pattern hub:** [Game DP - Pattern Map](Game%20DP%20-%20Pattern%20Map.md)

## Problem
Players remove stones in turn; whoever makes the sum of removed stones divisible by 3 loses. If all stones are gone Bob wins. Alice starts. Return true if Alice wins.

## Key insight
After the first move the sequence of removed residues is forced to alternate (1, 2, 1, 2, ...) or (2, 1, 2, 1, ...). With an even number of zeros they cancel and Alice needs at least one 1 and one 2. With an odd number of zeros the parity flips and Alice needs one residue to outnumber the other by at least 3.

## Approach: Counting residues
```java
// Only residues mod 3 matter: zeros act as passes, and the order of 1s and 2s is forced after the first move
public boolean stoneGameIX(int[] stones) {
    int[] cnt = new int[3];
    for (int s : stones) cnt[s % 3]++;
    if (cnt[0] % 2 == 0) return cnt[1] >= 1 && cnt[2] >= 1;
    return Math.abs(cnt[1] - cnt[2]) >= 3;
}
```

| Approach | Time | Space |
|---|---|---|
| Counting residues | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an explicit two-player minimax on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why do zeros matter only by parity?</summary>

A zero never changes the sum mod 3, only whose turn it is.

</details>


<details><summary>How was it checked?</summary>

Against a full game search on small multisets.

</details>


## Connected
- [Stone Game IV](Stone%20Game%20IV.md)
