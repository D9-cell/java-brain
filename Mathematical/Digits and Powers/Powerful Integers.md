---
topic: Digits and Powers
pattern: [Enumerate powers, Set]
source: LeetCode 970
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Powerful Integers

> [!TIP]
> **🧠 Memory hook**
> There are only about **log(bound)** powers of each base. Try every pair and stop when a base is **1**.
> **Mantra: FOR a = x^i ≤ bound: FOR b = y^j: ADD a+b · BREAK IF base == 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=10) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Given x, y and bound, return every value x^i + y^j ≤ bound with i, j ≥ 0, each once.

## Key insight
With base ≥ 2 the powers up to 10⁶ are at most 20. A base of 1 gives the same power forever, so break after the first one. A set removes duplicates.

## Approach: Double loop over powers
```java
// Tries every x^i and y^j up to bound; a base of 1 only contributes once
public List<Integer> powerfulIntegers(int x, int y, int bound) {
    Set<Integer> seen = new HashSet<>();
    for (int a = 1; a <= bound; a *= x) {
        for (int b = 1; a + b <= bound; b *= y) {
            seen.add(a + b);
            if (y == 1) break;
        }
        if (x == 1) break;
    }
    return new ArrayList<>(seen);
}
```

| Approach | Time | Space |
|---|---|---|
| Double loop over powers | O(log² bound) | O(log² bound) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why break when the base is 1?</summary>

1^i is always 1, so the loop would never end.

</details>


<details><summary>Why a set?</summary>

Different (i, j) can give the same sum, e.g. 2 + 1 = 1 + 2.

</details>


## Connected
- [Pow(x, n)](Pow%28x%2C%20n%29.md)
