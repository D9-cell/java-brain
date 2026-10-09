---
topic: Sorting and Matching
pattern: [Sort + two pointers, Pair heaviest with lightest]
source: LeetCode 881
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Boats to Save People

> [!TIP]
> **🧠 Memory hook**
> The heaviest person needs a boat anyway: **offer the seat to the lightest**.
> **Mantra: HEAVIEST ALWAYS RIDES, LIGHTEST JOINS IF IT FITS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=1) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
A boat carries at most two people and at most `limit` weight. Return the minimum number of boats.

## Key insight
Sort. For the heaviest remaining person, if the lightest fits too they share; otherwise the heaviest goes alone. Each step uses one boat.

## Approach 1: Sort + two pointers
```java
// Sort; the heaviest person always takes a boat, and the lightest joins when the two fit together
public int numRescueBoats(int[] people, int limit) {
    Arrays.sort(people);
    int boats = 0;
    for (int lo = 0, hi = people.length - 1; lo <= hi; hi--) {
        if (people[lo] + people[hi] <= limit) lo++;
        boats++;
    }
    return boats;
}
```

## Approach 2: Counting sort
```java
// Counting version for small weights: no sort, walk the weight histogram from both ends
public int numRescueBoatsCounting(int[] people, int limit) {
    int[] cnt = new int[limit + 1];
    for (int p : people) cnt[p]++;
    int boats = 0;
    for (int lo = 1, hi = limit; lo <= hi; ) {
        while (lo <= hi && cnt[lo] == 0) lo++;
        while (hi >= lo && cnt[hi] == 0) hi--;
        if (lo > hi) break;
        if (lo == hi) { boats += 2 * lo <= limit ? (cnt[lo] + 1) / 2 : cnt[lo]; break; }
        cnt[hi]--;
        if (lo + hi <= limit) cnt[lo]--;
        boats++;
    }
    return boats;
}
```

| Approach | Time | Space |
|---|---|---|
| Sort + two pointers | O(n log n) | O(1) |
| Counting sort | O(n + limit) | O(limit) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is pairing with the lightest optimal?</summary>

If the lightest does not fit with the heaviest, nobody does.

</details>


## Connected
- [Bag of Tokens](Bag%20of%20Tokens.md)
- [Two City Scheduling](Two%20City%20Scheduling.md)
