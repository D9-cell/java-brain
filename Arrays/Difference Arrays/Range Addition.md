---
topic: Difference Arrays
pattern: [Range updates]
source: LeetCode 370
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Range Addition

> [!TIP]
> **🧠 Memory hook**
> Each update: **+inc at start, −inc after end**. One prefix sum at the end applies all of them.
> **Mantra: diff[s] += inc · diff[e+1] −= inc · out = prefix(diff)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Difference%20Arrays/Difference%20Arrays%20Animations.html#p=0) · **Pattern hub:** [Difference Arrays - Pattern Map](Difference%20Arrays%20-%20Pattern%20Map.md)

## Problem
Start with an array of zeros. Each update [start, end, inc] adds inc to that range. Return the final array.

## Key insight
The prefix sum turns each pair of marks back into a constant block. k updates cost O(k + n) instead of O(k · n).

## Approach: Difference array
```java
// Mark +inc at start and -inc after end, then one prefix sum applies every update
public int[] getModifiedArray(int length, int[][] updates) {
    int[] diff = new int[length + 1];
    for (int[] u : updates) {
        diff[u[0]] += u[2];
        diff[u[1] + 1] -= u[2];
    }
    int[] out = new int[length];
    for (int i = 0, run = 0; i < length; i++) out[i] = run += diff[i];
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Difference array | O(n + k) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why size n + 1?</summary>

end + 1 can be n.

</details>


<details><summary>Undo direction?</summary>

diff[i] = a[i] − a[i − 1] turns an array back into marks.

</details>


## Connected
- [Corporate Flight Bookings](../../Line%20Sweep/Corporate%20Flight%20Bookings.md)
- [Shifting Letters II](Shifting%20Letters%20II.md)
