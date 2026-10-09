---
topic: HashMap
pattern: [Graph in a map, Degrees]
source: LeetCode 997
difficulty: Easy
companies: [Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Find the Town Judge

> [!TIP]
> **🧠 Memory hook**
> Trusted by everyone, trusts nobody: score n − 1.
> **Mantra: SCORE = IN − OUT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=19) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Find the person trusted by all others who trusts nobody.

## Key insight
in − out == n − 1 happens only for the judge.

## Approach: Degree score
```java
// One score per person: +1 when trusted, −1 when trusting; the judge scores exactly n − 1
public int findJudge(int n, int[][] trust) {
    int[] score = new int[n + 1];
    for (int[] t : trust) { score[t[0]]--; score[t[1]]++; }
    for (int p = 1; p <= n; p++) if (score[p] == n - 1) return p;
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Degree score | O(n + t) | O(n) |

## Recall before you reveal
<details><summary>n = 1?</summary>

Person 1 is the judge.

</details>


## Connected
- [Destination City (HashMap)](Destination%20City%20%28HashMap%29.md)
