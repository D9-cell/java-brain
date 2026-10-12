---
topic: Words Parsing and Formatting
pattern: [Two pointers, Builder]
source: LeetCode 2109
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Adding Spaces to a String

> [!TIP]
> **🧠 Memory hook**
> Walk s and the sorted spaces together: when **i hits the next space index**, append a space first.
> **Mantra: spaces[j] == i → append " ", j++ · append s[i]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=6) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
spaces holds increasing indexes. Insert a space before each of those characters and return the new string.

## Key insight
Repeated insert into a string would be O(n²). One builder pass with a second pointer is linear.

## Approach: Merge pass
```java
// Two pointers: copy characters and insert a space whenever i reaches the next space index
public String addSpaces(String s, int[] spaces) {
    StringBuilder sb = new StringBuilder(s.length() + spaces.length);
    int j = 0;
    for (int i = 0; i < s.length(); i++) {
        if (j < spaces.length && spaces[j] == i) {
            sb.append(' ');
            j++;
        }
        sb.append(s.charAt(i));
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Merge pass | O(n + m) | O(n + m) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why preallocate the builder?</summary>

The final length is known: n + m.

</details>


<details><summary>Why is one pointer enough for spaces?</summary>

They are sorted.

</details>


## Connected
- [Divide a String Into Groups of Size k](Divide%20a%20String%20Into%20Groups%20of%20Size%20k.md)
