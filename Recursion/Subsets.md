---
topic: Recursion
pattern: [Backtracking, Take / skip]
source: LeetCode 78
difficulty: Medium
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Subsets

> [!TIP]
> **🧠 Memory hook**
> A buffet line: take or skip each dish; every path to the end is a plate.
> **Mantra: TAKE → RECURSE → UNDO → SKIP → RECURSE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=2) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Return all subsets of distinct integers.

## Key insight
Binary decision per element; leaves = subsets.

## Approach: Take/skip backtracking
```java
// At each index: take it, recurse, undo; then skip it and recurse
private void solve(int[] nums, int idx, List<Integer> temp) {
    if (idx == nums.length) {
        result.add(new ArrayList<>(temp));
        return;
    }
    temp.add(nums[idx]);
    solve(nums, idx + 1, temp);
    temp.remove(temp.size() - 1);
    solve(nums, idx + 1, temp);
}

// Returns all 2^n subsets
public List<List<Integer>> subsets(int[] nums) {
    solve(nums, 0, new ArrayList<>());
    return result;
}
```

| Approach | Time | Space |
|---|---|---|
| Take/skip backtracking | O(n·2^n) | O(n) stack |

## Recall before you reveal
<details><summary>Why `new ArrayList<>(temp)`?</summary>

temp is mutated later.

</details>


<details><summary>Bitmask alternative?</summary>

for mask in 0..2^n−1 take bit i.

</details>


## Connected
- [Power Set](Power%20Set.md)
- Bit_Magic folder
