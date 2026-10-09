---
topic: Design
pattern: [HashMap + TreeSets]
source: LeetCode 1912
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design Movie Rental System

> [!TIP]
> **🧠 Memory hook**
> Two sorted display shelves: "in store" per movie and "on loan" for everyone.
> **Mantra: available[movie] + rented: TreeSets**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=11) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
search(movie): 5 cheapest unrented shops; rent; drop; report(): 5 cheapest rented (shop, movie).

## Key insight
available[movie] = TreeSet of (price, shop); rented = TreeSet of (price, shop, movie); a (shop, movie) → price map rebuilds exact elements.

## Approach: TreeSets
```java
// Per movie: unrented shops ordered by (price, shop). Globally: rented copies ordered by (price, shop, movie)
static class MovieRentingSystem {
    private final Map<Long, Integer> price = new HashMap<>();
    private final Map<Integer, TreeSet<int[]>> available = new HashMap<>();
    private final TreeSet<int[]> rented = new TreeSet<>((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] != b[1] ? a[1] - b[1] : a[2] - b[2]);

    // Key for (shop, movie)
    private static long key(int shop, int movie) { return (long) shop << 32 | movie; }

    // Loads every entry as available
    MovieRentingSystem(int n, int[][] entries) {
        for (int[] e : entries) {
            price.put(key(e[0], e[1]), e[2]);
            available.computeIfAbsent(e[1], m -> new TreeSet<>((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1])).add(new int[]{e[2], e[0]});
        }
    }

    // First 5 shops of the movie's available set
    public List<Integer> search(int movie) {
        List<Integer> res = new ArrayList<>();
        TreeSet<int[]> shops = available.get(movie);
        if (shops == null) return res;
        for (int[] p : shops) { if (res.size() == 5) break; res.add(p[1]); }
        return res;
    }

    // Move a copy from available to rented
    public void rent(int shop, int movie) {
        int p = price.get(key(shop, movie));
        available.get(movie).remove(new int[]{p, shop});
        rented.add(new int[]{p, shop, movie});
    }

    // Move it back
    public void drop(int shop, int movie) {
        int p = price.get(key(shop, movie));
        rented.remove(new int[]{p, shop, movie});
        available.get(movie).add(new int[]{p, shop});
    }

    // First 5 rented copies as [shop, movie]
    public List<List<Integer>> report() {
        List<List<Integer>> res = new ArrayList<>();
        for (int[] x : rented) { if (res.size() == 5) break; res.add(List.of(x[1], x[2])); }
        return res;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| TreeSets | O(log n) per op | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified with thousands of random operations against a simple reference model when it was written.

## Recall before you reveal
<details><summary>Composite key in Java?</summary>

(long) shop << 32 | movie.

</details>

