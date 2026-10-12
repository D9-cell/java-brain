---
topic: Simulation and Encoding
pattern: [Track length, Walk back k]
source: LeetCode 3614
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Process String with Special Operations II

> [!TIP]
> **🧠 Memory hook**
> The result can reach 2^n characters, so keep **only its length**. Then walk the operations **backwards**, mapping k through each one.
> **Mantra: forward: len · backward: % → k = len−1−k · # → len /= 2, k %= len · letter at index len−1 == k → answer**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=8) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
Same operations as part I, but return the k-th character (0-indexed) of the final result, or "." if k is out of range. The result may be astronomically long.

## Key insight
Undo the steps from the end: a reverse mirrors k, a doubling halves the length and folds k into the first half, a deletion restores one more character, and a letter that sits exactly at position k is the answer.

## Approach: Length then reverse walk
```java
// Track only the length forward, then walk back mapping k through each operation
public char processStr(String s, long k) {
    long len = 0;
    for (char c : s.toCharArray()) {
        if (c == '*') len = Math.max(0, len - 1);
        else if (c == '#') len *= 2;
        else if (c != '%') len++;
    }
    if (k >= len) return '.';
    for (int i = s.length() - 1; i >= 0; i--) {
        char c = s.charAt(i);
        if (c == '*') len++;
        else if (c == '%') k = len - 1 - k;
        else if (c == '#') {
            len /= 2;
            if (k >= len) k -= len;
        } else {
            len--;
            if (k == len) return c;
        }
    }
    return '.';
}
```

| Approach | Time | Space |
|---|---|---|
| Length then reverse walk | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>How does % map k?</summary>

Position k after reversing was position len − 1 − k before.

</details>


<details><summary>Why can * be ignored for k?</summary>

Deleting the last character does not move earlier positions.

</details>


## Connected
- [Process String with Special Operations I](Process%20String%20with%20Special%20Operations%20I.md)
- [Decoded String at Index](Decoded%20String%20at%20Index.md)
