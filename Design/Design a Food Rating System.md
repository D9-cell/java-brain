---
topic: Design
pattern: [HashMap + TreeSet]
source: LeetCode 2353
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design a Food Rating System

> [!TIP]
> **🧠 Memory hook**
> A leaderboard per cuisine; always read the top line.
> **Mantra: TREESET (rating ↓, name ↑) PER CUISINE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=4) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
changeRating(food, r) and highestRated(cuisine) (ties: lexicographically smaller name).

## Key insight
Per cuisine a TreeSet ordered by (rating desc, name asc). To change a rating: remove, update, re-add.

## Approach: TreeSet per cuisine
```java
// Per cuisine a TreeSet ordered by (rating desc, name asc); maps for food → rating / cuisine
static class FoodRatings {
    private final Map<String, Integer> rating = new HashMap<>();
    private final Map<String, String> cuisineOf = new HashMap<>();
    private final Map<String, TreeSet<String>> byCuisine = new HashMap<>();

    // Builds all maps; the comparator reads the live rating map
    FoodRatings(String[] foods, String[] cuisines, int[] ratings) {
        for (int i = 0; i < foods.length; i++) {
            rating.put(foods[i], ratings[i]);
            cuisineOf.put(foods[i], cuisines[i]);
        }
        for (int i = 0; i < foods.length; i++)
            byCuisine.computeIfAbsent(cuisines[i], c -> new TreeSet<>((a, b) -> {
                int ra = rating.get(a), rb = rating.get(b);
                return ra != rb ? Integer.compare(rb, ra) : a.compareTo(b);
            })).add(foods[i]);
    }

    // Remove with the old rating, update, re-insert with the new one
    public void changeRating(String food, int newRating) {
        TreeSet<String> set = byCuisine.get(cuisineOf.get(food));
        set.remove(food);
        rating.put(food, newRating);
        set.add(food);
    }

    // First element of the cuisine's set
    public String highestRated(String cuisine) { return byCuisine.get(cuisine).first(); }
}
```

| Approach | Time | Space |
|---|---|---|
| TreeSet per cuisine | O(log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>The trap?</summary>

Changing the rating before removing breaks the TreeSet lookup.

</details>


## Connected
- [Design Task Manager](Design%20Task%20Manager.md)
