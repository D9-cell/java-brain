---
topic: HashSet
pattern: [Distinct positives, Boolean array]
source: LeetCode 3487
difficulty: Easy
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashset]
---
# Maximum Unique Subarray Sum After Deletion

> [!TIP]
> **🧠 Memory hook**
> At a buffet you may skip dishes: take one of each positive dish; if none, take the least bad one.
> **Mantra: DISTINCT POSITIVES, ELSE MAX NON-POSITIVE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashSet/HashSet%20Animations.html#p=10) · **Pattern hub:** [HashSet - Pattern Map](HashSet%20-%20Pattern%20Map.md)

## Problem
After deleting any elements (not all), choose a subarray with unique elements and maximum sum.

## Key insight
Deletions let you keep exactly one copy of every positive value. If no positive exists, return the maximum element.

## Approach: Seen array
```java
// Keep every distinct positive once; if there is none, the answer is the largest non-positive value
public int maxSum(int[] nums) {
    boolean[] seen = new boolean[101];
    int sum = 0, maxNonPos = Integer.MIN_VALUE;
    for (int x : nums) {
        if (x <= 0) maxNonPos = Math.max(maxNonPos, x);
        else if (!seen[x]) { seen[x] = true; sum += x; }
    }
    return sum == 0 ? maxNonPos : sum;
}
```

| Approach | Time | Space |
|---|---|---|
| Seen array | O(n) | O(101) |

## Recall before you reveal
<details><summary>Why boolean[101]?</summary>

Values are within [−100, 100].

</details>


## Connected
- [Count the Number of Consistent Strings](Count%20the%20Number%20of%20Consistent%20Strings.md)
