---
topic: HashMap
pattern: [Frequency counting, Remainders]
source: LeetCode 1497
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Check If Array Pairs Are Divisible by k

> [!TIP]
> **🧠 Memory hook**
> Dance partners by remainder.
> **Mantra: r ↔ k − r, REMAINDER 0 EVEN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=3) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Can arr be split into pairs whose sums are divisible by k?

## Key insight
Only remainders matter: r pairs with k − r, and 0 with 0.

## Approach: Remainder counts
```java
// Count normalised remainders; r needs as many (k - r); remainder 0 needs an even count
public boolean canArrange(int[] arr, int k) {
    int[] cnt = new int[k];
    for (int x : arr) cnt[((x % k) + k) % k]++;
    if (cnt[0] % 2 != 0) return false;
    for (int r = 1; r < k; r++) if (cnt[r] != cnt[k - r]) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Remainder counts | O(n + k) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against trying every pairing.

## Recall before you reveal
<details><summary>Negative numbers?</summary>

((x % k) + k) % k.

</details>


<details><summary>k even?</summary>

r = k/2 pairs with itself; cnt[r] == cnt[k−r] still holds.

</details>


## Connected
- [Array of Doubled Pairs](Array%20of%20Doubled%20Pairs.md)
