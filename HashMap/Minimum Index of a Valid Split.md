---
topic: HashMap
pattern: [Two maps, Boyer–Moore]
source: LeetCode 2780
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Minimum Index of a Valid Split

> [!TIP]
> **🧠 Memory hook**
> The dominant element is the only candidate.
> **Mantra: BOYER–MOORE, SWEEP THE LEFT COUNT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=31) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
First split where both halves have the same dominant element.

## Key insight
A dominant element of both halves must be dominant overall; find it, then sweep its count.

## Approach 1: Left/right maps
```java
// Approach 1: two maps (left and right counts) moved one element at a time
public int minimumIndexTwoMaps(List<Integer> nums) {
    Map<Integer, Integer> left = new HashMap<>(), right = new HashMap<>();
    for (int x : nums) right.merge(x, 1, Integer::sum);
    int n = nums.size();
    for (int i = 0; i < n - 1; i++) {
        int x = nums.get(i);
        left.merge(x, 1, Integer::sum);
        right.merge(x, -1, Integer::sum);
        if (left.get(x) * 2 > i + 1 && right.get(x) * 2 > n - i - 1) return i;
    }
    return -1;
}
```

## Approach 2: Boyer–Moore + sweep
```java
// Approach 2: Boyer–Moore finds the dominant element; then sweep its count on the left
public int minimumIndex(List<Integer> nums) {
    int cand = 0, votes = 0;
    for (int x : nums) { if (votes == 0) cand = x; votes += x == cand ? 1 : -1; }
    int total = 0, n = nums.size();
    for (int x : nums) if (x == cand) total++;
    int left = 0;
    for (int i = 0; i < n - 1; i++) {
        if (nums.get(i) == cand) left++;
        if (left * 2 > i + 1 && (total - left) * 2 > n - i - 1) return i;
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Left/right maps | O(n) | O(n) |
| Boyer–Moore + sweep | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Both approaches agree on 500 random arrays.

## Recall before you reveal
<details><summary>Dominant?</summary>

More than half the elements.

</details>

