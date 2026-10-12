---
topic: Subsequences Stacks and Greedy
pattern: [Substring test]
source: LeetCode 1408
difficulty: Easy
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# String Matching in an Array

> [!TIP]
> **🧠 Memory hook**
> Keep a word if it **occurs inside another** word.
> **Mantra: any j ≠ i: words[j].contains(words[i]) → keep**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=18) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Return all strings in words that are substrings of another word.

## Key insight
Sizes are small (100 words of length 30), so a double loop with contains is enough; KMP or a suffix structure helps for larger inputs.

## Approach: Double loop
```java
// Keep a word if it occurs inside any other word
public List<String> stringMatching(String[] words) {
    List<String> out = new ArrayList<>();
    for (int i = 0; i < words.length; i++)
        for (int j = 0; j < words.length; j++)
            if (i != j && words[j].contains(words[i])) {
                out.add(words[i]);
                break;
            }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Double loop | O(n² · L²) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why break after a match?</summary>

Each word is listed once.

</details>


<details><summary>Speed-up?</summary>

Sort by length and only test against longer words.

</details>


## Connected
- [Shortest Uncommon Substring in an Array](Shortest%20Uncommon%20Substring%20in%20an%20Array.md)
- [Find the Index of the First Occurrence in a String](../Pattern%20Matching/Find%20the%20Index%20of%20the%20First%20Occurrence%20in%20a%20String.md)
