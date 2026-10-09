---
topic: Sorting and Matching
pattern: [Sort, Cheapest first]
source: LeetCode 1833
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Ice Cream Bars

> [!TIP]
> **🧠 Memory hook**
> You want the **most bars**, not the best bars: buy the cheapest.
> **Mantra: SORT COSTS, BUY UNTIL BROKE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=7) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Return the maximum number of ice cream bars you can buy with `coins`.

## Key insight
Sort the prices and buy from the cheapest. A counting sort works when prices are small.

## Approach 1: Sort
```java
// Sort and buy the cheapest bars first
public int maxIceCream(int[] costs, int coins) {
    Arrays.sort(costs);
    int bars = 0;
    for (int c : costs) {
        if (coins < c) break;
        coins -= c;
        bars++;
    }
    return bars;
}
```

## Approach 2: Counting sort
```java
// Counting sort over the price range: buy as many bars of the cheapest price as the coins allow
public int maxIceCreamCounting(int[] costs, int coins) {
    int max = 0;
    for (int c : costs) max = Math.max(max, c);
    int[] cnt = new int[max + 1];
    for (int c : costs) cnt[c]++;
    int bars = 0;
    for (int price = 1; price <= max && coins >= price; price++) {
        int take = Math.min(cnt[price], coins / price);
        bars += take;
        coins -= take * price;
    }
    return bars;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort | O(n log n) | O(1) |
| Counting sort | O(n + max) | O(max) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why does counting sort help?</summary>

Prices up to 1e5 allow an O(n + max) pass without comparison sorting.

</details>


## Connected
- [Maximum Bags With Full Capacity of Rocks](Maximum%20Bags%20With%20Full%20Capacity%20of%20Rocks.md)
- [Maximum Number of Integers to Choose From a Range I](Maximum%20Number%20of%20Integers%20to%20Choose%20From%20a%20Range%20I.md)
