---
topic: Words Parsing and Formatting
pattern: [Two pointers, Prefix and suffix]
source: LeetCode 1813
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Sentence Similarity III

> [!TIP]
> **🧠 Memory hook**
> The shorter sentence must be a **prefix + suffix** of the longer one. Match words from the front, then from the back.
> **Mantra: front matches · back matches (not overlapping) · front + back == shorter length**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=12) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Two sentences are similar if one sentence can be inserted (as a contiguous block of words, possibly empty) into the other to make them equal. Return whether they are similar.

## Key insight
Inserting a block into the shorter sentence means its first words match the longer one's start and its last words match the longer one's end. Limit the back matching so it does not reuse words already matched at the front.

## Approach: Front and back match
```java
// Match as many words as possible from the front and from the back; they must cover the shorter sentence
public boolean areSentencesSimilar(String sentence1, String sentence2) {
    String[] a = sentence1.split(" "), b = sentence2.split(" ");
    if (a.length > b.length) {
        String[] t = a;
        a = b;
        b = t;
    }
    int front = 0, back = 0;
    while (front < a.length && a[front].equals(b[front])) front++;
    while (back < a.length - front && a[a.length - 1 - back].equals(b[b.length - 1 - back])) back++;
    return front + back == a.length;
}
```

| Approach | Time | Space |
|---|---|---|
| Front and back match | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why limit back to a.length − front?</summary>

A word cannot be matched twice.

</details>


<details><summary>Is an empty insertion allowed?</summary>

Yes, equal sentences are similar.

</details>


## Connected
- [Check If Two String Arrays are Equivalent](Check%20If%20Two%20String%20Arrays%20are%20Equivalent.md)
