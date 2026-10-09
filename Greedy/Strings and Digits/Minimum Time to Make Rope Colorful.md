---
topic: Strings and Digits
pattern: [Runs, Keep the most expensive]
source: LeetCode 1578
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Minimum Time to Make Rope Colorful

> [!TIP]
> **🧠 Memory hook**
> In every run of the same colour **keep the dearest balloon**, pop the rest.
> **Mantra: RUN COST = SUM − MAX**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Strings%20and%20Digits/Strings%20and%20Digits%20Animations.html#p=14) · **Pattern hub:** [Strings and Digits - Pattern Map](Strings%20and%20Digits%20-%20Pattern%20Map.md)

## Problem
Remove balloons so that no two adjacent balloons have the same colour. Each removal costs `neededTime[i]`. Return the minimum total time.

## Key insight
Within a run of equal colours only one balloon may stay; keeping the most expensive minimises the cost. Running version: pay `min(prevMax, current)` and keep `prevMax = max(prevMax, current)`.

## Approach 1: Running max
```java
// In every run of equal colours keep the most expensive balloon: pay the sum of the run minus its maximum
public int minCost(String colors, int[] neededTime) {
    int time = 0, prevMax = 0;
    for (int i = 0; i < colors.length(); i++) {
        if (i > 0 && colors.charAt(i) != colors.charAt(i - 1)) prevMax = 0;
        time += Math.min(prevMax, neededTime[i]);
        prevMax = Math.max(prevMax, neededTime[i]);
    }
    return time;
}
```

## Approach 2: Stack
```java
// Stack version: compare each balloon with the kept one on top and drop the cheaper
public int minCostStack(String s, int[] cost) {
    Deque<int[]> st = new ArrayDeque<>();
    int price = 0;
    for (int i = 0; i < s.length(); i++) {
        if (st.isEmpty() || st.peek()[0] != s.charAt(i)) st.push(new int[]{s.charAt(i), cost[i]});
        else {
            price += Math.min(st.peek()[1], cost[i]);
            if (st.peek()[1] < cost[i]) { st.pop(); st.push(new int[]{s.charAt(i), cost[i]}); }
        }
    }
    return price;
}
```

| Approach | Time | Space |
|---|---|---|
| Running max | O(n) | O(1) |
| Stack | O(n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Same as "Minimum Deletion Cost to Avoid Repeating Letters"?</summary>

Yes, it is the same problem; both of its solutions are shown here.

</details>


## Connected
- [Minimum Deletions to Make Character Frequencies Unique](Minimum%20Deletions%20to%20Make%20Character%20Frequencies%20Unique.md)
