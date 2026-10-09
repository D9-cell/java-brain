---
topic: Sliding Window
pattern: [Longest window, HashMap]
source: LeetCode 904
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, sliding-window]
---
# Fruit Into Baskets

> [!TIP]
> **🧠 Memory hook**
> Two baskets, one fruit type each.
> **Mantra: AT MOST 2 TYPES; LONGEST WINDOW**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Sliding%20Window/Sliding%20Window%20Animations.html#p=23) · **Pattern hub:** [Sliding Window - Pattern Map](Sliding%20Window%20-%20Pattern%20Map.md)

## Problem
Longest subarray with at most two distinct values.

## Key insight
Classic "longest valid window". Optimisation from the C++: the window never needs to get shorter than the best so far, so on a third type slide it by one.

## Approach 1: Window that slides
```java
// Longest window with at most 2 types; on a third type the window slides by one instead of shrinking
public int totalFruit(int[] fruits) {
    Map<Integer, Integer> win = new HashMap<>();
    int best = 0;
    for (int i = 0, j = 0; j < fruits.length; j++) {
        win.merge(fruits[j], 1, Integer::sum);
        if (win.size() <= 2) best = Math.max(best, j - i + 1);
        else {
            if (win.merge(fruits[i], -1, Integer::sum) == 0) win.remove(fruits[i]);
            i++;
        }
    }
    return best;
}
```

## Approach 2: Window that shrinks
```java
// Classic version: shrink with a while loop until only 2 types remain
public int totalFruitShrink(int[] fruits) {
    Map<Integer, Integer> win = new HashMap<>();
    int best = 0;
    for (int i = 0, j = 0; j < fruits.length; j++) {
        win.merge(fruits[j], 1, Integer::sum);
        while (win.size() > 2) {
            if (win.merge(fruits[i], -1, Integer::sum) == 0) win.remove(fruits[i]);
            i++;
        }
        best = Math.max(best, j - i + 1);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Window that slides | O(n) | O(1) |
| Window that shrinks | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Generalise?</summary>

At most k types: Longest K unique characters.

</details>


## Connected
- [Longest K unique characters substring](Longest%20K%20unique%20characters%20substring.md)
