---
topic: Geometry and Randomness
pattern: [Fisher-Yates]
source: LeetCode 384
difficulty: Medium
companies: [Google, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Shuffle an Array

> [!TIP]
> **🧠 Memory hook**
> From the back: swap position i with a **random j in [0, i]**. Each of the n! orders has probability 1/n!.
> **Mantra: FOR i = n−1..1: j = rand(i + 1) · swap(a[i], a[j])**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=11) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
Implement reset() returning the original array and shuffle() returning a uniformly random permutation.

## Key insight
Position n − 1 receives each element with probability 1/n, then the rest is shuffled the same way. Picking j from the whole array instead gives nⁿ equally likely runs, which cannot spread evenly over n! orders.

## Approach: Fisher-Yates
```java
// Fisher-Yates: position i takes a random element from the part not yet fixed
class ShuffleAnArray {
    final int[] original;
    final Random rng = new Random();

    ShuffleAnArray(int[] nums) {
        original = nums.clone();
    }

    public int[] reset() {
        return original.clone();
    }

    public int[] shuffle() {
        int[] a = original.clone();
        for (int i = a.length - 1; i > 0; i--) {
            int j = rng.nextInt(i + 1);
            int t = a[i];
            a[i] = a[j];
            a[j] = t;
        }
        return a;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Fisher-Yates | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked statistically: 10⁵ or more samples, every outcome reachable and each frequency within a few percent of uniform.

## Recall before you reveal
<details><summary>Why rand(i + 1) and not rand(n)?</summary>

rand(n) gives nⁿ outcomes, not divisible by n!, so it is biased.

</details>


<details><summary>Why clone the original?</summary>

reset must return the initial order.

</details>


## Connected
- [Random Point in Non-overlapping Rectangles](Random%20Point%20in%20Non-overlapping%20Rectangles.md)
