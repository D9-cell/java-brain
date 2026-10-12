---
topic: Digits and Powers
pattern: [Letter counts]
source: LeetCode 1189
difficulty: Easy
companies: [Tesla]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Maximum Number of Balloons

> [!TIP]
> **🧠 Memory hook**
> Count letters. The answer is the **scarcest letter divided by how often "balloon" needs it** (l and o twice).
> **Mantra: min(b, a, l/2, o/2, n)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Digits%20and%20Powers/Digits%20and%20Powers%20Animations.html#p=21) · **Pattern hub:** [Digits and Powers - Pattern Map](Digits%20and%20Powers%20-%20Pattern%20Map.md)

## Problem
Return the maximum number of times the word "balloon" can be formed from the characters of text, using each character once.

## Key insight
Each copy uses b, a, n once and l, o twice, so the number of copies is limited by the smallest of those ratios.

## Approach: Count and divide
```java
// Counts letters; l and o are needed twice per word
public int maxNumberOfBalloons(String text) {
    int[] f = new int[26];
    for (char c : text.toCharArray()) f[c - 'a']++;
    return Math.min(Math.min(f['b' - 'a'], f['a' - 'a']),
           Math.min(Math.min(f['l' - 'a'] / 2, f['o' - 'a'] / 2), f['n' - 'a']));
}
```

| Approach | Time | Space |
|---|---|---|
| Count and divide | O(n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why divide l and o by 2?</summary>

"balloon" contains two of each.

</details>


<details><summary>General version?</summary>

min over letters of have[c] / need[c].

</details>


## Connected
- [Finding 3-Digit Even Numbers](Finding%203-Digit%20Even%20Numbers.md)
