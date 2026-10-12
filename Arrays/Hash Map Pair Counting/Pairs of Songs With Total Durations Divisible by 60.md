---
topic: Hash Map Pair Counting
pattern: [Remainder classes]
source: LeetCode 1010
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Pairs of Songs With Total Durations Divisible by 60

> [!TIP]
> **🧠 Memory hook**
> A song with remainder **r** pairs with earlier songs of remainder **(60 − r) % 60**. Count as you go.
> **Mantra: r = t % 60 · pairs += count[(60 − r) % 60] · count[r]++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Hash%20Map%20Pair%20Counting/Hash%20Map%20Pair%20Counting%20Animations.html#p=3) · **Pattern hub:** [Hash Map Pair Counting - Pattern Map](Hash%20Map%20Pair%20Counting%20-%20Pattern%20Map.md)

## Problem
Return the number of pairs of songs whose total duration is divisible by 60.

## Key insight
The % 60 on the partner makes remainder 0 pair with itself instead of looking for remainder 60.

## Approach: Remainder counts
```java
// A song with remainder r pairs with earlier songs of remainder (60 - r) % 60
public int numPairsDivisibleBy60(int[] time) {
    int[] count = new int[60];
    int pairs = 0;
    for (int t : time) {
        int r = t % 60;
        pairs += count[(60 - r) % 60];
        count[r]++;
    }
    return pairs;
}
```

| Approach | Time | Space |
|---|---|---|
| Remainder counts | O(n) | O(60) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why (60 − r) % 60?</summary>

r = 0 must pair with 0, not 60.

</details>


<details><summary>Why count before adding?</summary>

A song cannot pair with itself.

</details>


## Connected
- [Pairs which are Divisible by 4](Pairs%20which%20are%20Divisible%20by%204.md)
- [Subarray Sums Divisible by K](../Prefix%20Sum%20and%20HashMap/Subarray%20Sums%20Divisible%20by%20K.md)
