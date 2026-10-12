---
topic: Counting and Modular Combinatorics
pattern: [Lazy affine map, Modular inverse]
source: LeetCode 1622
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Fancy Sequence

> [!TIP]
> **🧠 Memory hook**
> Keep **one global map x → mul·x + add**. Store each appended value **already undone** by the current map, so later ops apply to all for free.
> **Mantra: append: (v − add) · mul⁻¹ · addAll: add += inc · multAll: mul, add *= m · get: v·mul + add**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Counting%20and%20Modular%20Combinatorics/Counting%20and%20Modular%20Combinatorics%20Animations.html#p=12) · **Pattern hub:** [Counting and Modular Combinatorics - Pattern Map](Counting%20and%20Modular%20Combinatorics%20-%20Pattern%20Map.md)

## Problem
Implement Fancy: append(val), addAll(inc) to every element, multAll(m) on every element, getIndex(idx) mod 1e9+7 (or -1).

## Key insight
Composing affine maps stays affine, so one (mul, add) pair describes every update since the start. A value appended later must not receive earlier updates, so store the inverse image: (val − add) / mul, using the Fermat inverse since MOD is prime and m ≥ 1.

## Approach: Global map + inverse
```java
// Keeps one global x -> mul·x + add and stores each value already undone by the current transform
class Fancy {
    static final long MOD = 1_000_000_007;
    List<Long> vals = new ArrayList<>();
    long mul = 1, add = 0;

    public void append(int val) {
        vals.add((val - add + MOD) % MOD * inverse(mul) % MOD);
    }

    public void addAll(int inc) {
        add = (add + inc) % MOD;
    }

    public void multAll(int m) {
        mul = mul * m % MOD;
        add = add * m % MOD;
    }

    public int getIndex(int idx) {
        if (idx >= vals.size()) return -1;
        return (int) ((vals.get(idx) * mul + add) % MOD);
    }

    long inverse(long a) {
        long r = 1, e = MOD - 2;
        while (e > 0) {
            if ((e & 1) == 1) r = r * a % MOD;
            a = a * a % MOD;
            e >>= 1;
        }
        return r;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Global map + inverse | O(log MOD) append, O(1) others | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why store the inverse image?</summary>

Applying the current map to it gives back val, and future maps apply naturally.

</details>


<details><summary>Why is mul invertible?</summary>

MOD is prime and every m is between 1 and 100.

</details>


## Connected
- [Design a Stack With Increment Operation](../../Design/Design%20a%20Stack%20With%20Increment%20Operation.md)
