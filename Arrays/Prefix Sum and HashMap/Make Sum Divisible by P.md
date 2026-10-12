---
topic: Prefix Sum and HashMap
pattern: [Remainders, Last index]
source: LeetCode 1590
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Make Sum Divisible by P

> [!TIP]
> **🧠 Memory hook**
> Remove the **shortest** subarray whose sum ≡ total (mod p). Look up prefix − need and keep the **latest index** of each remainder.
> **Mantra: need = total % p · j = last[(pre − need) mod p] → best = min(i − j) · last[pre] = i**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sum%20and%20HashMap/Prefix%20Sum%20and%20HashMap%20Animations.html#p=8) · **Pattern hub:** [Prefix Sum and HashMap - Pattern Map](Prefix%20Sum%20and%20HashMap%20-%20Pattern%20Map.md)

## Problem
Remove the smallest subarray (not the whole array) so the remaining sum is divisible by p. Return its length or -1.

## Key insight
For the shortest span the most recent matching prefix is best, so overwrite. Removing the whole array is not allowed, so a length of n means -1.

## Approach: Last index per remainder
```java
// Remove the shortest subarray whose sum has the same remainder as the whole array
public int minSubarray(int[] nums, int p) {
    long total = 0;
    for (int x : nums) total += x;
    int need = (int) (total % p);
    if (need == 0) return 0;
    Map<Integer, Integer> last = new HashMap<>();
    last.put(0, -1);
    int prefix = 0, best = nums.length;
    for (int i = 0; i < nums.length; i++) {
        prefix = (prefix + nums[i]) % p;
        Integer j = last.get(((prefix - need) % p + p) % p);
        if (j != null) best = Math.min(best, i - j);
        last.put(prefix, i);
    }
    return best == nums.length ? -1 : best;
}
```

| Approach | Time | Space |
|---|---|---|
| Last index per remainder | O(n) | O(min(n, p)) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the last index?</summary>

It makes the removed subarray as short as possible.

</details>


<details><summary>Why return −1 at length n?</summary>

The whole array cannot be removed.

</details>


## Connected
- [Subarray Sums Divisible by K](Subarray%20Sums%20Divisible%20by%20K.md)
- [Minimum Operations to Reduce X to Zero](../Prefix%20Variants/Minimum%20Operations%20to%20Reduce%20X%20to%20Zero.md)
