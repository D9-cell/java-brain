---
topic: Geometry and Randomness
pattern: [Uniform sampling, Polar]
source: LeetCode 478
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Generate Random Point in a Circle

> [!TIP]
> **🧠 Memory hook**
> Area grows with **r²**, so a uniform point has radius **R·√u**, not R·u. The angle is uniform in [0, 2π).
> **Mantra: len = √u · R · angle = 2π·v · (x + len cos, y + len sin)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Geometry%20and%20Randomness/Geometry%20and%20Randomness%20Animations.html#p=8) · **Pattern hub:** [Geometry and Randomness - Pattern Map](Geometry%20and%20Randomness%20-%20Pattern%20Map.md)

## Problem
Implement randPoint() that returns a uniformly random point inside a circle with the given radius and centre.

## Key insight
The probability of landing within radius ρ must be ρ²/R². Taking ρ = R·√u gives exactly that. Rejection sampling from the bounding square also works (accept with probability π/4).

## Approach: Polar with √u
```java
// Uniform point in a circle: the radius needs sqrt(u), since area grows with r²
class RandomPointInCircle {
    final double r, x, y;
    final Random rng = new Random();

    RandomPointInCircle(double radius, double xCenter, double yCenter) {
        r = radius;
        x = xCenter;
        y = yCenter;
    }

    public double[] randPoint() {
        double len = Math.sqrt(rng.nextDouble()) * r, angle = rng.nextDouble() * 2 * Math.PI;
        return new double[]{x + len * Math.cos(angle), y + len * Math.sin(angle)};
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Polar with √u | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked statistically: 10⁵ or more samples, every outcome reachable and each frequency within a few percent of uniform.

## Recall before you reveal
<details><summary>What goes wrong with R·u?</summary>

Points crowd near the centre.

</details>


<details><summary>Rejection alternative?</summary>

Pick in the square, retry while outside the circle: about 1.27 tries on average.

</details>


## Connected
- [Random Point in Non-overlapping Rectangles](Random%20Point%20in%20Non-overlapping%20Rectangles.md)
- [Implement Rand10() Using Rand7()](Implement%20Rand10%28%29%20Using%20Rand7%28%29.md)
