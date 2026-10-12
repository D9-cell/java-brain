---
topic: Binary Strings and Substring Counting
pattern: [Prefix balance, Residue]
source: LeetCode 2949
difficulty: Hard
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Count Beautiful Substrings II

> [!TIP]
> **🧠 Memory hook**
> v == c means equal **balance** (vowel +1, consonant −1). v² % k == 0 means v is a multiple of **m = smallest with m² % k == 0**. Match prefixes on **(balance, vowels mod m)**.
> **Mantra: m = min m: m² % k == 0 · key = (balance, vowels % m) · count += seen[key]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Binary%20Strings%20and%20Substring%20Counting/Binary%20Strings%20and%20Substring%20Counting%20Animations.html#p=15) · **Pattern hub:** [Binary Strings and Substring Counting - Pattern Map](Binary%20Strings%20and%20Substring%20Counting%20-%20Pattern%20Map.md)

## Problem
Same as part I with n up to 5·10⁴.

## Key insight
A substring between prefixes p < q has v = c iff the balances are equal. Then v · c = v², and k divides v² iff m divides v. v is the difference of prefix vowel counts, so the prefixes must agree mod m.

## Approach: Prefix map
```java
// v == c and v² % k == 0 means v is a multiple of m (smallest m with m² % k == 0); match (balance, vowels mod m)
public long beautifulSubstrings(String s, int k) {
    int m = 1;
    while ((long) m * m % k != 0) m++;
    Map<Long, Integer> seen = new HashMap<>();
    int balance = 0, vowels = 0;
    seen.put(key(0, 0), 1);
    long count = 0;
    for (char ch : s.toCharArray()) {
        if ("aeiou".indexOf(ch) >= 0) {
            balance++;
            vowels++;
        } else balance--;
        long key = key(balance, vowels % m);
        count += seen.getOrDefault(key, 0);
        seen.merge(key, 1, Integer::sum);
    }
    return count;
}

// Packs (balance, residue) into one long
long key(int balance, int residue) {
    return (long) balance * 1_000_000 + residue;
}
```

| Approach | Time | Space |
|---|---|---|
| Prefix map | O(n + k) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why not v % k?</summary>

k = 4: v = 2 gives v² = 4, divisible, yet v % 4 ≠ 0.

</details>


<details><summary>Why seed (0, 0)?</summary>

Substrings starting at index 0.

</details>


## Connected
- [Count Beautiful Substrings I](Count%20Beautiful%20Substrings%20I.md)
