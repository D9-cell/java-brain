---
topic: Primes Divisors and Remainders
pattern: [Prime score, Monotonic stack, Greedy]
source: LeetCode 2818
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Apply Operations to Maximize Score

> [!TIP]
> **🧠 Memory hook**
> Element i is picked in **(i − left) · (right − i)** subarrays (its prime score wins there). Spend k on the **largest values first**.
> **Mantra: score = #distinct primes · left/right by stack · sort by value desc · result *= v^min(cnt, k)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Primes%20Divisors%20and%20Remainders/Primes%20Divisors%20and%20Remainders%20Animations.html#p=8) · **Pattern hub:** [Primes Divisors and Remainders - Pattern Map](Primes%20Divisors%20and%20Remainders%20-%20Pattern%20Map.md)

## Problem
Start with score 1. Up to k times, choose an unused subarray, take the element with the highest prime score (number of distinct prime factors; leftmost on ties) and multiply the score by it. Return the maximum score mod 1e9+7.

## Key insight
Each subarray contributes exactly one element, so the problem is how many subarrays each element wins. Its range is bounded by the nearest left score ≥ its own and nearest right score strictly greater (the leftmost-tie rule). Greedy: multiply by the biggest numbers as many times as allowed, using fast power for repeats.

## Approach: Stack ranges + greedy
```java
// Each nums[i] wins every subarray where it has the top prime score; take the biggest values first
public int maximumScore(List<Integer> nums, int k) {
    int n = nums.size();
    int[] score = new int[n];
    for (int i = 0; i < n; i++) score[i] = distinctPrimes(nums.get(i));
    int[] left = new int[n], right = new int[n];
    Deque<Integer> st = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        while (!st.isEmpty() && score[st.peek()] < score[i]) st.pop();
        left[i] = st.isEmpty() ? -1 : st.peek();
        st.push(i);
    }
    st.clear();
    for (int i = n - 1; i >= 0; i--) {
        while (!st.isEmpty() && score[st.peek()] <= score[i]) st.pop();
        right[i] = st.isEmpty() ? n : st.peek();
        st.push(i);
    }
    Integer[] order = new Integer[n];
    for (int i = 0; i < n; i++) order[i] = i;
    Arrays.sort(order, (a, b) -> nums.get(b) - nums.get(a));
    long result = 1, remaining = k;
    for (int i : order) {
        if (remaining == 0) break;
        long count = (long) (i - left[i]) * (right[i] - i);
        long use = Math.min(count, remaining);
        result = result * power(nums.get(i), use) % MOD;
        remaining -= use;
    }
    return (int) result;
}

// Number of distinct prime factors
int distinctPrimes(int x) {
    int c = 0;
    for (int p = 2; p * p <= x; p++) {
        if (x % p != 0) continue;
        c++;
        while (x % p == 0) x /= p;
    }
    return x > 1 ? c + 1 : c;
}

// Binary exponentiation under the modulus
long power(long b, long e) {
    long r = 1;
    b %= MOD;
    while (e > 0) {
        if ((e & 1) == 1) r = r * b % MOD;
        b = b * b % MOD;
        e >>= 1;
    }
    return r;
}
```

| Approach | Time | Space |
|---|---|---|
| Stack ranges + greedy | O(n √V + n log n) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why ≥ on the left but > on the right?</summary>

On a tie the leftmost element wins, so equal scores block only from the left.

</details>


<details><summary>Why fast power?</summary>

One value may be used up to about n²/4 times.

</details>


## Connected
- [Prime Factors](Prime%20Factors.md)
- [Sum of Subarray Minimums](../../Stack/Sum%20of%20Subarray%20Minimums.md)
