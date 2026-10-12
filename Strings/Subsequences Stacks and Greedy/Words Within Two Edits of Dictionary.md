---
topic: Subsequences Stacks and Greedy
pattern: [Hamming distance]
source: LeetCode 2452
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Words Within Two Edits of Dictionary

> [!TIP]
> **🧠 Memory hook**
> All words have the same length and an edit is a **letter change**, so count **differing positions**, stopping once over 2.
> **Mantra: FOR query: any dict word with ≤ 2 differences → keep**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=13) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
An edit changes one letter. Return the queries that can be turned into some dictionary word with at most two edits, in order.

## Key insight
With equal lengths and only substitutions, the number of edits is the Hamming distance. Sizes are at most 100, so trying every pair is fine.

## Approach: Pairwise compare
```java
// Keep a query if some dictionary word differs from it in at most two positions
public List<String> twoEditWords(String[] queries, String[] dictionary) {
    List<String> out = new ArrayList<>();
    for (String q : queries)
        for (String d : dictionary) {
            int diff = 0;
            for (int i = 0; i < q.length() && diff <= 2; i++)
                if (q.charAt(i) != d.charAt(i)) diff++;
            if (diff <= 2) {
                out.add(q);
                break;
            }
        }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Pairwise compare | O(q · d · n) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why stop at 3 differences?</summary>

The pair is already too far.

</details>


<details><summary>Larger inputs?</summary>

Index dictionary words by masked patterns.

</details>


## Connected
- [One Edit Distance](One%20Edit%20Distance.md)
- [Count Substrings That Differ by One Character](../Binary%20Strings%20and%20Substring%20Counting/Count%20Substrings%20That%20Differ%20by%20One%20Character.md)
