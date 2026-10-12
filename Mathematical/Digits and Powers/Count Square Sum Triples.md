---
topic: Digits and Powers
pattern: [Enumerate pairs]
source: LeetCode 1925
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count Square Sum Triples

> [!TIP]
> **🧠 Memory hook**
> n ≤ 250, so try **every (a, b)** and check if **a² + b²** is a perfect square ≤ n².
> **Mantra: FOR a, b: c = √(a²+b²) · c ≤ n && c² == a²+b² → count++**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=13) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
A square triple (a, b, c) has a² + b² = c². Count the ordered triples with 1 ≤ a, b, c ≤ n.

## Key insight
Instead of three loops, compute c from a and b and verify. (a, b) and (b, a) count separately because the triple is ordered.

## Approach: Pairs + square check
```java
// For each pair (a, b) checks whether a² + b² is a perfect square no larger than n²
public int countTriples(int n) {
    int count = 0;
    for (int a = 1; a <= n; a++)
        for (int b = 1; b <= n; b++) {
            int s = a * a + b * b;
            int c = (int) Math.sqrt(s);
            if (c <= n && c * c == s) count++;
        }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Pairs + square check | O(n²) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why count (3,4,5) and (4,3,5)?</summary>

The problem counts ordered triples.

</details>


<details><summary>Is Math.sqrt safe?</summary>

Yes for these small values; the c·c check confirms it.

</details>


## Connected
- [Sum of Square Numbers](Sum%20of%20Square%20Numbers.md)
