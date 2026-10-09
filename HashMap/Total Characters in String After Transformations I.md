---
topic: HashMap
pattern: [Frequency counting, Count DP]
source: LeetCode 3335
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Total Characters in String After Transformations I

> [!TIP]
> **🧠 Memory hook**
> Track the census of letters, not the string.
> **Mantra: 26 COUNTS, SHIFT, z → a + b**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=41) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Length after t rounds where each letter shifts by one and z becomes "ab" (mod 1e9+7).

## Key insight
The string explodes, but 26 counts evolve simply: everything shifts, and z's count feeds both a and b.

## Approach: Count simulation
```java
// Track counts per letter, not the string: each round shifts counts by one; 'z' feeds both 'a' and 'b'
public int lengthAfterTransformations(String s, int t) {
    final long MOD = 1_000_000_007;
    long[] cnt = new long[26];
    for (char c : s.toCharArray()) cnt[c - 'a']++;
    while (t-- > 0) {
        long[] nx = new long[26];
        for (int c = 0; c < 25; c++) nx[c + 1] = cnt[c];
        nx[0] = cnt[25];
        nx[1] = (nx[1] + cnt[25]) % MOD;
        cnt = nx;
    }
    long total = 0;
    for (long c : cnt) total = (total + c) % MOD;
    return (int) total;
}
```

| Approach | Time | Space |
|---|---|---|
| Count simulation | O(26·t) | O(26) |

> [!WARNING]
> **Java gotcha**
> Verified against literal simulation for small t.

## Recall before you reveal
<details><summary>Huge t?</summary>

Matrix exponentiation (Part II).

</details>

