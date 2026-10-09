---
topic: Heap
pattern: [Ranking with bubbling]
source: GFG
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, heap]
---
# Top k numbers in a stream

> [!TIP]
> **🧠 Memory hook**
> A live chart where only the song just played can move up.
> **Mantra: RANKED ARRAY OF k+1, BUBBLE THE NEW ONE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Heap/Heap%20Animations.html#p=28) · **Pattern hub:** [Heap - Pattern Map](Heap%20-%20Pattern%20Map.md)

## Problem
After each arriving number, output the top k numbers by frequency (ties: smaller number first).

## Key insight
Keep a ranked array of size k+1; insert/update the arriving number and bubble it left while it beats its neighbour.

## Approach: Ranked array
```java
// After each arrival keep the k+1 best in a small array (insertion-style bubbling, like the C++ Approach 1)
public List<List<Integer>> kTop(int[] a, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    int[] top = new int[k + 1];
    int size = 0;
    List<List<Integer>> res = new ArrayList<>();
    for (int x : a) {
        freq.merge(x, 1, Integer::sum);
        int pos = -1;
        for (int i = 0; i < size; i++) if (top[i] == x) pos = i;
        if (pos == -1) { pos = Math.min(size, k); top[pos] = x; if (size < k) size++; else size = k + 1; }
        for (int i = pos; i > 0; i--) {
            int fa = freq.get(top[i - 1]), fb = freq.get(top[i]);
            if (fb > fa || (fb == fa && top[i] < top[i - 1])) { int t = top[i]; top[i] = top[i - 1]; top[i - 1] = t; } else break;
        }
        if (size > k) size = k;
        List<Integer> row = new ArrayList<>();
        for (int i = 0; i < size; i++) row.add(top[i]);
        res.add(row);
    }
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Ranked array | O(n·k) | O(k + distinct) |

> [!WARNING]
> **Java gotcha**
> Verified against re-ranking from scratch after every arrival.

## Recall before you reveal
<details><summary>Tie rule?</summary>

Smaller number ranks higher.

</details>

