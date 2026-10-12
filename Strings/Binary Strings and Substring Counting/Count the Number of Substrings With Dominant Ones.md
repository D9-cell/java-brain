---
topic: Binary Strings and Substring Counting
pattern: [Bounded enumeration]
source: LeetCode 3234
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Count the Number of Substrings With Dominant Ones

> [!TIP]
> **🧠 Memory hook**
> Dominant needs **ones ≥ zeros²**, so a dominant substring has **at most √n zeros**. For each start, step through the next √n zeros and count valid ends.
> **Mantra: FOR start: z = 0 → all ends before next zero · z ≥ 1: ends in [z-th zero, next zero) with length ≥ z² + z**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=13) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
A binary string has dominant ones if ones ≥ zeros². Count its substrings with dominant ones.

## Key insight
Fix the start i and the number of zeros z. The ends with exactly z zeros form an interval between the z-th and (z + 1)-th zero after i. Ones ≥ z² means the length is at least z² + z, which cuts the interval from the left.

## Approach: Start × few zeros
```java
// With z zeros we need ones >= z², so z <= √n; for each start count valid ends for each z
public int numberOfSubstrings(String s) {
    int n = s.length();
    List<Integer> zeros = new ArrayList<>();
    for (int i = 0; i < n; i++) if (s.charAt(i) == '0') zeros.add(i);
    int Z = zeros.size(), count = 0, p = 0;
    for (int i = 0; i < n; i++) {
        while (p < Z && zeros.get(p) < i) p++;
        count += (p < Z ? zeros.get(p) : n) - i;
        for (int z = 1; (long) z * z <= n && p + z - 1 < Z; z++) {
            int lo = zeros.get(p + z - 1);
            int hi = (p + z < Z ? zeros.get(p + z) : n) - 1;
            int from = Math.max(lo, i + z * z + z - 1);
            if (from <= hi) count += hi - from + 1;
        }
    }
    return count;
}
```

| Approach | Time | Space |
|---|---|---|
| Start × few zeros | O(n √n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why only √n zeros?</summary>

z² ≤ ones ≤ n.

</details>


<details><summary>Why is the valid set of ends an interval?</summary>

With z fixed, more length only adds ones.

</details>


## Connected
- [Count Binary Substrings](Count%20Binary%20Substrings.md)
