---
topic: Simulation and Encoding
pattern: [Track length, Walk back k]
source: LeetCode 880
difficulty: Medium
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Decoded String at Index

> [!TIP]
> **🧠 Memory hook**
> Compute the decoded **length** only. Walking back, a digit d means the tape is d copies, so **k %= size**; when k hits 0 on a letter, that is the answer.
> **Mantra: size forward · back: k %= size · k == 0 at letter → it · digit → size /= d · letter → size−−**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Simulation%20and%20Encoding/Simulation%20and%20Encoding%20Animations.html#p=9) · **Pattern hub:** [Simulation and Encoding - Pattern Map](Simulation%20and%20Encoding%20-%20Pattern%20Map.md)

## Problem
A letter is written to the tape; a digit d repeats the whole tape d − 1 more times. Return the k-th letter (1-indexed).

## Key insight
The tape can reach 2⁶³ characters. Position k inside d copies of a block of size L is position k mod L of the block. Taking k mod size at every step backward keeps reducing it.

## Approach: Length then reverse walk
```java
// Compute the decoded length, then walk back: a digit d means k lives in one of d copies
public String decodeAtIndex(String s, int k) {
    long size = 0;
    for (char c : s.toCharArray()) size = Character.isDigit(c) ? size * (c - '0') : size + 1;
    long K = k;
    for (int i = s.length() - 1; i >= 0; i--) {
        char c = s.charAt(i);
        K %= size;
        if (K == 0 && Character.isLetter(c)) return String.valueOf(c);
        size = Character.isDigit(c) ? size / (c - '0') : size - 1;
    }
    return "";
}
```

| Approach | Time | Space |
|---|---|---|
| Length then reverse walk | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why k %= size first?</summary>

Inside repeated copies only the offset in one copy matters.

</details>


<details><summary>Why k == 0 means this letter?</summary>

k is a multiple of size, so it is the last character, which is this letter.

</details>


## Connected
- [Process String with Special Operations II](Process%20String%20with%20Special%20Operations%20II.md)
