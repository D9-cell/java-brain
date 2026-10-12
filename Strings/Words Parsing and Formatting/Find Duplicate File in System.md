---
topic: Words Parsing and Formatting
pattern: [Group by key]
source: LeetCode 609
difficulty: Medium
companies: [Dropbox]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Find Duplicate File in System

> [!TIP]
> **🧠 Memory hook**
> Parse "dir name(content)" and **group full paths by content**. Groups of two or more are duplicates.
> **Mantra: content → list of dir/name · keep size > 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=10) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Each string is a directory followed by files written as name(content). Return groups of file paths with identical content.

## Key insight
A HashMap from content to paths does the grouping in one pass; the only work is splitting each entry at "(".

## Approach: HashMap by content
```java
// Group full paths by file content; keep groups with at least two files
public List<List<String>> findDuplicate(String[] paths) {
    Map<String, List<String>> byContent = new HashMap<>();
    for (String p : paths) {
        String[] parts = p.split(" ");
        for (int k = 1; k < parts.length; k++) {
            int open = parts[k].indexOf('(');
            String name = parts[k].substring(0, open);
            String content = parts[k].substring(open + 1, parts[k].length() - 1);
            byContent.computeIfAbsent(content, x -> new ArrayList<>()).add(parts[0] + "/" + name);
        }
    }
    List<List<String>> out = new ArrayList<>();
    for (List<String> g : byContent.values())
        if (g.size() > 1) out.add(g);
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| HashMap by content | O(total length) | O(total length) |

> [!WARNING]
> **Java gotcha**
> Checked against the LeetCode sample.

## Recall before you reveal
<details><summary>Huge files?</summary>

Group by size first, then hash, then compare bytes.

</details>


<details><summary>Why computeIfAbsent?</summary>

It creates the list on first use.

</details>


## Connected
- [Remove Sub-Folders from the Filesystem](Remove%20Sub-Folders%20from%20the%20Filesystem.md)
