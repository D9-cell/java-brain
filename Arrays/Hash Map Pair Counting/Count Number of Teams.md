---
topic: Hash Map Pair Counting
pattern: [Fix the middle]
source: LeetCode 1395
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Count Number of Teams

> [!TIP]
> **🧠 Memory hook**
> Fix the **middle soldier j**: increasing teams = smaller on the left × bigger on the right, decreasing = bigger on the left × smaller on the right.
> **Mantra: FOR j: lessL·moreR + moreL·lessR**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Hash%20Map%20Pair%20Counting/Hash%20Map%20Pair%20Counting%20Animations.html#p=8) · **Pattern hub:** [Hash Map Pair Counting - Pattern Map](Hash%20Map%20Pair%20Counting%20-%20Pattern%20Map.md)

## Problem
Ratings are distinct. Count triples i < j < k with rating strictly increasing or strictly decreasing.

## Key insight
Fixing the middle turns a triple loop into two counts per j. A Fenwick tree makes the counts O(log n) each.

## Approach: Middle counting
```java
// Fix the middle soldier: smaller-left * bigger-right + bigger-left * smaller-right
public int numTeams(int[] rating) {
    int n = rating.length, teams = 0;
    for (int j = 0; j < n; j++) {
        int lessL = 0, moreL = 0, lessR = 0, moreR = 0;
        for (int i = 0; i < j; i++) {
            if (rating[i] < rating[j]) lessL++;
            else if (rating[i] > rating[j]) moreL++;
        }
        for (int k = j + 1; k < n; k++) {
            if (rating[k] < rating[j]) lessR++;
            else if (rating[k] > rating[j]) moreR++;
        }
        teams += lessL * moreR + moreL * lessR;
    }
    return teams;
}
```

| Approach | Time | Space |
|---|---|---|
| Middle counting | O(n²) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why fix the middle?</summary>

Left and right choices become independent.

</details>


<details><summary>Faster?</summary>

Binary indexed trees over ratings: O(n log n).

</details>


## Connected
- [Count Good Triplets in an Array](../../Segment%20Tree/Count%20Good%20Triplets%20in%20an%20Array.md)
