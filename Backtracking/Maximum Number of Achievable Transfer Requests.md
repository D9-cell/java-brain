---
topic: Backtracking
pattern: [Take/skip subsets]
source: LeetCode 1601
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, backtracking]
---
# Maximum Number of Achievable Transfer Requests

> [!TIP]
> **🧠 Memory hook**
> A moving company: accept a set of moves where every building ends balanced.
> **Mantra: TAKE/SKIP, NET[] == 0 AT THE END**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Backtracking/Backtracking%20Animations.html#p=15) · **Pattern hub:** [Backtracking - Pattern Map](Backtracking%20-%20Pattern%20Map.md)

## Problem
Maximum number of requests such that every building's net change is zero.

## Key insight
Only 16 requests: try every subset with an incremental net[] array.

## Approach: Take/skip
```java
// Take or skip each request; at the end every building's net change must be zero
private void solve(int[][] req, int i, int taken, int[] net) {
    if (i == req.length) {
        for (int x : net) if (x != 0) return;
        best = Math.max(best, taken);
        return;
    }
    net[req[i][0]]--;
    net[req[i][1]]++;
    solve(req, i + 1, taken + 1, net);
    net[req[i][0]]++;
    net[req[i][1]]--;
    solve(req, i + 1, taken, net);
}

// Entry point
public int maximumRequests(int n, int[][] requests) {
    best = 0;
    solve(requests, 0, 0, new int[n]);
    return best;
}
```

| Approach | Time | Space |
|---|---|---|
| Take/skip | O(2^r · n) | O(n) |

## Recall before you reveal
<details><summary>Bitmask alternative?</summary>

Loop over masks from most bits down.

</details>

