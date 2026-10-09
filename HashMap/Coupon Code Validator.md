---
topic: HashMap
pattern: [Lookup table, Custom sort]
source: LeetCode 3606
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Coupon Code Validator

> [!TIP]
> **🧠 Memory hook**
> A checklist, then a sort.
> **Mantra: FILTER, SORT BY (LINE RANK, CODE)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=23) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Return valid coupon codes ordered by business line, then code.

## Key insight
A rank map both validates the business line and orders it.

## Approach: Filter + sort
```java
// Filter valid coupons, then sort by business-line rank and code
public List<String> validateCoupons(String[] code, String[] businessLine, boolean[] isActive) {
    Map<String, Integer> rank = Map.of("electronics", 0, "grocery", 1, "pharmacy", 2, "restaurant", 3);
    List<String[]> ok = new ArrayList<>();
    for (int i = 0; i < code.length; i++)
        if (isActive[i] && rank.containsKey(businessLine[i]) && !code[i].isEmpty() && code[i].matches("[A-Za-z0-9_]+")) ok.add(new String[]{businessLine[i], code[i]});
    ok.sort((a, b) -> !a[0].equals(b[0]) ? rank.get(a[0]) - rank.get(b[0]) : a[1].compareTo(b[1]));
    List<String> res = new ArrayList<>();
    for (String[] x : ok) res.add(x[1]);
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Filter + sort | O(n log n) | O(n) |

## Recall before you reveal
<details><summary>Valid code?</summary>

Non-empty, letters/digits/underscore only.

</details>

