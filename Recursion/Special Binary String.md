---
topic: Recursion
pattern: [Recursive decomposition, Balanced parentheses]
source: LeetCode 761
difficulty: Hard
companies: [Coursera]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Special Binary String

> [!TIP]
> **🧠 Memory hook**
> Treat 1/0 as ( and ). Special substrings are balanced blocks; swapping adjacent blocks = reordering siblings. Biggest first.
> **Mantra: SPLIT TOP BLOCKS, RECURSE INSIDE, SORT DESC**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=12) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Return the lexicographically largest string obtainable by swapping consecutive special substrings.

## Key insight
Split into top-level balanced blocks "1 X 0". Make each X largest recursively, then sort the blocks in descending order and join.

## Approach: Recursion + sort
```java
// Split into top-level special blocks "1 inner 0", make each inner largest, sort blocks descending
public String makeLargestSpecial(String s) {
    List<String> blocks = new ArrayList<>();
    int start = 0, bal = 0;
    for (int i = 0; i < s.length(); i++) {
        bal += s.charAt(i) == '1' ? 1 : -1;
        if (bal == 0) {
            blocks.add("1" + makeLargestSpecial(s.substring(start + 1, i)) + "0");
            start = i + 1;
        }
    }
    blocks.sort(Comparator.reverseOrder());
    return String.join("", blocks);
}
```

| Approach | Time | Space |
|---|---|---|
| Recursion + sort | O(n²) (sorting strings per level) | O(n) |

## Recall before you reveal
<details><summary>Where is the recursion?</summary>

Inside each block (between its outer 1 and 0).

</details>


## Connected
- Parentheses problems: the Stack folder
