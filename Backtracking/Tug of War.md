---
topic: Backtracking
pattern: [Balanced partition]
source: GFG
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Tug of War

> [!TIP]
> **🧠 Memory hook**
> Two teams of equal size with the closest strength.
> **Mantra: EACH ELEMENT → TEAM 1 OR 2, SIZE CAPS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=32) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Split n numbers into sizes ⌊n/2⌋ and ⌈n/2⌉ minimising the difference of sums.

## Key insight
Assign each element to a team while respecting the size caps.

## Approach: Backtracking with caps
```java
// Put each element into set 1 or set 2 while respecting the size caps
private void solve(int[] a, int i, int size1, int sum1, int total) {
    int n = a.length, cap1 = n / 2, cap2 = n - n / 2;
    if (i == n) {
        if (size1 == cap1 || size1 == cap2) best = Math.min(best, Math.abs(total - 2 * sum1));
        return;
    }
    int size2 = i - size1;
    if (size1 < cap2) solve(a, i + 1, size1 + 1, sum1 + a[i], total);
    if (size2 < cap2) solve(a, i + 1, size1, sum1, total);
}

// Entry point: minimum |sum1 - sum2|
public int minDifference(int[] a) {
    best = Integer.MAX_VALUE;
    solve(a, 0, 0, 0, Arrays.stream(a).sum());
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Backtracking with caps | O(C(n, n/2)) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against all subsets of size ⌊n/2⌋.

## Recall before you reveal
<details><summary>Large n?</summary>

Meet in the Middle.

</details>


## Connected
- [Partition Array Into Two Arrays to Minimize Sum Difference](../Meet%20In%20The%20Middle/Partition%20Array%20Into%20Two%20Arrays%20to%20Minimize%20Sum%20Difference.md)
