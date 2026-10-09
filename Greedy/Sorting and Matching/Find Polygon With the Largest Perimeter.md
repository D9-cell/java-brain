---
topic: Sorting and Matching
pattern: [Sort, Prefix sums]
source: LeetCode 2971
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Find Polygon With the Largest Perimeter

> [!TIP]
> **🧠 Memory hook**
> A polygon needs the **longest side shorter than the sum of the others**.
> **Mantra: SORT, PREFIX > NEXT SIDE → VALID**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=14) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Return the largest perimeter of a polygon (at least 3 sides) formed from the numbers, or −1.

## Key insight
Sort. If the sum of all smaller numbers exceeds the current number, the current number can be the longest side of a polygon with all previous ones. The last valid position gives the largest perimeter.

## Approach 1: Prefix sums
```java
// Sort; a polygon exists with the first i sides when the sum of the smaller ones exceeds the next side. Keep the largest valid sum
public long largestPerimeter(int[] nums) {
    Arrays.sort(nums);
    long prefix = 0, best = -1;
    for (int x : nums) {
        if (prefix > x) best = prefix + x;
        prefix += x;
    }
    return best;
}
```

## Approach 2: Shrink from the largest
```java
// Walk from the largest side down: drop it while it is at least the sum of the others
public long largestPerimeterShrinking(int[] nums) {
    Arrays.sort(nums);
    long total = 0;
    for (int x : nums) total += x;
    for (int i = nums.length - 1; i >= 2; i--) {
        if (total - nums[i] > nums[i]) return total;
        total -= nums[i];
    }
    return -1;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix sums | O(n log n) | O(1) |
| Shrink from the largest | O(n log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why take all smaller sides?</summary>

Adding more sides keeps the inequality true and increases the perimeter.

</details>


## Connected
- [Maximize Happiness of Selected Children](Maximize%20Happiness%20of%20Selected%20Children.md)
