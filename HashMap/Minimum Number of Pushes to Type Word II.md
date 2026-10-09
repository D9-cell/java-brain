---
topic: HashMap
pattern: [Frequency counting, Greedy]
source: LeetCode 3016
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Minimum Number of Pushes to Type Word II

> [!TIP]
> **🧠 Memory hook**
> Frequent letters get the cheap seats.
> **Mantra: SORT COUNTS DESC, COST i / 8 + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=33) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Letters may repeat; minimise total pushes.

## Key insight
Sort letter frequencies descending; the i-th most frequent costs i / 8 + 1 per use.

## Approach: Sorted counts
```java
// Most frequent letters get the cheapest slots: the i-th most frequent costs i/8 + 1 per use
public int minimumPushes(String word) {
    int[] cnt = new int[26];
    for (char c : word.toCharArray()) cnt[c - 'a']++;
    Arrays.sort(cnt);
    int pushes = 0;
    for (int i = 0; i < 26; i++) pushes += cnt[25 - i] * (i / 8 + 1);
    return pushes;
}
```

| Approach | Time | Space |
|---|---|---|
| Sorted counts | O(n + 26 log 26) | O(26) |

## Recall before you reveal
<details><summary>Proof?</summary>

Exchange argument.

</details>


## Connected
- [Minimum Number of Pushes to Type Word I](Minimum%20Number%20of%20Pushes%20to%20Type%20Word%20I.md)
