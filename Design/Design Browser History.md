---
topic: Design
pattern: [Array + pointers]
source: LeetCode 1472
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design Browser History

> [!TIP]
> **🧠 Memory hook**
> A book with a bookmark; writing a new page tears out the pages after it.
> **Mantra: ARRAY + cur + last**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=7) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
visit(url), back(steps), forward(steps).

## Key insight
One list, a current pointer, and `last` (the furthest valid page). visit overwrites at cur+1 and sets last = cur.

## Approach: List + two pointers
```java
// One list + cur pointer + last valid index (visit cuts off the forward history)
static class BrowserHistory {
    private final List<String> pages = new ArrayList<>();
    private int cur = 0, last = 0;

    BrowserHistory(String homepage) { pages.add(homepage); }

    // Overwrite at cur + 1 and forget anything after it
    public void visit(String url) {
        cur++;
        if (cur < pages.size()) pages.set(cur, url); else pages.add(url);
        last = cur;
    }

    // Move left at most steps
    public String back(int steps) { cur = Math.max(0, cur - steps); return pages.get(cur); }

    // Move right at most up to last
    public String forward(int steps) { cur = Math.min(last, cur + steps); return pages.get(cur); }
}
```

| Approach | Time | Space |
|---|---|---|
| List + two pointers | O(1) all | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Why not delete the forward pages?</summary>

Overwriting in place and moving `last` is O(1).

</details>

