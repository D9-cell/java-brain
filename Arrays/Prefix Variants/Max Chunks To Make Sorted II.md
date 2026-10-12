---
topic: Prefix Variants
pattern: [Prefix max vs suffix min]
source: LeetCode 768
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Max Chunks To Make Sorted II

> [!TIP]
> **🧠 Memory hook**
> With duplicates, cut after i when **max(left) ≤ min(right)**: sorting each side then never mixes them.
> **Mantra: minRight · maxLeft ≤ minRight[i+1] → chunks++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Variants/Prefix%20Variants%20Animations.html#p=10) · **Pattern hub:** [Prefix Variants - Pattern Map](Prefix%20Variants%20-%20Pattern%20Map.md)

## Problem
Same as part I, but values can repeat and be any integers.

## Key insight
Each valid boundary is independent, so counting them gives the number of chunks. A monotonic stack is the other common solution.

## Approach: Prefix max + suffix min
```java
// Cut after i when everything on the left is <= everything on the right
public int maxChunksToSorted(int[] arr) {
    int n = arr.length, chunks = 1;
    int[] minRight = new int[n];
    minRight[n - 1] = arr[n - 1];
    for (int i = n - 2; i >= 0; i--) minRight[i] = Math.min(minRight[i + 1], arr[i]);
    int maxLeft = Integer.MIN_VALUE;
    for (int i = 0; i + 1 < n; i++) {
        maxLeft = Math.max(maxLeft, arr[i]);
        if (maxLeft <= minRight[i + 1]) chunks++;
    }
    return chunks;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix max + suffix min | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why ≤ and not <?</summary>

Equal values on both sides can stay where they are.

</details>


<details><summary>Stack version?</summary>

Keep chunk maxima increasing, merge when a smaller value arrives.

</details>


## Connected
- [Max Chunks To Make Sorted](Max%20Chunks%20To%20Make%20Sorted.md)
- [Jump Game IX](Jump%20Game%20IX.md)
