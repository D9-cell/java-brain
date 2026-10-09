---
topic: Sorting and Matching
pattern: [Max-heap by marginal gain]
source: LeetCode 1792
difficulty: Medium
review_stage: 0
next_review: 2026-10-09
tags: [java-brain, greedy]
---
# Maximum Average Pass Ratio

> [!TIP]
> **🧠 Memory hook**
> Each extra student goes where the **ratio jumps the most**.
> **Mantra: HEAP KEYED BY (p+1)/(t+1) − p/t**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Greedy/Sorting%20and%20Matching/Sorting%20and%20Matching%20Animations.html#p=22) · **Pattern hub:** [Sorting and Matching - Pattern Map](Sorting%20and%20Matching%20-%20Pattern%20Map.md)

## Problem
Each class has `pass` and `total`. Assign `extraStudents` students (who all pass) to maximise the average pass ratio.

## Key insight
The gain from one more passing student is `(p+1)/(t+1) - p/t` and shrinks as the class grows (diminishing returns), so a max-heap on the gain, re-inserted after every assignment, is optimal.

## Approach: Max-heap
```java
// Each extra student goes to the class whose pass ratio gains the most; a max-heap keyed by the gain does that in log n
public double maxAverageRatio(int[][] classes, int extraStudents) {
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Double.compare(gain(b), gain(a)));
    for (int[] c : classes) pq.add(new int[]{c[0], c[1]});
    while (extraStudents-- > 0) {
        int[] c = pq.poll();
        c[0]++;
        c[1]++;
        pq.add(c);
    }
    double sum = 0;
    for (int[] c : pq) sum += (double) c[0] / c[1];
    return sum / classes.length;
}

// Ratio gain from adding one passing student
private static double gain(int[] c) { return (double) (c[0] + 1) / (c[1] + 1) - (double) c[0] / c[1]; }
```

| Approach | Time | Space |
|---|---|---|
| Max-heap | O((n + e) log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against an exhaustive search on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why re-insert after each student?</summary>

The gain of that class changes after the update.

</details>


## Connected
- [Maximum Performance of a Team](Maximum%20Performance%20of%20a%20Team.md)
