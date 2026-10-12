---
topic: Counting and Modular Combinatorics
pattern: [Interleavings, Pascal]
source: LeetCode 1569
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Number of Ways to Reorder Array to Get Same BST

> [!TIP]
> **🧠 Memory hook**
> The root goes first. Left and right subtrees only need their **own relative order**, so interleave them: **C(n − 1, |left|)**.
> **Mantra: ways(list) = C(n−1, |L|) · ways(L) · ways(R) · RETURN ways − 1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=5) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
nums is a permutation of 1..n inserted into an empty BST. Count the other orderings that produce the identical BST, mod 1e9+7.

## Key insight
Any order that keeps the root first and preserves the relative order inside each subtree (recursively) works. Choosing positions for the left elements among the n − 1 slots is C(n − 1, |left|). Subtract 1 for the original order.

## Approach: Recursive split + Pascal
```java
// Root first, then any interleaving of the left and right subsequences; minus the original order
public int numOfWays(int[] nums) {
    int n = nums.length;
    C = new long[n + 1][n + 1];
    for (int i = 0; i <= n; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++) C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
    }
    List<Integer> all = new ArrayList<>();
    for (int x : nums) all.add(x);
    return (int) ((ways(all) - 1 + MOD) % MOD);
}

// Orders of this list that build the same BST
long ways(List<Integer> list) {
    if (list.size() <= 2) return 1;
    int root = list.get(0);
    List<Integer> left = new ArrayList<>(), right = new ArrayList<>();
    for (int i = 1; i < list.size(); i++) (list.get(i) < root ? left : right).add(list.get(i));
    return C[list.size() - 1][left.size()] * ways(left) % MOD * ways(right) % MOD;
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive split + Pascal | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why subtract one?</summary>

The question asks for other orderings.

</details>


<details><summary>Why Pascal and not factorials?</summary>

n ≤ 1000, a table is simple and needs no inverses.

</details>


## Connected
- [Count the Number of Ideal Arrays](Count%20the%20Number%20of%20Ideal%20Arrays.md)
