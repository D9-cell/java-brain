---
topic: Strings and Digits
pattern: [Independent moves, Counting]
source: LeetCode 2038
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Remove Colored Pieces if Both Neighbors are the Same Color

> [!TIP]
> **🧠 Memory hook**
> Alice only touches `A` runs and Bob only `B` runs, so **moves never interfere**: just count them.
> **Mantra: ALICE WINS IF HER MOVES > BOB'S MOVES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=20) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Players alternate (Alice first). Alice removes an `A` whose both neighbours are `A`; Bob does the same with `B`. A player with no move loses.

## Key insight
A run of L equal letters gives `L − 2` moves to its owner (L ≥ 3) and removals never create or destroy moves of the other player. Alice wins exactly when she has strictly more moves.

## Approach 1: Count triples
```java
// Alice removes an 'A' with two 'A' neighbours, Bob a 'B' with two 'B' neighbours. Moves never interact, so each side has (run length - 2) moves per run of 3 or more
public boolean winnerOfGame(String colors) {
    int a = 0, b = 0;
    for (int i = 1; i + 1 < colors.length(); i++) {
        char c = colors.charAt(i);
        if (colors.charAt(i - 1) == c && colors.charAt(i + 1) == c) { if (c == 'A') a++; else b++; }
    }
    return a > b;
}
```

## Approach 2: Count by runs
```java
// Count by runs: a run of length L gives L - 2 moves
public boolean winnerOfGameRuns(String colors) {
    int a = 0, b = 0;
    for (int i = 0; i < colors.length(); ) {
        int j = i;
        while (j < colors.length() && colors.charAt(j) == colors.charAt(i)) j++;
        if (j - i >= 3) { if (colors.charAt(i) == 'A') a += j - i - 2; else b += j - i - 2; }
        i = j;
    }
    return a > b;
}
```

| Approach | Time | Space |
|---|---|---|
| Count triples | O(n) | O(1) |
| Count by runs | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a full minimax game. Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why strictly more?</summary>

Alice moves first; with equal counts she runs out of moves first.

</details>


## Connected
- [Sum Game](../Scans%20and%20Counting/Sum%20Game.md)
