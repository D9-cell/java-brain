---
topic: HashMap
pattern: [Frequency counting]
source: LeetCode 1512
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Number of Good Pairs

> [!TIP]
> **🧠 Memory hook**
> Each newcomer shakes hands with every earlier twin.
> **Mantra: ADD THE COUNT SO FAR**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=35) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Count pairs i < j with nums[i] == nums[j].

## Key insight
When x arrives it pairs with every earlier x.

## Approach 1: Double loop
```java
// Approach 1: double loop
public int numIdenticalPairsBrute(int[] nums) {
    int c = 0;
    for (int i = 0; i < nums.length; i++) for (int j = i + 1; j < nums.length; j++) if (nums[i] == nums[j]) c++;
    return c;
}
```

## Approach 2: Running counts
```java
// Approach 2: each new x pairs with every earlier x
public int numIdenticalPairs(int[] nums) {
    Map<Integer, Integer> seen = new HashMap<>();
    int c = 0;
    for (int x : nums) c += seen.merge(x, 1, Integer::sum) - 1;
    return c;
}
```

| Approach | Time | Space |
|---|---|---|
| Double loop | O(n²) | O(1) |
| Running counts | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Formula?</summary>

Σ c·(c−1)/2.

</details>


## Connected
- [Count Number of Bad Pairs](Count%20Number%20of%20Bad%20Pairs.md)
- [Number of Equivalent Domino Pairs](Number%20of%20Equivalent%20Domino%20Pairs.md)
