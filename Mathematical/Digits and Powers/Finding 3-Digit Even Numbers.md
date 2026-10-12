---
topic: Digits and Powers
pattern: [Digit counts, Enumerate answers]
source: LeetCode 2094
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Finding 3-Digit Even Numbers

> [!TIP]
> **🧠 Memory hook**
> Do not permute the input. Walk the **450 even numbers 100..998** and check each against the digit counts.
> **Mantra: have = counts · FOR x = 100..998 step 2: need ≤ have → add**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=15) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Given digits (with repeats), return all distinct three-digit even numbers without leading zeros that can be built from them, sorted.

## Key insight
Enumerating answers is simpler than enumerating digit triples: the result is automatically sorted, distinct, even and free of leading zeros. A candidate is valid if no digit is needed more often than it is available.

## Approach: Enumerate candidates
```java
// Walks the even numbers 100..998 and keeps those the digit counts can build
public int[] findEvenNumbers(int[] digits) {
    int[] have = new int[10];
    for (int d : digits) have[d]++;
    List<Integer> out = new ArrayList<>();
    for (int x = 100; x < 1000; x += 2) {
        int[] need = new int[10];
        need[x / 100]++;
        need[x / 10 % 10]++;
        need[x % 10]++;
        boolean ok = true;
        for (int d = 0; d < 10 && ok; d++) ok = need[d] <= have[d];
        if (ok) out.add(x);
    }
    return out.stream().mapToInt(Integer::intValue).toArray();
}
```

| Approach | Time | Space |
|---|---|---|
| Enumerate candidates | O(450 · 10) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why step by 2?</summary>

Only even numbers qualify.

</details>


<details><summary>Why no sort?</summary>

Candidates are visited in increasing order.

</details>


## Connected
- [Reordered Power of 2](Reordered%20Power%20of%202.md)
- [Maximum Number of Balloons](Maximum%20Number%20of%20Balloons.md)
