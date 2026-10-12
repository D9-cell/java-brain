---
topic: Formulas and Observations
pattern: [Parity, Observation]
source: LeetCode 3875
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Construct Uniform Parity Array II

> [!TIP]
> **🧠 Memory hook**
> Odd − odd is even, even − odd is odd. With an **odd minimum** every even value can turn odd. With an **even minimum** that minimum is stuck even, so all must already be even.
> **Mantra: min odd → true · ELSE all even ?**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=15) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
Build nums2 where each nums2[i] is nums1[i] or nums1[i] − nums1[j] for some j with nums1[j] < nums1[i]. Return true if all of nums2 can have the same parity.

## Key insight
The smallest element can never change. If it is odd, keep odd values and subtract it from even values to make them odd. If it is even, everything must become even; an odd value would need a smaller odd value to subtract, and the smallest odd value has none.

## Approach: Check the minimum
```java
// An odd minimum turns every even value odd; an even minimum is stuck, so all values must be even
public boolean uniformArray(int[] nums1) {
    int min = Integer.MAX_VALUE;
    for (int x : nums1) min = Math.min(min, x);
    if (min % 2 != 0) return true;
    for (int x : nums1)
        if (x % 2 != 0) return false;
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Check the minimum | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute force over all choices on small arrays.

## Recall before you reveal
<details><summary>Why is the minimum fixed?</summary>

Nothing smaller exists to subtract from it.

</details>


<details><summary>Why does the smallest odd value stay odd?</summary>

Only smaller values can be subtracted, and they are all even, so the parity never changes.

</details>


## Connected
- [Alice and Bob Playing Flower Game](Alice%20and%20Bob%20Playing%20Flower%20Game.md)
