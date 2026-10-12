---
topic: Pattern Matching
pattern: [Z-function]
source: LeetCode 3031
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Minimum Time to Revert Word to Initial State II

> [!TIP]
> **🧠 Memory hook**
> Z[i] = longest common prefix of word and word[i..]. The suffix at k·t is a prefix iff **z[k·t] == n − k·t**.
> **Mantra: z-function · first t with k·t ≥ n or z[k·t] == n − k·t**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Pattern%20Matching/Pattern%20Matching%20Animations.html#p=6) · **Pattern hub:** [Pattern Matching - Pattern Map](Pattern%20Matching%20-%20Pattern%20Map.md)

## Problem
Same as part I with n up to 10⁶.

## Key insight
The Z-function answers "does the suffix at i match the prefix" for every i in O(n) total, by reusing the rightmost matched box [l, r).

## Approach: Z-function
```java
// Z-function: z[i] = longest common prefix of word and word[i..]; need z[k*t] == n - k*t
public int minimumTimeToInitialState(String word, int k) {
    int n = word.length();
    int[] z = new int[n];
    for (int i = 1, l = 0, r = 0; i < n; i++) {
        if (i < r) z[i] = Math.min(r - i, z[i - l]);
        while (i + z[i] < n && word.charAt(z[i]) == word.charAt(i + z[i])) z[i]++;
        if (i + z[i] > r) {
            l = i;
            r = i + z[i];
        }
    }
    int t = 1;
    while (k * t < n && z[k * t] < n - k * t) t++;
    return t;
}
```

| Approach | Time | Space |
|---|---|---|
| Z-function | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>What is the Z-box?</summary>

The segment [l, r) that matches the prefix and reaches furthest right.

</details>


<details><summary>KMP alternative?</summary>

Follow lps from n − 1: those are exactly the borders.

</details>


## Connected
- [Minimum Time to Revert Word to Initial State I](Minimum%20Time%20to%20Revert%20Word%20to%20Initial%20State%20I.md)
- [Knuth-Morris-Pratt KMP String Matching Algorithm](Knuth-Morris-Pratt%20KMP%20String%20Matching%20Algorithm.md)
