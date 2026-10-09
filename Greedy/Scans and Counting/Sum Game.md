---
topic: Scans and Counting
pattern: [Game theory, Counting]
source: LeetCode 1927
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Sum Game

> [!TIP]
> **🧠 Memory hook**
> Bob can **mirror** every Alice move; the game is decided by parity and by how much the known sums differ.
> **Mantra: ODD ? → ALICE; ELSE COMPARE KNOWN SUMS WITH 9 PER ?-PAIR**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Scans%20and%20Counting/Scans%20and%20Counting%20Animations.html#p=14) · **Pattern hub:** [Scans and Counting - Pattern Map](Scans%20and%20Counting%20-%20Pattern%20Map.md)

## Problem
Alice and Bob alternately replace a `?` by a digit. Alice wins if the sums of the two halves differ at the end. Alice moves first; does she win?

## Key insight
If the number of `?` is odd Alice wins (she moves last on the unmatched one). If it is even, Bob can cancel each Alice move, and each `?` pair contributes 9 to the side that holds it. Alice wins unless the known sums differ by exactly the 9-per-pair offset.

## Approach: Counting
```java
// Alice wins if the number of '?' is odd (she makes the last unmatched move). Otherwise every '?' pair cancels, so she wins unless the known sums differ by exactly 9 per '?' pair
public boolean sumGame(String num) {
    int n = num.length(), ls = 0, rs = 0, lq = 0, rq = 0;
    for (int i = 0; i < n; i++) {
        char c = num.charAt(i);
        if (c == '?') { if (i < n / 2) lq++; else rq++; }
        else if (i < n / 2) ls += c - '0'; else rs += c - '0';
    }
    if ((lq + rq) % 2 == 1) return true;
    return 2 * ls + 9 * lq != 2 * rs + 9 * rq;
}
```

| Approach | Time | Space |
|---|---|---|
| Counting | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a full minimax game. Verified against an independent reference on small random inputs when it was written.

## Recall before you reveal
<details><summary>What do the `2 * ls + 9 * lq` terms represent?</summary>

Twice the left sum plus nine per left `?`, compared with the same for the right: equality means Bob can always restore balance.

</details>


## Connected
- [Greatest Sum Divisible by Three](Greatest%20Sum%20Divisible%20by%20Three.md)
