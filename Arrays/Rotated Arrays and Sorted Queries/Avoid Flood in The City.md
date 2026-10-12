---
topic: Rotated Arrays and Sorted Queries
pattern: [TreeSet ceiling, Greedy]
source: LeetCode 1488
difficulty: Medium
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Avoid Flood in The City

> [!TIP]
> **🧠 Memory hook**
> When a full lake gets rain again, dry it on the **first free dry day after its last rain** (TreeSet.ceiling). No such day → impossible.
> **Mantra: rain on full lake → day = dry.ceiling(last[lake]) · none → [] · ans[day] = lake**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Rotated%20Arrays%20and%20Sorted%20Queries/Rotated%20Arrays%20and%20Sorted%20Queries%20Animations.html#p=11) · **Pattern hub:** [Rotated Arrays and Sorted Queries - Pattern Map](Rotated%20Arrays%20and%20Sorted%20Queries%20-%20Pattern%20Map.md)

## Problem
rains[i] > 0 fills lake rains[i]; rains[i] == 0 lets you dry one lake. Avoid any lake getting rain while full. Return a plan (-1 on rain days) or an empty array.

## Key insight
Delaying the decision is the key: dry days are kept unused until a flood threat appears. Taking the earliest suitable dry day leaves later ones for later threats.

## Approach: Greedy with TreeSet
```java
// When a full lake gets rain again, dry it on the first free dry day after its last rain
public int[] avoidFlood(int[] rains) {
    int n = rains.length;
    int[] ans = new int[n];
    Map<Integer, Integer> lastRain = new HashMap<>();
    TreeSet<Integer> dryDays = new TreeSet<>();
    for (int i = 0; i < n; i++) {
        if (rains[i] == 0) {
            dryDays.add(i);
            ans[i] = 1;
            continue;
        }
        int lake = rains[i];
        ans[i] = -1;
        if (lastRain.containsKey(lake)) {
            Integer day = dryDays.ceiling(lastRain.get(lake));
            if (day == null) return new int[0];
            ans[day] = lake;
            dryDays.remove(day);
        }
        lastRain.put(lake, i);
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Greedy with TreeSet | O(n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked by replaying the plan and against an exhaustive search on short inputs.

## Recall before you reveal
<details><summary>Why the earliest valid dry day?</summary>

Later dry days are more useful for future threats.

</details>


<details><summary>What do unused dry days dry?</summary>

Any lake, e.g. lake 1.

</details>


## Connected
- [Most Profit Assigning Work](Most%20Profit%20Assigning%20Work.md)
