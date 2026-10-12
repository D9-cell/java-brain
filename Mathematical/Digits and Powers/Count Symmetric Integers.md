---
topic: Digits and Powers
pattern: [Digit halves]
source: LeetCode 2843
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Count Symmetric Integers

> [!TIP]
> **🧠 Memory hook**
> Only **even-length** numbers count. Compare the **digit sum of the two halves**.
> **Mantra: odd length → skip · sum(first half) == sum(second half)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=14) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
An integer with 2n digits is symmetric if the sum of its first n digits equals the sum of its last n digits. Count symmetric integers in [low, high].

## Key insight
The range is at most 10⁴, so check each number. Adding first-half digits and subtracting second-half digits gives zero for symmetric numbers.

## Approach: Scan the range
```java
// Even-length numbers whose first half and second half have equal digit sums
public int countSymmetricIntegers(int low, int high) {
    int count = 0;
    for (int x = low; x <= high; x++) {
        String s = Integer.toString(x);
        int n = s.length();
        if (n % 2 == 1) continue;
        int diff = 0;
        for (int i = 0; i < n / 2; i++) diff += s.charAt(i) - s.charAt(n - 1 - i);
        if (diff == 0) count++;
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Scan the range | O((high − low) · log high) | O(log high) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Is 5 symmetric?</summary>

No, odd-length numbers never are.

</details>


<details><summary>Faster for large ranges?</summary>

Digit DP on the difference of sums.

</details>


## Connected
- [Total Waviness of Numbers in Range I](Total%20Waviness%20of%20Numbers%20in%20Range%20I.md)
