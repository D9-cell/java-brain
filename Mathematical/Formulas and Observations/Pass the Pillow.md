---
topic: Formulas and Observations
pattern: [Period, Parity of trips]
source: LeetCode 2582
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Pass the Pillow

> [!TIP]
> **🧠 Memory hook**
> One end-to-end trip takes **n − 1** seconds. Even trips walk forward from 1, odd trips walk back from n.
> **Mantra: trips = time/(n−1), rest = time%(n−1) · even → 1 + rest · odd → n − rest**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=2) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
n people in a line pass a pillow every second, starting at person 1 going right and reversing direction at either end. Return who holds it after time seconds.

## Key insight
The motion is periodic with period 2(n − 1), made of two trips. The parity of completed trips gives the direction, the remainder gives the distance walked.

## Approach: Trips and remainder
```java
// A full trip takes n - 1 seconds; odd trips walk back from n
public int passThePillow(int n, int time) {
    int trips = time / (n - 1), rest = time % (n - 1);
    return trips % 2 == 0 ? 1 + rest : n - rest;
}
```

| Approach | Time | Space |
|---|---|---|
| Trips and remainder | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why n − 1 and not n?</summary>

Going from person 1 to person n is n − 1 passes.

</details>


<details><summary>Simulation?</summary>

O(time), fine for the limits but the formula is cleaner.

</details>


## Connected
- [Count of Matches in Tournament](Count%20of%20Matches%20in%20Tournament.md)
