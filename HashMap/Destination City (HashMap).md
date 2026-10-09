---
topic: HashMap
pattern: [Graph in a map]
source: LeetCode 1436
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Destination City (HashMap)

> [!TIP]
> **🧠 Memory hook**
> The last station has no outgoing train.
> **Mantra: OUT-DEGREE 0**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=12) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Return the city with no outgoing path.

## Key insight
Count out-degrees; the destination is the only city with 0.

## Approach: Out-degree map
```java
// Count out-degrees; the destination is the only city with out-degree 0
public String destCity(List<List<String>> paths) {
    Map<String, Integer> out = new HashMap<>();
    for (List<String> p : paths) {
        out.merge(p.get(0), 1, Integer::sum);
        out.putIfAbsent(p.get(1), 0);
    }
    for (Map.Entry<String, Integer> e : out.entrySet()) if (e.getValue() == 0) return e.getKey();
    return "";
}
```

| Approach | Time | Space |
|---|---|---|
| Out-degree map | O(n) | O(n) |

## Recall before you reveal
<details><summary>HashSet version?</summary>

Set of sources; find a destination not in it.

</details>


## Connected
- [Destination City](../HashSet/Destination%20City.md)
- [Find the Town Judge](Find%20the%20Town%20Judge.md)
