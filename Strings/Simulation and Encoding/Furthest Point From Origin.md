---
topic: Simulation and Encoding
pattern: [Net displacement, Greedy]
source: LeetCode 2833
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Furthest Point From Origin

> [!TIP]
> **🧠 Memory hook**
> Every blank should follow the **majority direction**: answer **|L − R| + blanks**.
> **Mantra: |count L − count R| + count _**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=1) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
moves contains L, R and _ (which may be either). Return the furthest distance from 0 you can end at.

## Key insight
Fixed moves give a net |L − R| in some direction; each blank adds 1 if it goes the same way.

## Approach: Count
```java
// Send every wildcard the same way as the majority: |L - R| + blanks
public int furthestDistanceFromOrigin(String moves) {
    int l = 0, r = 0, blank = 0;
    for (char c : moves.toCharArray()) {
        if (c == 'L') l++;
        else if (c == 'R') r++;
        else blank++;
    }
    return Math.abs(l - r) + blank;
}
```

| Approach | Time | Space |
|---|---|---|
| Count | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Tie L = R?</summary>

Pick any direction; the answer is the blank count.

</details>


<details><summary>Why greedy?</summary>

Every blank sent the other way loses 2.

</details>


## Connected
- [Robot Return to Origin](Robot%20Return%20to%20Origin.md)
