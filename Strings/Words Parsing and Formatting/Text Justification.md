---
topic: Words Parsing and Formatting
pattern: [Greedy lines, Space distribution]
source: LeetCode 68
difficulty: Hard
companies: [Google, Amazon, LinkedIn, Uber]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Text Justification

> [!TIP]
> **🧠 Memory hook**
> Pack each line **greedily**, then share spaces: **each gap gets spaces / gaps**, the **first spaces % gaps** gaps get one more. Last line and one-word lines are left-aligned.
> **Mantra: fit words · each = sp / gaps · extra = sp % gaps to the left · last line: single spaces + pad**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=8) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Format words into lines of exactly maxWidth characters, fully justified, with the last line left-justified.

## Key insight
A word fits while letters + words[j] + (number of gaps so far) ≤ maxWidth. Then the remaining width becomes spaces. Lines with one word and the final line use single spaces and right padding.

## Approach: Greedy + distribute
```java
// Greedily fill each line, then spread spaces with the extras going to the left gaps
public List<String> fullJustify(String[] words, int maxWidth) {
    List<String> out = new ArrayList<>();
    int i = 0, n = words.length;
    while (i < n) {
        int j = i, letters = 0;
        while (j < n && letters + words[j].length() + (j - i) <= maxWidth) letters += words[j++].length();
        int gaps = j - i - 1;
        StringBuilder sb = new StringBuilder();
        if (j == n || gaps == 0) {
            for (int k = i; k < j; k++) {
                if (k > i) sb.append(' ');
                sb.append(words[k]);
            }
            while (sb.length() < maxWidth) sb.append(' ');
        } else {
            int spaces = maxWidth - letters, each = spaces / gaps, extra = spaces % gaps;
            for (int k = i; k < j; k++) {
                sb.append(words[k]);
                if (k < j - 1) sb.append(" ".repeat(each + (k - i < extra ? 1 : 0)));
            }
        }
        out.add(sb.toString());
        i = j;
    }
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy + distribute | O(total characters) | O(maxWidth) |

> [!WARNING]
> **Java gotcha**
> Checked against the three LeetCode samples.

## Recall before you reveal
<details><summary>Where do extra spaces go?</summary>

To the leftmost gaps.

</details>


<details><summary>Why special-case one word?</summary>

There is no gap to put spaces in.

</details>


## Connected
- [Divide a String Into Groups of Size k](Divide%20a%20String%20Into%20Groups%20of%20Size%20k.md)
