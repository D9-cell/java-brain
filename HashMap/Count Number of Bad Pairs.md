---
topic: HashMap
pattern: [Rearrange to equal keys, Complement counting]
source: LeetCode 2364
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Count Number of Bad Pairs

> [!TIP]
> **🧠 Memory hook**
> Count the good ones and subtract.
> **Mantra: BAD = ALL − GOOD, KEY nums[i] − i**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=8) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Count pairs i < j with j − i ≠ nums[j] − nums[i].

## Key insight
Good ⇔ nums[i] − i == nums[j] − j. At index j there are j earlier indices; subtract the good ones.

## Approach 1: Brute force
```java
// Approach 1: check every pair
public long countBadPairsBrute(int[] nums) {
    long c = 0;
    for (int i = 0; i < nums.length; i++) for (int j = i + 1; j < nums.length; j++) if (j - i != nums[j] - nums[i]) c++;
    return c;
}
```

## Approach 2: Equal keys
```java
// Approach 2: good ⇔ nums[i] − i == nums[j] − j; bad = all pairs before j minus the good ones
public long countBadPairs(int[] nums) {
    Map<Integer, Integer> seen = new HashMap<>();
    long bad = 0;
    for (int j = 0; j < nums.length; j++) {
        int key = nums[j] - j, good = seen.getOrDefault(key, 0);
        bad += j - good;
        seen.put(key, good + 1);
    }
    return bad;
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force | O(n²) | O(1) |
| Equal keys | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Return type?</summary>

long (n² / 2 overflows int).

</details>


## Connected
- [Count Nice Pairs in an Array](Count%20Nice%20Pairs%20in%20an%20Array.md)
