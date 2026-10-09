---
topic: Palindromes and Word Splits
pattern: [Choose counts, then arrange, Multinomials]
source: LeetCode 3343
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Count Number of Balanced Permutations

> [!TIP]
> **🧠 Memory hook**
> First decide **how many of each digit go to even slots**; arranging inside each half is then just factorials.
> **Mantra: dp[used][sum] += dp · 1/(e! (cnt − e)!) · ANSWER × E! × O!**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Palindromes%20and%20Word%20Splits/Palindromes%20and%20Word%20Splits%20Animations.html#p=11) · **Pattern hub:** [Palindromes and Word Splits - Pattern Map](Palindromes%20and%20Word%20Splits%20-%20Pattern%20Map.md)

## Problem
Count the distinct permutations of a digit string whose digits at even indexes sum to the same as the digits at odd indexes. Answer modulo 1e9+7.

## Key insight
The total must be even and the even half must sum to total / 2 using exactly ceil(n / 2) slots. For digit d choose e copies for even slots; the number of distinct arrangements is E! / Π e_d! × O! / Π (cnt_d − e_d)!. A DP over digits with (slots used, sum) collects Π of the inverse factorials.

## Approach: Digit-count DP
```java
// Decide how many copies of each digit go to even slots; count arrangements with factorials
public int countBalancedPermutations(String num) {
    int n = num.length(), total = 0;
    int[] cnt = new int[10];
    for (char c : num.toCharArray()) { cnt[c - '0']++; total += c - '0'; }
    if (total % 2 == 1) return 0;
    int half = total / 2, evenSlots = (n + 1) / 2, oddSlots = n / 2;
    long[] fact = new long[n + 1], inv = new long[n + 1];
    fact[0] = 1;
    for (int i = 1; i <= n; i++) fact[i] = fact[i - 1] * i % MOD;
    inv[n] = pow(fact[n], MOD - 2);
    for (int i = n; i > 0; i--) inv[i - 1] = inv[i] * i % MOD;
    long[][] dp = new long[evenSlots + 1][half + 1];
    dp[0][0] = 1;
    for (int d = 0; d <= 9; d++) {
        long[][] next = new long[evenSlots + 1][half + 1];
        for (int used = 0; used <= evenSlots; used++)
            for (int sum = 0; sum <= half; sum++) {
                if (dp[used][sum] == 0) continue;
                for (int e = 0; e <= cnt[d] && used + e <= evenSlots && sum + e * d <= half; e++)
                    next[used + e][sum + e * d] = (next[used + e][sum + e * d] + dp[used][sum] * inv[e] % MOD * inv[cnt[d] - e]) % MOD;
            }
        dp = next;
    }
    return (int) (dp[evenSlots][half] * fact[evenSlots] % MOD * fact[oddSlots] % MOD);
}

// Modular power
private long pow(long b, long e) {
    long r = 1;
    for (b %= MOD; e > 0; e >>= 1, b = b * b % MOD) if ((e & 1) == 1) r = r * b % MOD;
    return r;
}
```

| Approach | Time | Space |
|---|---|---|
| Digit-count DP | O(10 · n · S · max cnt) | O(n · S) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why inverse factorials?</summary>

Distinct permutations of a multiset divide by the repeat counts.

</details>


<details><summary>First check?</summary>

An odd digit total gives 0.

</details>


## Connected
- [Ways to Express an Integer as Sum of Powers](../Knapsack%20Series/Ways%20to%20Express%20an%20Integer%20as%20Sum%20of%20Powers.md)
- [K Inverse Pairs Array](../Counting%20Walks%20and%20Moves/K%20Inverse%20Pairs%20Array.md)
