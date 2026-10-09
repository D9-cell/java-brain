---
topic: HashMap
pattern: [Ordered-map greedy]
source: LeetCode 954
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Array of Doubled Pairs

> [!TIP]
> **🧠 Memory hook**
> The smallest |x| can only be the small half of a pair.
> **Mantra: SORT BY |x|, MATCH x WITH 2x**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=0) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Can arr be reordered so arr[2i+1] = 2·arr[2i] for every i?

## Key insight
Process values by absolute value: the smallest one has no half available, so it must take a 2x.

## Approach: TreeMap ordered by |x|
```java
// Process by absolute value (smallest first): each x must be matched with a 2x
public boolean canReorderDoubled(int[] arr) {
    TreeMap<Integer, Integer> cnt = new TreeMap<>((a, b) -> Integer.compare(Math.abs(a), Math.abs(b)) != 0 ? Integer.compare(Math.abs(a), Math.abs(b)) : Integer.compare(a, b));
    for (int x : arr) cnt.merge(x, 1, Integer::sum);
    for (int x : cnt.keySet()) {
        int c = cnt.get(x);
        if (c == 0) continue;
        int need = cnt.getOrDefault(2 * x, 0);
        if (need < c) return false;
        cnt.put(2 * x, need - c);
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| TreeMap ordered by |x| | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against trying every pairing on random arrays with negatives.

## Recall before you reveal
<details><summary>Why absolute value?</summary>

For negatives, 2x is further from zero too.

</details>


<details><summary>Zeros?</summary>

Pair with each other; need an even count.

</details>


## Connected
- [Hand of Straights](Hand%20of%20Straights.md)
