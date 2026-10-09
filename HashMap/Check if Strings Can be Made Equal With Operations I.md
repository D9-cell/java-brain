---
topic: HashMap
pattern: [Pairs]
source: LeetCode 2839
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Check if Strings Can be Made Equal With Operations I

> [!TIP]
> **🧠 Memory hook**
> Two independent pairs of slots.
> **Mantra: PAIR (0,2), PAIR (1,3)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=22) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Length-4 strings; swap positions (0,2) or (1,3). Can s1 become s2?

## Key insight
Each pair must match as an unordered pair.

## Approach: Pair check
```java
// Length 4, swaps (0,2) and (1,3) only: each pair must match as an unordered pair
public boolean canBeEqual(String s1, String s2) {
    return pairOk(s1.charAt(0), s1.charAt(2), s2.charAt(0), s2.charAt(2)) && pairOk(s1.charAt(1), s1.charAt(3), s2.charAt(1), s2.charAt(3));
}

// {a, b} == {c, d} as multisets
static boolean pairOk(char a, char b, char c, char d) {
    return (a == c && b == d) || (a == d && b == c);
}
```

| Approach | Time | Space |
|---|---|---|
| Pair check | O(1) | O(1) |

## Recall before you reveal
<details><summary>Generalisation?</summary>

Operations II: compare multisets per parity.

</details>


## Connected
- [Check if Strings Can be Made Equal With Operations II](Check%20if%20Strings%20Can%20be%20Made%20Equal%20With%20Operations%20II.md)
