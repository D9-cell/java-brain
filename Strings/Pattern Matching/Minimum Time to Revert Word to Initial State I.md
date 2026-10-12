---
topic: Pattern Matching
pattern: [Suffix equals prefix]
source: LeetCode 3029
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Minimum Time to Revert Word to Initial State I

> [!TIP]
> **🧠 Memory hook**
> After t seconds the original **suffix from k·t** is all that remains of the word. Done when that suffix is a **prefix of word** (we choose the added letters), or when k·t ≥ n.
> **Mantra: t = 1.. · k·t ≥ n or word.startsWith(word[k·t..]) → t**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Pattern%20Matching/Pattern%20Matching%20Animations.html#p=5) · **Pattern hub:** [Pattern Matching - Pattern Map](Pattern%20Matching%20-%20Pattern%20Map.md)

## Problem
Every second remove the first k characters of word and append any k characters. Return the minimum time > 0 for word to return to its initial state.

## Key insight
The appended letters are free, so only the surviving part must match. It is word[k·t..], sitting at the front, so it must equal the prefix of the same length. Once everything has been removed, any word can be rebuilt.

## Approach: Check each t
```java
// After t steps the original suffix from k*t survives; it must be a prefix of word
public int minimumTimeToInitialState(String word, int k) {
    int n = word.length(), t = 1;
    while (k * t < n && !word.startsWith(word.substring(k * t))) t++;
    return t;
}
```

| Approach | Time | Space |
|---|---|---|
| Check each t | O(n² / k) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why ceil(n / k) at most?</summary>

After that every original letter was replaced.

</details>


<details><summary>Faster?</summary>

Part II uses the Z-function.

</details>


## Connected
- [Minimum Time to Revert Word to Initial State II](Minimum%20Time%20to%20Revert%20Word%20to%20Initial%20State%20II.md)
