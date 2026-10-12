---
topic: Formulas and Observations
pattern: [Game shortcut]
source: LeetCode 3227
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Vowels Game in a String

> [!TIP]
> **🧠 Memory hook**
> No vowel: Alice has no move and loses. **Any vowel**: Alice removes all (odd count) or all but one (even count), and Bob is stuck or loses next.
> **Mantra: RETURN s contains a vowel**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=9) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
Alice removes a non-empty substring with an odd number of vowels; Bob removes one with an even number. Alice starts; a player who cannot move loses. Return true if Alice wins.

## Key insight
With an odd vowel count Alice removes everything. With an even count she leaves exactly one vowel; whatever Bob removes keeps that vowel, so Alice then removes the rest.

## Approach: Look for a vowel
```java
// With no vowel Alice cannot move; with any vowel she can always win
public boolean doesAliceWin(String s) {
    for (char c : s.toCharArray())
        if ("aeiou".indexOf(c) >= 0) return true;
    return false;
}
```

| Approach | Time | Space |
|---|---|---|
| Look for a vowel | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why can Bob never remove the last vowel?</summary>

His substring needs an even number of vowels, and one is odd.

</details>


<details><summary>How was it checked?</summary>

Against a full game search on short strings.

</details>


## Connected
- [Alice and Bob Playing Flower Game](Alice%20and%20Bob%20Playing%20Flower%20Game.md)
