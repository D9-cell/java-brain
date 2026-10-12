---
topic: Words Parsing and Formatting
pattern: [Sort, Prefix check]
source: LeetCode 1233
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Remove Sub-Folders from the Filesystem

> [!TIP]
> **🧠 Memory hook**
> Sort paths; a sub-folder starts with **last kept folder + "/"**. The slash stops "/a" from swallowing "/ab".
> **Mantra: sort · keep f unless f.startsWith(lastKept + "/")**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Words%20Parsing%20and%20Formatting/Words%20Parsing%20and%20Formatting%20Animations.html#p=11) · **Pattern hub:** [Words Parsing and Formatting - Pattern Map](Words%20Parsing%20and%20Formatting%20-%20Pattern%20Map.md)

## Problem
Remove all sub-folders from the list of folders and return the rest.

## Key insight
After sorting, every sub-folder of a kept folder appears after it, before any unrelated folder that would be kept, so comparing with the last kept folder is enough.

## Approach: Sort + prefix
```java
// After sorting, a sub-folder comes right after its parent's run; compare with the last kept folder plus "/"
public List<String> removeSubfolders(String[] folder) {
    Arrays.sort(folder);
    List<String> out = new ArrayList<>();
    for (String f : folder)
        if (out.isEmpty() || !f.startsWith(out.get(out.size() - 1) + "/")) out.add(f);
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + prefix | O(n L log n) | O(n L) |

> [!WARNING]
> **Java gotcha**
> Checked against the LeetCode samples.

## Recall before you reveal
<details><summary>Why add "/"?</summary>

"/a/b/ca" is not inside "/a/b/c".

</details>


<details><summary>Alternative?</summary>

A trie of path segments.

</details>


## Connected
- [Find Duplicate File in System](Find%20Duplicate%20File%20in%20System.md)
