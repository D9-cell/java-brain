---
topic: Prefix Sum and HashMap
pattern: [Remainders, First index]
source: GfG Longest subarray with sum divisible by K
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Longest subarray with sum divisible by K

> [!TIP]
> **🧠 Memory hook**
> Store the **first index** of each remainder. When it repeats, the span between is divisible and as long as possible.
> **Mantra: first{0:−1} · r seen → best = max(i − first[r]) · ELSE first[r] = i**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sum%20and%20HashMap/Prefix%20Sum%20and%20HashMap%20Animations.html#p=2) · **Pattern hub:** [Prefix Sum and HashMap - Pattern Map](Prefix%20Sum%20and%20HashMap%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest subarray whose sum is divisible by k.

## Key insight
For the longest span the earliest prefix with that remainder is best, so never overwrite it.

## Approach: First index per remainder
```java
// Remember the first index of each remainder; the same remainder later gives the longest span
public int longestSubarrayDivK(int[] arr, int k) {
    Map<Integer, Integer> first = new HashMap<>();
    first.put(0, -1);
    int prefix = 0, best = 0;
    for (int i = 0; i < arr.length; i++) {
        prefix = ((prefix + arr[i]) % k + k) % k;
        if (first.containsKey(prefix)) best = Math.max(best, i - first.get(prefix));
        else first.put(prefix, i);
    }
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| First index per remainder | O(n) | O(k) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the first index?</summary>

It makes the span as long as possible.

</details>


<details><summary>Why first[0] = −1?</summary>

A divisible prefix starting at 0 has length i + 1.

</details>


## Connected
- [Subarray Sums Divisible by K](Subarray%20Sums%20Divisible%20by%20K.md)
- [Contiguous Array](Contiguous%20Array.md)
