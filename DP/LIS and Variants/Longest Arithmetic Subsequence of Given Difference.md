---
topic: LIS and Variants
pattern: [Keyed by value, One pass]
source: LeetCode 1218
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Longest Arithmetic Subsequence of Given Difference

> [!TIP]
> **🧠 Memory hook**
> The previous element is known exactly: **x − diff**. One map lookup replaces the inner loop.
> **Mantra: len[x] = len[x − diff] + 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=15) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
Return the length of the longest subsequence of arr that is arithmetic with the given difference.

## Key insight
len[v] is the longest such subsequence ending in value v. A new x extends whatever ended in x − diff. Later duplicates overwrite, which is correct because the latest occurrence can use every earlier one.

## Approach: Hash map
```java
// len[v] = longest run ending in value v; extend the run that ended in v - diff
public int longestSubsequence(int[] arr, int diff) {
    Map<Integer, Integer> len = new HashMap<>();
    int ans = 0;
    for (int x : arr) {
        int cur = len.getOrDefault(x - diff, 0) + 1;
        len.put(x, cur);
        ans = Math.max(ans, cur);
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Hash map | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force subset enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why overwrite on duplicates?</summary>

The later copy sees at least as many predecessors.

</details>


<details><summary>diff = 0?</summary>

Counts the highest frequency; the same code works.

</details>


## Connected
- [Longest Arithmetic Subsequence](Longest%20Arithmetic%20Subsequence.md)
