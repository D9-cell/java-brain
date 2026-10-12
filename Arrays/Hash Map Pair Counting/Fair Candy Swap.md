---
topic: Hash Map Pair Counting
pattern: [Complements, Set lookup]
source: LeetCode 888
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Fair Candy Swap

> [!TIP]
> **🧠 Memory hook**
> Alice gives x and gets y; equal totals need **y = x + (sumB − sumA)/2**. Look y up in a set of Bob's boxes.
> **Mantra: delta = (sb − sa)/2 · x with x + delta in Bob → [x, x + delta]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Hash%20Map%20Pair%20Counting/Hash%20Map%20Pair%20Counting%20Animations.html#p=6) · **Pattern hub:** [Hash Map Pair Counting - Pattern Map](Hash%20Map%20Pair%20Counting%20-%20Pattern%20Map.md)

## Problem
Alice and Bob each have candy boxes. Swap one box each so both end with the same total. Return [Alice's box, Bob's box] (an answer is guaranteed).

## Key insight
After the swap Alice has sa − x + y and Bob sb − y + x. Setting them equal gives y − x = (sb − sa)/2.

## Approach: Set lookup
```java
// Alice gives x and gets y: y = x + (sumB - sumA) / 2; look y up in a set
public int[] fairCandySwap(int[] aliceSizes, int[] bobSizes) {
    int sa = 0, sb = 0;
    for (int x : aliceSizes) sa += x;
    Set<Integer> bob = new HashSet<>();
    for (int y : bobSizes) {
        sb += y;
        bob.add(y);
    }
    int delta = (sb - sa) / 2;
    for (int x : aliceSizes)
        if (bob.contains(x + delta)) return new int[]{x, x + delta};
    return new int[0];
}
```

| Approach | Time | Space |
|---|---|---|
| Set lookup | O(n + m) | O(m) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Where does delta come from?</summary>

sa − x + y = sb − y + x.

</details>


<details><summary>Odd difference?</summary>

No swap exists; the problem guarantees one.

</details>


## Connected
- [Swapping pairs make sum equal](Swapping%20pairs%20make%20sum%20equal.md)
