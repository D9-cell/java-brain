---
topic: HashMap
pattern: [Greedy]
source: LeetCode 3014
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Minimum Number of Pushes to Type Word I

> [!TIP]
> **🧠 Memory hook**
> Eight keys = eight cheap seats per layer.
> **Mantra: i / 8 + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=32) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Distinct letters; assign them to keys 2–9 to minimise pushes.

## Key insight
The first 8 letters cost 1, the next 8 cost 2, and so on.

## Approach: Formula
```java
// Distinct letters: the first 8 cost 1 push, the next 8 cost 2, and so on
public int minimumPushes(String word) {
    int pushes = 0;
    for (int i = 0; i < word.length(); i++) pushes += i / 8 + 1;
    return pushes;
}
```

| Approach | Time | Space |
|---|---|---|
| Formula | O(n) | O(1) |

## Recall before you reveal
<details><summary>Why 8?</summary>

Keys 2 to 9.

</details>


## Connected
- [Minimum Number of Pushes to Type Word II](Minimum%20Number%20of%20Pushes%20to%20Type%20Word%20II.md)
