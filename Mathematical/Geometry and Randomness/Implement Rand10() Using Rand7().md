---
topic: Geometry and Randomness
pattern: [Rejection sampling]
source: LeetCode 470
difficulty: Medium
companies: [Google, Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Implement Rand10() Using Rand7()

> [!TIP]
> **🧠 Memory hook**
> Two rand7 calls give a uniform **1..49**. Keep **1..40** (four full copies of 1..10) and reject the rest.
> **Mantra: idx = (rand7() − 1)·7 + rand7() · idx ≤ 40 → 1 + (idx − 1) % 10 · ELSE retry**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=10) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
Given rand7() that returns a uniform integer in [1, 7], implement rand10() returning a uniform integer in [1, 10].

## Key insight
The pair (first, second) is uniform over 49 outcomes and maps one-to-one to 1..49. Values 41..49 would make some results more likely, so they are thrown away. Expected calls ≈ 2 · 49/40 ≈ 2.45.

## Approach: Rejection
```java
// Two rand7 calls make a uniform 1..49; keep 1..40 and fold it onto 1..10
class ImplementRand10UsingRand7 {
    final Random rng = new Random();

    int rand7() {
        return 1 + rng.nextInt(7);
    }

    public int rand10() {
        while (true) {
            int idx = (rand7() - 1) * 7 + rand7();
            if (idx <= 40) return 1 + (idx - 1) % 10;
        }
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Rejection | O(1) expected | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked statistically: 10⁵ or more samples, every outcome reachable and each frequency within a few percent of uniform.

## Recall before you reveal
<details><summary>Why not rand7() + rand7()?</summary>

Sums are not uniform (7 is more likely than 2).

</details>


<details><summary>Why 40?</summary>

The largest multiple of 10 not above 49.

</details>


## Connected
- [Generate Random Point in a Circle](Generate%20Random%20Point%20in%20a%20Circle.md)
