---
topic: Formulas and Observations
pattern: [Divide and conquer, Affine maps]
source: LeetCode 932
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Beautiful Array

> [!TIP]
> **🧠 Memory hook**
> Put **odds left, evens right**: an average of an odd and an even is not an integer. Each half stays beautiful under **x → 2x − 1** and **x → 2x**.
> **Mantra: res = [1] · next = (2x − 1 for x) + (2x for x), filtered ≤ n**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=16) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
Return any permutation of 1..n such that for no i < k < j does 2·nums[k] = nums[i] + nums[j].

## Key insight
If A is beautiful, so are 2A − 1 and 2A (scaling and shifting keep the equation). Joining them works because a pair across the halves has an odd sum, which cannot equal 2·nums[k]. Removing values above n keeps the property.

## Approach: Build by doubling
```java
// Odds then evens: an average can't sit between halves, and 2x - 1 and 2x keep each half beautiful
public int[] beautifulArray(int n) {
    List<Integer> res = new ArrayList<>(List.of(1));
    while (res.size() < n) {
        List<Integer> next = new ArrayList<>();
        for (int x : res) if (2 * x - 1 <= n) next.add(2 * x - 1);
        for (int x : res) if (2 * x <= n) next.add(2 * x);
        res = next;
    }
    return res.stream().mapToInt(Integer::intValue).toArray();
}
```

| Approach | Time | Space |
|---|---|---|
| Build by doubling | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why does deleting elements keep it beautiful?</summary>

The condition is about triples; removing values never creates a new triple.

</details>


<details><summary>Why odd + even fails?</summary>

Their sum is odd, but 2·nums[k] is even.

</details>


## Connected
- [Global and Local Inversions](Global%20and%20Local%20Inversions.md)
