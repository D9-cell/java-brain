---
topic: HashMap
pattern: [Bijection]
source: LeetCode 205
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Isomorphic Strings

> [!TIP]
> **🧠 Memory hook**
> A one-to-one letter dictionary in both directions.
> **Mantra: TWO MAPS, ANY CONFLICT → FALSE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=21) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Can the letters of s be replaced to get t (one-to-one)?

## Key insight
Maintain s→t and t→s; a conflict in either breaks the bijection.

## Approach: Two arrays
```java
// Two arrays map s→t and t→s; any conflict breaks the bijection
public boolean isIsomorphic(String s, String t) {
    int[] st = new int[256], ts = new int[256];
    for (int i = 0; i < s.length(); i++) {
        char a = s.charAt(i), b = t.charAt(i);
        if (st[a] == 0 && ts[b] == 0) { st[a] = b; ts[b] = a; }
        else if (st[a] != b || ts[b] != a) return false;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Two arrays | O(n) | O(256) |

> [!WARNING]
> **Java gotcha**
> Verified against the normal-form comparison.

## Recall before you reveal
<details><summary>Why both directions?</summary>

"badc"/"baba": d → b collides with a → b.

</details>


## Connected
- [Word Pattern](Word%20Pattern.md)
- [Find and Replace Pattern](Find%20and%20Replace%20Pattern.md)
