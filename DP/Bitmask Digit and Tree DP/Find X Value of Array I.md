---
topic: Bitmask Digit and Tree DP
pattern: [Residue counts, Subarrays ending here]
source: LeetCode 3524
difficulty: Medium
companies: [Rubrik]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Find X Value of Array I

> [!TIP]
> **🧠 Memory hook**
> Keep **how many subarrays ending here have each product remainder**; extending multiplies every remainder.
> **Mantra: cnt'[x · v mod k] += cnt[x] · plus the single element v mod k**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Bitmask%20Digit%20and%20Tree%20DP/Bitmask%20Digit%20and%20Tree%20DP%20Animations.html#p=4) · **Pattern hub:** [Bitmask Digit and Tree DP - Pattern Map](Bitmask%20Digit%20and%20Tree%20DP%20-%20Pattern%20Map.md)

## Problem
Count, for every remainder x, the subarrays of nums whose product leaves remainder x when divided by k (k ≤ 5).

## Key insight
A subarray ending at i is either the single element or an earlier subarray extended by nums[i]. Its remainder is the old remainder times nums[i] mod k. Add the new counts to the result after each element.

## Approach: Remainder table
```java
// cnt[x] = subarrays ending at the current element whose product mod k is x; extend them, then add the single-element subarray
public long[] resultArray(int[] nums, int k) {
    long[] result = new long[k], cnt = new long[k];
    for (int v : nums) {
        long[] next = new long[k];
        for (int x = 0; x < k; x++) next[(int) ((long) x * v % k)] += cnt[x];
        next[v % k]++;
        cnt = next;
        for (int x = 0; x < k; x++) result[x] += cnt[x];
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Remainder table | O(n · k) | O(k) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why long?</summary>

There can be about n²/2 subarrays.

</details>


<details><summary>Why not O(n²)?</summary>

Subarrays with the same remainder behave identically from then on.

</details>


## Connected
- [Paths in Matrix Whose Sum Is Divisible by K](../Grid%20Paths/Paths%20in%20Matrix%20Whose%20Sum%20Is%20Divisible%20by%20K.md)
