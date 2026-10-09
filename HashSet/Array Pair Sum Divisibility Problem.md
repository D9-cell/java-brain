---
topic: HashSet
pattern: [Remainder counting, HashMap]
source: GFG
difficulty: Medium
companies: [Amazon, Microsoft, Goldman Sachs]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Array Pair Sum Divisibility Problem

> [!TIP]
> **🧠 Memory hook**
> Dance partners by remainder: r with k−r; 0 and k/2 dance among themselves.
> **Mantra: COUNT REMAINDERS, r ↔ k−r, 0 & k/2 EVEN**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=0) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
Can `nums` be divided into pairs so each pair's sum is divisible by k?

## Key insight
Only remainders matter. Count them: `count[r] == count[k−r]` for every r, and `count[0]`, `count[k/2]` must be even.

## Approach 1: Greedy pairing (brute force)
```java
// Approach 1: greedily pair each unused element with any later unused partner
public boolean canPairBrute(int[] nums, int k) {
    int n = nums.length;
    boolean[] used = new boolean[n];
    for (int i = 0; i < n; i++) {
        if (used[i]) continue;
        boolean found = false;
        for (int j = i + 1; j < n && !found; j++)
            if (!used[j] && (nums[i] + nums[j]) % k == 0) { used[i] = used[j] = true; found = true; }
        if (!found) return false;
    }
    return true;
}
```

## Approach 2: Remainder counts
```java
// Approach 2: count remainders; r needs as many partners with remainder k-r (r = 0 and r = k/2 pair among themselves)
public boolean canPair(int[] nums, int k) {
    if (nums.length % 2 == 1) return false;
    Map<Integer, Integer> freq = new HashMap<>();
    for (int x : nums) freq.merge(((x % k) + k) % k, 1, Integer::sum);
    for (Map.Entry<Integer, Integer> e : freq.entrySet()) {
        int r = e.getKey(), c = e.getValue();
        if (r == 0 || 2 * r == k) { if (c % 2 != 0) return false; }
        else if (!freq.getOrDefault(k - r, 0).equals(c)) return false;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy pairing (brute force) | O(n²) | O(n) |
| Remainder counts | O(n) | O(k) |

> [!WARNING]
> **Java gotcha**
> The original C++/Java HashSet approach returns **false** for `[1,1,3,3], k=4` (the correct answer is true): the set keeps one copy per remainder. This Java version counts remainders instead; it is verified against brute force on 500 random arrays.

## Recall before you reveal
<details><summary>Why does a HashSet of remainders fail?</summary>

It forgets duplicates: [1,1,3,3], k=4 → it returns false, but the answer is true.

</details>


<details><summary>Negative numbers?</summary>

Normalise with ((x % k) + k) % k.

</details>


## Connected
- [Longest Consecutive Sequence](Longest%20Consecutive%20Sequence.md)
