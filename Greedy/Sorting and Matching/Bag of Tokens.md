---
topic: Sorting and Matching
pattern: [Sort + two pointers, Buy low, sell high]
source: LeetCode 948
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Bag of Tokens

> [!TIP]
> **🧠 Memory hook**
> Spend power on **cheap tokens** to earn score; when stuck, sell score for power at the **most expensive** token.
> **Mantra: CHEAPEST FOR SCORE, DEAREST FOR POWER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=0) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Each token can be played once: face up costs `token` power for +1 score, face down gives `token` power for −1 score. Return the maximum score.

## Key insight
Sort. Always play the smallest token face up when you can afford it. If you cannot, and you have score, play the largest remaining token face down to refill power. Track the best score seen.

## Approach: Two pointers
```java
// Sort; spend power on the cheapest token for score, and trade score for power on the dearest token only when stuck
public int bagOfTokensScore(int[] tokens, int power) {
    Arrays.sort(tokens);
    int lo = 0, hi = tokens.length - 1, score = 0, best = 0;
    while (lo <= hi) {
        if (power >= tokens[lo]) { power -= tokens[lo++]; best = Math.max(best, ++score); }
        else if (score > 0) { power += tokens[hi--]; score--; }
        else break;
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Two pointers | O(n log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why the largest token when selling?</summary>

It returns the most power for the same −1 score.

</details>


<details><summary>Why track `best` separately?</summary>

Selling lowers the score, but the highest score reached already counts.

</details>


## Connected
- [Boats to Save People](Boats%20to%20Save%20People.md)
- [Destroying Asteroids](Destroying%20Asteroids.md)
