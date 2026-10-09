---
topic: Topological Sort
pattern: [Kahn, Named nodes]
source: LeetCode 2115
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, topological-sort]
---
# Find All Possible Recipes from Given Supplies

> [!TIP]
> **🧠 Memory hook**
> A recipe becomes available once every ingredient is on the shelf, and recipes can be ingredients too.
> **Mantra: MISSING-INGREDIENT COUNT IS THE INDEGREE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Topological%20Sort/Topological%20Sort%20Animations.html#p=6) · **Pattern hub:** [Topological Sort - Pattern Map](Topological%20Sort%20-%20Pattern%20Map.md)

## Problem
Given recipes with ingredients and initial supplies, return all recipes that can be made.

## Key insight
Treat each ingredient → recipe as an edge, with a recipe's in-degree being the number of ingredients it needs. Start the queue with the supplies; when an item is processed, lower the counts of the recipes using it, and a recipe that reaches 0 becomes available (and enters the queue).

## Approach 1: Kahn from the supplies
```java
// Topological sort: a recipe becomes available when all its ingredients are; recipes can be ingredients of other recipes
public List<String> findAllRecipesKahn(String[] recipes, List<List<String>> ingredients, String[] supplies) {
    Map<String, List<String>> usedBy = new HashMap<>();
    Map<String, Integer> missing = new HashMap<>();
    for (int i = 0; i < recipes.length; i++) {
        missing.put(recipes[i], ingredients.get(i).size());
        for (String ing : ingredients.get(i)) usedBy.computeIfAbsent(ing, k -> new ArrayList<>()).add(recipes[i]);
    }
    Queue<String> que = new ArrayDeque<>(Arrays.asList(supplies));
    List<String> result = new ArrayList<>();
    while (!que.isEmpty()) {
        String item = que.poll();
        for (String recipe : usedBy.getOrDefault(item, List.of())) {
            if (missing.merge(recipe, -1, Integer::sum) == 0) { result.add(recipe); que.add(recipe); }
        }
    }
    return result;
}
```

## Approach 2: Sweep until stable
```java
// Brute force: sweep over all recipes until nothing new becomes possible
public List<String> findAllRecipesSweep(String[] recipes, List<List<String>> ingredients, String[] supplies) {
    Set<String> have = new HashSet<>(Arrays.asList(supplies));
    List<String> result = new ArrayList<>();
    boolean[] done = new boolean[recipes.length];
    for (boolean progress = true; progress; ) {
        progress = false;
        for (int i = 0; i < recipes.length; i++) {
            if (done[i] || !have.containsAll(ingredients.get(i))) continue;
            done[i] = true;
            have.add(recipes[i]);
            result.add(recipes[i]);
            progress = true;
        }
    }
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Kahn from the supplies | O(V + E) | O(V + E) |
| Sweep until stable | O(R² · I) | O(R) |

## Recall before you reveal
<details><summary>Why start from supplies, not zero in-degree?</summary>

Supplies are available items; recipes only become available when their ingredients are.

</details>


<details><summary>What about cyclic recipes?</summary>

They never reach 0 and are never made.

</details>


## Connected
- [Course Schedule](Course%20Schedule.md)
