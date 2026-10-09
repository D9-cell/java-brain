---
topic: HashMap
pattern: [Rearrange to equal keys]
source: LeetCode 1128
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Number of Equivalent Domino Pairs

> [!TIP]
> **🧠 Memory hook**
> Rotate every domino so the small side is first.
> **Mantra: KEY = 10·min + max**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=25) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Count pairs of dominoes equal up to rotation.

## Key insight
Normalise to (min, max) and count equal keys as they arrive.

## Approach: Normalised key counts
```java
// Normalise a domino to (min, max) → key 10·min + max; each new domino pairs with all earlier equal keys
public int numEquivDominoPairs(int[][] dominoes) {
    int[] cnt = new int[100];
    int pairs = 0;
    for (int[] d : dominoes) {
        int key = Math.min(d[0], d[1]) * 10 + Math.max(d[0], d[1]);
        pairs += cnt[key]++;
    }
    return pairs;
}
```

| Approach | Time | Space |
|---|---|---|
| Normalised key counts | O(n) | O(100) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Why an array?</summary>

Keys are at most 99.

</details>


## Connected
- [Number of Good Pairs](Number%20of%20Good%20Pairs.md)
