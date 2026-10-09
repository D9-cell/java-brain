---
topic: HashSet
pattern: [HashSet membership]
source: LeetCode 1436
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Destination City

> [!TIP]
> **🧠 Memory hook**
> A one-way train line: the last station is the one you never depart from.
> **Mantra: SET OF SOURCES, FIND NON-SOURCE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=4) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
Given paths [from, to] forming a line, return the final destination.

## Key insight
Collect every `from` city. The answer is the `to` city that is not in that set.

## Approach: Set of sources
```java
// Every city with an outgoing path is a source; the destination is the only city never used as a source
public String destCity(List<List<String>> paths) {
    Set<String> sources = new HashSet<>();
    for (List<String> p : paths) sources.add(p.get(0));
    for (List<String> p : paths) if (!sources.contains(p.get(1))) return p.get(1);
    return "";
}
```

| Approach | Time | Space |
|---|---|---|
| Set of sources | O(n) | O(n) |

## Recall before you reveal
<details><summary>HashMap alternative?</summary>

Out-degree count; the city with out-degree 0.

</details>


## Connected
- HashMap version: the `HashMap` folder
