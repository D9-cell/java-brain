---
topic: Search on the Answer Distances and K-th Values
pattern: [Search on the answer, TreeMap greedy]
source: LeetCode 2071
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, arrays]
---
# Maximum Number of Tasks You Can Assign

> [!TIP]
> **🧠 Memory hook**
> If k tasks are doable, use the **k easiest tasks** and **k strongest workers**. Check from the hardest task: a strong enough worker takes it, else the **weakest worker that can with a pill**.
> **Mantra: k tasks vs k workers · hardest first · strongest ≥ need → use · ELSE ceiling(need − strength) with a pill**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Arrays/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values/Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20Animations.html#p=5) · **Pattern hub:** [Search on the Answer Distances and K-th Values - Pattern Map](Search%20on%20the%20Answer%20Distances%20and%20K-th%20Values%20-%20Pattern%20Map.md)

## Problem
Each worker can do one task if strength ≥ requirement; pills add strength to at most pills workers. Return the maximum number of tasks completed.

## Key insight
Monotonic: doable k implies doable k − 1. In the check, the hardest task without a pill should go to the strongest worker; if a pill is needed, wasting the weakest sufficient worker keeps strong ones for later.

## Approach: Binary search + TreeMap
```java
// Largest k: the k easiest tasks against the k strongest workers, checked greedily with pills
public int maxTaskAssign(int[] tasks, int[] workers, int pills, int strength) {
    Arrays.sort(tasks);
    Arrays.sort(workers);
    int lo = 0, hi = Math.min(tasks.length, workers.length);
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        if (canDo(tasks, workers, pills, strength, mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}

// Hardest task first: a strong enough worker takes it, otherwise the weakest worker that can with a pill
boolean canDo(int[] tasks, int[] workers, int pills, int strength, int k) {
    TreeMap<Integer, Integer> pool = new TreeMap<>();
    for (int i = workers.length - k; i < workers.length; i++) pool.merge(workers[i], 1, Integer::sum);
    for (int t = k - 1; t >= 0; t--) {
        int need = tasks[t];
        int strongest = pool.lastKey();
        if (strongest >= need) {
            remove(pool, strongest);
            continue;
        }
        if (pills == 0) return false;
        Integer w = pool.ceilingKey(need - strength);
        if (w == null) return false;
        remove(pool, w);
        pills--;
    }
    return true;
}

// Removes one worker with this strength
void remove(TreeMap<Integer, Integer> pool, int key) {
    if (pool.merge(key, -1, Integer::sum) == 0) pool.remove(key);
}
```

| Approach | Time | Space |
|---|---|---|
| Binary search + TreeMap | O(n log² n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why the weakest worker for a pill?</summary>

Strong workers are more useful without pills.

</details>


<details><summary>Why the k strongest workers?</summary>

Weaker workers never help more.

</details>


## Connected
- [Avoid Flood in The City](../Rotated%20Arrays%20and%20Sorted%20Queries/Avoid%20Flood%20in%20The%20City.md)
