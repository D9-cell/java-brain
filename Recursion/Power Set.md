---
topic: Recursion
pattern: [Backtracking, For-loop recursion]
source: GFG
difficulty: Medium
companies: [Snapdeal]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Power Set

> [!TIP]
> **🧠 Memory hook**
> A family tree of words: each node adds one later letter; every node is an answer.
> **Mantra: RECORD NODE, FOR i ≥ idx: ADD, RECURSE, REMOVE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=3) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Print all non-empty subsequences of s in lexicographic order.

## Key insight
The same 2^n subsets as Subsets. The for-loop form records a result at every node instead of at leaves.

## Approach 1: Take/skip
```java
// Approach 1: take / skip each character; record at the end
static void takeSkip(String s, int idx, StringBuilder cur, List<String> out) {
    if (idx == s.length()) {
        if (cur.length() > 0) out.add(cur.toString());
        return;
    }
    cur.append(s.charAt(idx));
    takeSkip(s, idx + 1, cur, out);
    cur.deleteCharAt(cur.length() - 1);
    takeSkip(s, idx + 1, cur, out);
}

// GFG entry point
public List<String> AllPossibleStrings(String s) {
    List<String> out = new ArrayList<>();
    takeSkip(s, 0, new StringBuilder(), out);
    Collections.sort(out);
    return out;
}
```

## Approach 2: For-loop
```java
// Approach 2: record the current string, then try each next character with a for loop
static void forLoop(String s, int idx, StringBuilder cur, List<String> out) {
    if (cur.length() > 0) out.add(cur.toString());
    for (int i = idx; i < s.length(); i++) {
        cur.append(s.charAt(i));
        forLoop(s, i + 1, cur, out);
        cur.deleteCharAt(cur.length() - 1);
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Take/skip | O(n·2^n) | O(n) |
| For-loop | O(n·2^n) | O(n) |

## Recall before you reveal
<details><summary>Difference between the two forms?</summary>

Where you record: leaves vs every node.

</details>


## Connected
- [Subsets](Subsets.md)
