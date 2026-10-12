---
topic: Binary Strings and Substring Counting
pattern: [Product of gaps]
source: LeetCode 2147
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Number of Ways to Divide a Long Corridor

> [!TIP]
> **🧠 Memory hook**
> Pair up seats. Between pair k and pair k + 1 a divider fits in any of the **(gap of plants + 1)** spots. Multiply those choices.
> **Mantra: at seat 3, 5, 7…: ways *= i − lastSeat · odd or < 2 seats → 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=11) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
A corridor has seats S and plants P. Place dividers so each section has exactly two seats. Count the ways mod 1e9+7.

## Key insight
Seats must be grouped 1-2, 3-4, …. The divider between seat 2k and seat 2k + 1 can go after any position from seat 2k up to just before seat 2k + 1: that is (index difference) choices.

## Approach: Product of gaps
```java
// Between seat pair k and pair k + 1 the divider has (plants between + 1) choices
public int numberOfWays(String corridor) {
    long MOD = 1_000_000_007, ways = 1;
    int seats = 0, lastSeat = -1;
    for (int i = 0; i < corridor.length(); i++) {
        if (corridor.charAt(i) != 'S') continue;
        seats++;
        if (seats > 2 && seats % 2 == 1) ways = ways * (i - lastSeat) % MOD;
        lastSeat = i;
    }
    return seats >= 2 && seats % 2 == 0 ? (int) ways : 0;
}
```

| Approach | Time | Space |
|---|---|---|
| Product of gaps | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Odd number of seats?</summary>

Impossible, answer 0.

</details>


<details><summary>Why i − lastSeat?</summary>

There are that many places to cut between the two seats.

</details>


## Connected
- [Count Collisions on a Road](Count%20Collisions%20on%20a%20Road.md)
