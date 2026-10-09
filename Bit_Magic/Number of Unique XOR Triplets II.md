---
topic: Bit Magic
pattern: [Pairs then triplets]
source: LeetCode 3514
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, bit-magic]
---
# Number of Unique XOR Triplets II

> [!TIP]
> **🧠 Memory hook**
> Pairs first, then add a third, in boolean arrays.
> **Mantra: PAIR XORS → TRIPLET XORS, SIZE T**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Bit_Magic/Bit%20Magic%20Animations.html#p=41) · **Pattern hub:** [Bit Magic - Pattern Map](Bit%20Magic%20-%20Pattern%20Map.md)

## Problem
Distinct XORs of triplets (i ≤ j ≤ k) for arbitrary values ≤ 1500.

## Key insight
Collect all pair XORs, then XOR each with every number. Values stay below the next power of two T.

## Approach 1: HashSets
```java
// Approach 1: set of pair XORs (i ≤ j), then XOR each with every number (HashSet: slow in Java)
public int uniqueXorTripletsSet(int[] nums) {
    Set<Integer> pairs = new HashSet<>(), trip = new HashSet<>();
    for (int i = 0; i < nums.length; i++) for (int j = i; j < nums.length; j++) pairs.add(nums[i] ^ nums[j]);
    for (int p : pairs) for (int x : nums) trip.add(p ^ x);
    return trip.size();
}
```

## Approach 2: Boolean arrays
```java
// Approach 2: boolean arrays sized to the next power of two above max (XORs never exceed it)
public int uniqueXorTriplets(int[] nums) {
    int max = 0;
    for (int x : nums) max = Math.max(max, x);
    int T = 1;
    while (T <= max) T <<= 1;
    boolean[] pair = new boolean[T], trip = new boolean[T];
    for (int i = 0; i < nums.length; i++) for (int j = i; j < nums.length; j++) pair[nums[i] ^ nums[j]] = true;
    for (int v = 0; v < T; v++) if (pair[v]) for (int x : nums) trip[v ^ x] = true;
    int cnt = 0;
    for (boolean b : trip) if (b) cnt++;
    return cnt;
}
```

| Approach | Time | Space |
|---|---|---|
| HashSets | O(n² + T·n) | O(T) |
| Boolean arrays | O(n² + T·n) | O(T) |

> [!WARNING]
> **Java gotcha**
> Verified against O(n³).

## Recall before you reveal
<details><summary>Why arrays?</summary>

HashSet TLEs in Java.

</details>


## Connected
- [Number of Unique XOR Triplets I](Number%20of%20Unique%20XOR%20Triplets%20I.md)
