---
topic: LIS and Variants
pattern: [Chain DP, Remove one letter]
source: LeetCode 1048
difficulty: Medium
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Longest String Chain

> [!TIP]
> **🧠 Memory hook**
> Process words **shortest first** and look backwards by deleting one letter at a time.
> **Mantra: best[w] = 1 + max best[w minus one letter]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/LIS%20and%20Variants/LIS%20and%20Variants%20Animations.html#p=5) · **Pattern hub:** [LIS and Variants - Pattern Map](LIS%20and%20Variants%20-%20Pattern%20Map.md)

## Problem
A word can follow another if inserting exactly one letter makes the first into the second. Return the length of the longest chain.

## Key insight
Sorting by length guarantees every predecessor (w with one letter removed) is already in the map. At most L candidates per word, so the cost is O(n · L²) with the substring copies.

## Approach: Sort + hash map
```java
// Shorter words first; best[w] = chain length ending at w, built from w minus one letter
public int longestStrChain(String[] words) {
    Arrays.sort(words, (a, b) -> a.length() - b.length());
    Map<String, Integer> best = new HashMap<>();
    int ans = 1;
    for (String w : words) {
        int cur = 1;
        for (int i = 0; i < w.length(); i++) {
            String prev = w.substring(0, i) + w.substring(i + 1);
            cur = Math.max(cur, best.getOrDefault(prev, 0) + 1);
        }
        best.put(w, cur);
        ans = Math.max(ans, cur);
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + hash map | O(n · L²) | O(n · L) |

> [!WARNING]
> **Java gotcha**
> Sorting with a.length() - b.length() is safe because lengths are small; do not use it for large values.

## Recall before you reveal
<details><summary>Why delete rather than insert?</summary>

Deleting gives at most L candidates; inserting would try 26 · (L + 1).

</details>


<details><summary>Why sort?</summary>

Smaller words must be in the map before the longer ones read them.

</details>


## Connected
- [Longest Increasing Subsequence](Longest%20Increasing%20Subsequence.md)
- [Largest Divisible Subset](Largest%20Divisible%20Subset.md)
