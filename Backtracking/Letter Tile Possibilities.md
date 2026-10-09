---
topic: Backtracking
pattern: [Permutations with counts]
source: LeetCode 1079
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Letter Tile Possibilities

> [!TIP]
> **🧠 Memory hook**
> A bag of Scrabble tiles; equal tiles are one choice.
> **Mantra: COUNTS, EACH NODE = 1 SEQUENCE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=12) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Number of distinct non-empty sequences from the tiles.

## Key insight
Branch over distinct letters with remaining count; every node is one sequence.

## Approach 1: Set of strings
```java
// Approach 1: build sequences with a used[] array and collect them in a set
private void collect(char[] t, boolean[] used, StringBuilder cur, Set<String> out) {
    for (int i = 0; i < t.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        cur.append(t[i]);
        out.add(cur.toString());
        collect(t, used, cur, out);
        cur.deleteCharAt(cur.length() - 1);
        used[i] = false;
    }
}

// Set-based entry point
public int numTilePossibilitiesSet(String tiles) {
    Set<String> out = new HashSet<>();
    collect(tiles.toCharArray(), new boolean[tiles.length()], new StringBuilder(), out);
    return out.size();
}
```

## Approach 2: Count array
```java
// Approach 2: work on letter COUNTS: each distinct letter is one branch, so duplicates never arise
private int count(int[] cnt) {
    int total = 0;
    for (int c = 0; c < 26; c++) {
        if (cnt[c] == 0) continue;
        cnt[c]--;
        total += 1 + count(cnt);
        cnt[c]++;
    }
    return total;
}

// Count-based entry point
public int numTilePossibilities(String tiles) {
    int[] cnt = new int[26];
    for (char c : tiles.toCharArray()) cnt[c - 'A']++;
    return count(cnt);
}
```

| Approach | Time | Space |
|---|---|---|
| Set of strings | O(n!·n) | O(n!·n) |
| Count array | O(n!) | O(26) |

> [!WARNING]
> **Java gotcha**
> Count and set versions agree on random tile sets.

## Recall before you reveal
<details><summary>Why no duplicates?</summary>

Equal letters are one branch.

</details>

