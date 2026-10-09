---
topic: HashMap
pattern: [Frequency counting]
source: LeetCode 2840
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Check if Strings Can be Made Equal With Operations II

> [!TIP]
> **🧠 Memory hook**
> Characters can only move between positions of the same parity.
> **Mantra: EVEN MULTISET == EVEN, ODD == ODD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=4) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Swap s1[i] and s1[j] when j − i is even; can s1 become s2?

## Key insight
Swaps keep parity, and same-parity swaps reach every order, so compare letter counts per parity.

## Approach: Parity counts
```java
// Swaps keep each character on positions of the same parity, and within a parity any order is reachable
public boolean checkStrings(String s1, String s2) {
    int[][] cnt = new int[2][26];
    for (int i = 0; i < s1.length(); i++) {
        cnt[i % 2][s1.charAt(i) - 'a']++;
        cnt[i % 2][s2.charAt(i) - 'a']--;
    }
    for (int[] c : cnt) for (int x : c) if (x != 0) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Parity counts | O(n) | O(26) |

> [!WARNING]
> **Java gotcha**
> Verified against BFS over swaps on short strings.

## Recall before you reveal
<details><summary>Why every order?</summary>

Swaps of neighbours in a parity class generate all permutations.

</details>


## Connected
- [Check if Strings Can be Made Equal With Operations I](Check%20if%20Strings%20Can%20be%20Made%20Equal%20With%20Operations%20I.md)
