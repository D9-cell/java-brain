---
topic: Primes Divisors and Remainders
pattern: [Count by multiples, Prefix + binary search]
source: LeetCode 3312
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Sorted GCD Pair Queries

> [!TIP]
> **🧠 Memory hook**
> Pairs with gcd **exactly g** = pairs among multiples of g − pairs with gcd 2g, 3g, …. Then prefix sums + binary search.
> **Mantra: c = #multiples of g · exact[g] = C(c,2) − Σ exact[kg] · prefix · lower bound**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=7) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
Sort the gcds of all pairs nums[i], nums[j] (i < j). For each query q return the value at index q of that sorted list.

## Key insight
Count multiples of g from a frequency table; every such pair has gcd that is a multiple of g. Going from the largest g down, subtract the exact counts of larger multiples. The sorted gcd list is then described by prefix counts, and query q is the first g whose prefix exceeds q.

## Approach: Multiples + inclusion
```java
// exact[g] = pairs with gcd exactly g, from multiples count minus larger multiples of g
public int[] gcdValues(int[] nums, long[] queries) {
    int max = 0;
    for (int x : nums) max = Math.max(max, x);
    int[] freq = new int[max + 1];
    for (int x : nums) freq[x]++;
    long[] exact = new long[max + 1];
    for (int g = max; g >= 1; g--) {
        long multiples = 0;
        for (int m = g; m <= max; m += g) multiples += freq[m];
        exact[g] = multiples * (multiples - 1) / 2;
        for (int m = 2 * g; m <= max; m += g) exact[g] -= exact[m];
    }
    long[] prefix = new long[max + 1];
    for (int g = 1; g <= max; g++) prefix[g] = prefix[g - 1] + exact[g];
    int[] ans = new int[queries.length];
    for (int i = 0; i < queries.length; i++) {
        int lo = 1, hi = max;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (prefix[mid] > queries[i]) hi = mid;
            else lo = mid + 1;
        }
        ans[i] = lo;
    }
    return ans;
}
```

| Approach | Time | Space |
|---|---|---|
| Multiples + inclusion | O(M log M + q log M) | O(M) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why go from large g to small?</summary>

exact[2g], exact[3g], … must already be final.

</details>


<details><summary>Cost of the multiples loops?</summary>

M/1 + M/2 + … = O(M log M), the harmonic sum.

</details>


## Connected
- [Kth Smallest Amount With Single Denomination Combination](Kth%20Smallest%20Amount%20With%20Single%20Denomination%20Combination.md)
- [GCD of Odd and Even Sums](GCD%20of%20Odd%20and%20Even%20Sums.md)
