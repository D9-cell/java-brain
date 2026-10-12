---
topic: Formulas and Observations
pattern: [Sort, Slot check]
source: LeetCode 1502
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Can Make Arithmetic Progression From Sequence

> [!TIP]
> **🧠 Memory hook**
> Sort and check equal gaps, or without sorting: **min, max and n fix the gap d**, and every value must fill a **distinct slot (x − min)/d**.
> **Mantra: d = (max − min)/(n − 1) · slot = (x − min)/d · no repeats**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=12) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
Return true if arr can be rearranged into an arithmetic progression.

## Key insight
An AP of n terms from min to max has difference (max − min)/(n − 1). Each element must be min + slot·d for a slot not used yet. d = 0 means all values are equal.

## Approach 1: Sort
```java
// Sorted, every neighbour gap must be the same
public boolean canMakeArithmeticProgressionSort(int[] arr) {
    Arrays.sort(arr);
    for (int i = 2; i < arr.length; i++)
        if (arr[i] - arr[i - 1] != arr[1] - arr[0]) return false;
    return true;
}
```

## Approach 2: Slots
```java
// Without sorting: min, max and n fix the gap; each value must land on a free slot
public boolean canMakeArithmeticProgression(int[] arr) {
    int n = arr.length, min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
    for (int x : arr) {
        min = Math.min(min, x);
        max = Math.max(max, x);
    }
    if ((max - min) % (n - 1) != 0) return false;
    int d = (max - min) / (n - 1);
    if (d == 0) return true;
    boolean[] used = new boolean[n];
    for (int x : arr) {
        if ((x - min) % d != 0) return false;
        int slot = (x - min) / d;
        if (used[slot]) return false;
        used[slot] = true;
    }
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort | O(n log n) | O(1) |
| Slots | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why must max − min divide by n − 1?</summary>

n terms span n − 1 equal gaps.

</details>


<details><summary>Why reject repeats when d > 0?</summary>

Two equal values would need the same slot.

</details>


## Connected
- [Count the Hidden Sequences](Count%20the%20Hidden%20Sequences.md)
