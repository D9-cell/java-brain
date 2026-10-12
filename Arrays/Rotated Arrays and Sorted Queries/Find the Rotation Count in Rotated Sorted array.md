---
topic: Rotated Arrays and Sorted Queries
pattern: [Find the drop]
source: GfG Rotation
difficulty: Easy
companies: [Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Find the Rotation Count in Rotated Sorted array

> [!TIP]
> **🧠 Memory hook**
> The number of rotations equals the **index of the minimum**.
> **Mantra: index of min via nums[mid] > nums[hi]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=4) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
A sorted array of distinct values was rotated right k times. Find k.

## Key insight
Rotating right k times moves the smallest element to index k.

## Approach: Index of the minimum
```java
// The rotation count is the index of the minimum
public int findKRotation(int[] arr) {
    int lo = 0, hi = arr.length - 1;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] > arr[hi]) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

| Approach | Time | Space |
|---|---|---|
| Index of the minimum | O(log n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the index of the minimum?</summary>

Each right rotation moves it one place right.

</details>


<details><summary>Unrotated input?</summary>

The search returns 0.

</details>


## Connected
- [Find Minimum in Rotated Sorted Array](Find%20Minimum%20in%20Rotated%20Sorted%20Array.md)
