---
topic: Formulas and Observations
pattern: [Count each step]
source: LeetCode 1688
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count of Matches in Tournament

> [!TIP]
> **🧠 Memory hook**
> Every match **eliminates exactly one team** and n − 1 teams must be eliminated: **n − 1** matches.
> **Mantra: RETURN n − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=1) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
n teams; each round pairs teams (an odd team out advances for free). Return the total number of matches until one winner remains.

## Key insight
Instead of tracking rounds, count eliminations. One winner means n − 1 losers, one per match.

## Approach 1: Simulate rounds
```java
// Simulates the rounds: n / 2 matches, ceil(n / 2) teams go on
public int numberOfMatchesLoop(int n) {
    int matches = 0;
    while (n > 1) {
        matches += n / 2;
        n = (n + 1) / 2;
    }
    return matches;
}
```

## Approach 2: Count eliminations
```java
// Every match knocks out exactly one team and n - 1 teams must go
public int numberOfMatches(int n) {
    return n - 1;
}
```

| Approach | Time | Space |
|---|---|---|
| Simulate rounds | O(log n) | O(1) |
| Count eliminations | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Does the bye change anything?</summary>

No, it adds no match and no elimination.

</details>


<details><summary>Same idea elsewhere?</summary>

Knock-out brackets, merging k piles one pair at a time.

</details>


## Connected
- [Water Bottles](Water%20Bottles.md)
