---
topic: HashMap
pattern: [Rearrange to equal keys]
source: LeetCode 1814
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Count Nice Pairs in an Array

> [!TIP]
> **🧠 Memory hook**
> Move all the i-stuff to one side.
> **Mantra: KEY = x − rev(x), COUNT EQUAL KEYS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=7) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Count pairs with a + rev(b) == b + rev(a), modulo 1e9+7.

## Key insight
a − rev(a) == b − rev(b): count pairs with equal keys while scanning.

## Approach: Equal keys
```java
// Reverses the digits of x
static int rev(int x) {
    int r = 0;
    for (; x > 0; x /= 10) r = r * 10 + x % 10;
    return r;
}

// a + rev(b) == b + rev(a) ⇔ a − rev(a) == b − rev(b): count equal keys as they arrive
public int countNicePairs(int[] nums) {
    Map<Integer, Integer> seen = new HashMap<>();
    long res = 0;
    for (int x : nums) {
        int key = x - rev(x);
        res += seen.getOrDefault(key, 0);
        seen.merge(key, 1, Integer::sum);
    }
    return (int) (res % 1_000_000_007);
}
```

| Approach | Time | Space |
|---|---|---|
| Equal keys | O(n · digits) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Overflow?</summary>

Accumulate in long.

</details>


## Connected
- [Count Number of Bad Pairs](Count%20Number%20of%20Bad%20Pairs.md)
- [Number of Good Pairs](Number%20of%20Good%20Pairs.md)
