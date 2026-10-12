---
topic: Simulation and Encoding
pattern: [Bit counting]
source: LeetCode 3304
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find the K-th Character in String Game I

> [!TIP]
> **🧠 Memory hook**
> word doubles each round and the new half is shifted by 1. Index k − 1 was shifted once for **every set bit**.
> **Mantra: 'a' + bitCount(k − 1)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=10) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
Start with word = "a". Repeatedly append a copy of word with every letter moved to the next letter. Return the k-th character once word has at least k characters.

## Key insight
Index i lands in the second half of some round exactly when one of its bits is set; each such round adds one shift. Simulation also works for k ≤ 500.

## Approach 1: Popcount
```java
// Position k - 1 was shifted once for every set bit it has
public char kthCharacter(int k) {
    return (char) ('a' + Integer.bitCount(k - 1) % 26);
}
```

## Approach 2: Simulate
```java
// Direct simulation: append the shifted copy until the word is long enough
public char kthCharacterSimulate(int k) {
    StringBuilder word = new StringBuilder("a");
    while (word.length() < k) {
        int len = word.length();
        for (int i = 0; i < len; i++) word.append((char) ('a' + (word.charAt(i) - 'a' + 1) % 26));
    }
    return word.charAt(k - 1);
}
```

| Approach | Time | Space |
|---|---|---|
| Popcount | O(1) | O(1) |
| Simulate | O(k) | O(k) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why k − 1?</summary>

Positions are counted from 0 in the binary argument.

</details>


<details><summary>Wrap z → a?</summary>

Only after 25 shifts, so mod 26.

</details>


## Connected
- [Process String with Special Operations II](Process%20String%20with%20Special%20Operations%20II.md)
