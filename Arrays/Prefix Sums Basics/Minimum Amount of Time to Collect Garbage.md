---
topic: Prefix Sums Basics
pattern: [Prefix travel]
source: LeetCode 2391
difficulty: Medium
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Minimum Amount of Time to Collect Garbage

> [!TIP]
> **🧠 Memory hook**
> Every unit takes one minute. Each truck must also drive to the **last house with its type**: add prefix travel up to that house.
> **Mantra: total units + pre[lastM] + pre[lastP] + pre[lastG]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Prefix%20Sums%20Basics/Prefix%20Sums%20Basics%20Animations.html#p=4) · **Pattern hub:** [Prefix Sums Basics - Pattern Map](Prefix%20Sums%20Basics%20-%20Pattern%20Map.md)

## Problem
Three trucks (M, P, G) start at house 0 and pick up their type of garbage; travel[i] is the time from house i to i + 1. Return the total minutes.

## Key insight
Trucks never need to go past their last useful house, so each one's travel is a prefix sum.

## Approach: Last index + prefix
```java
// Every unit takes a minute; each truck also drives to the last house holding its type
public int garbageCollection(String[] garbage, int[] travel) {
    int total = 0, lastM = 0, lastP = 0, lastG = 0;
    for (int i = 0; i < garbage.length; i++) {
        total += garbage[i].length();
        if (garbage[i].indexOf('M') >= 0) lastM = i;
        if (garbage[i].indexOf('P') >= 0) lastP = i;
        if (garbage[i].indexOf('G') >= 0) lastG = i;
    }
    int[] pre = new int[garbage.length];
    for (int i = 1; i < garbage.length; i++) pre[i] = pre[i - 1] + travel[i - 1];
    return total + pre[lastM] + pre[lastP] + pre[lastG];
}
```

| Approach | Time | Space |
|---|---|---|
| Last index + prefix | O(total length) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the last house?</summary>

Beyond it the truck has nothing to collect.

</details>


<details><summary>Do trucks wait for each other?</summary>

No, only total minutes are summed.

</details>


## Connected
- [Find Pivot Index](Find%20Pivot%20Index.md)
