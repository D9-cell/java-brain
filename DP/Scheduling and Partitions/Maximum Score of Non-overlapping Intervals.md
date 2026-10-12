---
topic: Scheduling and Partitions
pattern: [Time order, At most k picks]
source: LeetCode 3414
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Maximum Score of Non-overlapping Intervals

> [!TIP]
> **🧠 Memory hook**
> Job scheduling with a **pick limit of 4** and a **lexicographic tie-break**: store the index list next to each score.
> **Mantra: best[i][k] = better of (skip i, take i then jump to next compatible)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Scheduling%20and%20Partitions/Scheduling%20and%20Partitions%20Animations.html#p=4) · **Pattern hub:** [Scheduling and Partitions - Pattern Map](Scheduling%20and%20Partitions%20-%20Pattern%20Map.md)

## Problem
Choose at most 4 non-overlapping intervals (they overlap if they share a point) with maximum total weight. Return the lexicographically smallest array of chosen original indices.

## Key insight
Sort by start and find each interval's next compatible one by binary search. For every (position, picks left) keep the best score and, among ties, the smallest sorted index list. Taking interval i merges its original index into the list from the next state.

## Approach: Memo with index lists
```java
// best[i][k] = max weight (and smallest sorted index list) choosing at most k non-overlapping intervals from sorted position i on
public int[] maximumWeight(List<List<Integer>> intervals) {
    int n = intervals.size();
    int[][] iv = new int[n][4];
    for (int i = 0; i < n; i++) {
        iv[i] = new int[]{intervals.get(i).get(0), intervals.get(i).get(1), intervals.get(i).get(2), i};
    }
    Arrays.sort(iv, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : a[1] != b[1] ? Integer.compare(a[1], b[1]) : a[2] != b[2] ? Integer.compare(a[2], b[2]) : Integer.compare(a[3], b[3]));
    int[] next = new int[n];
    for (int i = 0; i < n; i++) {
        int lo = 0, hi = n;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (iv[mid][0] > iv[i][1]) hi = mid;
            else lo = mid + 1;
        }
        next[i] = lo;
    }
    long[][] score = new long[n + 1][5];
    List<List<List<Integer>>> pick = new ArrayList<>();
    for (int i = 0; i <= n; i++) {
        List<List<Integer>> row = new ArrayList<>();
        for (int k = 0; k <= 4; k++) row.add(new ArrayList<>());
        pick.add(row);
    }
    for (int i = n - 1; i >= 0; i--)
        for (int k = 1; k <= 4; k++) {
            long skipScore = score[i + 1][k];
            List<Integer> skipIdx = pick.get(i + 1).get(k);
            long takeScore = score[next[i]][k - 1] + iv[i][2];
            List<Integer> takeIdx = new ArrayList<>(pick.get(next[i]).get(k - 1));
            takeIdx.add(iv[i][3]);
            Collections.sort(takeIdx);
            boolean takeWins = takeScore > skipScore || (takeScore == skipScore && compare(takeIdx, skipIdx) < 0);
            score[i][k] = takeWins ? takeScore : skipScore;
            pick.get(i).set(k, takeWins ? takeIdx : skipIdx);
        }
    return pick.get(0).get(4).stream().mapToInt(Integer::intValue).toArray();
}

// Lexicographic order where a proper prefix is smaller
private int compare(List<Integer> a, List<Integer> b) {
    for (int i = 0; i < Math.min(a.size(), b.size()); i++) if (!a.get(i).equals(b.get(i))) return Integer.compare(a.get(i), b.get(i));
    return Integer.compare(a.size(), b.size());
}
```

| Approach | Time | Space |
|---|---|---|
| Memo with index lists | O(n log n + 4 n log 4) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why store lists?</summary>

Ties must be broken by the smallest list, which cannot be recovered from the score alone.

</details>


<details><summary>Why is a prefix smaller?</summary>

Fewer picks with the same score is lexicographically smaller.

</details>


## Connected
- [Maximum Profit in Job Scheduling](Maximum%20Profit%20in%20Job%20Scheduling.md)
