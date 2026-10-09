---
topic: HashMap
pattern: [Rearrange to equal keys, Latest index]
source: LeetCode
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Minimum Absolute Distance Between Mirror Pairs

> [!TIP]
> **🧠 Memory hook**
> Remember each number's mirror image; a later number may match it.
> **Mantra: STORE reverse(x) → LATEST INDEX**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=29) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Minimum j − i where reverse(nums[i]) == nums[j], or −1.

## Key insight
Store reverse(nums[i]) with its latest index; each nums[j] looks itself up.

## Approach: Map of reversed values
```java
// Reverses digits (leading zeros of the result vanish: 120 → 21)
static int reverse(int x) {
    int r = 0;
    for (; x > 0; x /= 10) r = r * 10 + x % 10;
    return r;
}

// For each j: was reverse(nums[i]) == nums[j] for some earlier i? Keep the LATEST such i in a map
public int minMirrorPairDistance(int[] nums) {
    Map<Integer, Integer> lastRev = new HashMap<>();
    int best = Integer.MAX_VALUE;
    for (int j = 0; j < nums.length; j++) {
        Integer i = lastRev.get(nums[j]);
        if (i != null) best = Math.min(best, j - i);
        lastRev.put(reverse(nums[j]), j);
    }
    return best == Integer.MAX_VALUE ? -1 : best;
}
```

| Approach | Time | Space |
|---|---|---|
| Map of reversed values | O(n · digits) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n²).

## Recall before you reveal
<details><summary>Why the latest index?</summary>

It gives the smallest distance.

</details>


<details><summary>Leading zeros?</summary>

reverse(120) = 21.

</details>


## Connected
- [Count Nice Pairs in an Array](Count%20Nice%20Pairs%20in%20an%20Array.md)
