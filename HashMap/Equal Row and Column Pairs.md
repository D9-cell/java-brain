---
topic: HashMap
pattern: [Array as a key]
source: LeetCode 2352
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Equal Row and Column Pairs

> [!TIP]
> **🧠 Memory hook**
> A whole row is a key.
> **Mantra: COUNT ROWS BY CONTENT, LOOK UP COLUMNS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=13) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Count (row, column) pairs with identical content.

## Key insight
Store each row as a List key with its count; build each column as a list and look it up.

## Approach 1: Brute force
```java
// Approach 1: compare every row with every column
public int equalPairsBrute(int[][] g) {
    int n = g.length, c = 0;
    for (int r = 0; r < n; r++) for (int k = 0; k < n; k++) {
        boolean same = true;
        for (int i = 0; i < n && same; i++) same = g[r][i] == g[i][k];
        if (same) c++;
    }
    return c;
}
```

## Approach 2: Row map
```java
// Approach 2: count rows by their content (as a List key), then look up each column
public int equalPairs(int[][] g) {
    int n = g.length, c = 0;
    Map<List<Integer>, Integer> rows = new HashMap<>();
    for (int[] row : g) rows.merge(Arrays.stream(row).boxed().toList(), 1, Integer::sum);
    for (int k = 0; k < n; k++) {
        List<Integer> col = new ArrayList<>();
        for (int[] row : g) col.add(row[k]);
        c += rows.getOrDefault(col, 0);
    }
    return c;
}
```

| Approach | Time | Space |
|---|---|---|
| Brute force | O(n³) | O(1) |
| Row map | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force solution on hundreds of random inputs when it was written.

## Recall before you reveal
<details><summary>Why not int[] as key?</summary>

Arrays use identity equality.

</details>

