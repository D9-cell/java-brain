---
topic: Character Counts and Anagrams
pattern: [Bit mask]
source: LeetCode 1832
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Check if the Sentence Is Pangram

> [!TIP]
> **🧠 Memory hook**
> Turn on **one bit per letter**. A pangram lights all **26 bits**.
> **Mantra: mask |= 1 << (c − a) · mask == 2²⁶ − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Character%20Counts%20and%20Anagrams/Character%20Counts%20and%20Anagrams%20Animations.html#p=8) · **Pattern hub:** [Character Counts and Anagrams - Pattern Map](Character%20Counts%20and%20Anagrams%20-%20Pattern%20Map.md)

## Problem
Return true if the lowercase sentence contains every letter of the alphabet at least once.

## Key insight
An int has room for 26 flags, so a mask replaces a boolean array or set.

## Approach: Bit mask
```java
// Set one bit per letter; all 26 bits means every letter appeared
public boolean checkIfPangram(String sentence) {
    int mask = 0;
    for (char c : sentence.toCharArray()) mask |= 1 << (c - 'a');
    return mask == (1 << 26) - 1;
}
```

| Approach | Time | Space |
|---|---|---|
| Bit mask | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why (1 << 26) − 1?</summary>

It is 26 ones in binary.

</details>


<details><summary>Early exit?</summary>

Stop once the mask is full.

</details>


## Connected
- [Maximum Number of Words You Can Type](Maximum%20Number%20of%20Words%20You%20Can%20Type.md)
