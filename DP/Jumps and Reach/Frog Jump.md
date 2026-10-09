---
topic: Jumps and Reach
pattern: [State = (position, last jump), Sets per stone]
source: LeetCode 403
difficulty: Hard
companies: [Amazon, Google]
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Frog Jump

> [!TIP]
> **🧠 Memory hook**
> The frog remembers its **last jump size**; each stone keeps a basket of sizes that can land on it.
> **Mantra: FOR EACH STONE, EACH k IN ITS SET: TRY k−1, k, k+1**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=5) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
Stones sit at increasing positions; the frog starts on the first stone and its first jump is 1 unit. If its last jump was k, the next is k − 1, k or k + 1 (forward only) and must land on a stone. Can it reach the last stone?

## Key insight
Position alone is not enough: the allowed jumps depend on the previous jump. Store, for every stone, the set of jump sizes that can arrive there and push each one forward. The memo version caches (stone, last jump).

## Approach 1: Sets of arriving jumps
```java
// For every stone keep the set of jump sizes that can arrive there
public boolean canCross(int[] stones) {
    Map<Integer, Set<Integer>> arrive = new HashMap<>();
    for (int s : stones) arrive.put(s, new HashSet<>());
    arrive.get(stones[0]).add(0);
    for (int s : stones)
        for (int k : arrive.get(s))
            for (int step = k - 1; step <= k + 1; step++)
                if (step > 0 && arrive.containsKey(s + step)) arrive.get(s + step).add(step);
    return !arrive.get(stones[stones.length - 1]).isEmpty();
}
```

## Approach 2: Memo on (stone, k)
```java
// Top-down over (stone index, last jump)
public boolean canCrossMemo(int[] stones) {
    Map<Integer, Integer> at = new HashMap<>();
    for (int i = 0; i < stones.length; i++) at.put(stones[i], i);
    return go(stones, at, 0, 0, new HashMap<>());
}

// Whether the frog on stone i after a jump of k can finish
private boolean go(int[] st, Map<Integer, Integer> at, int i, int k, Map<Long, Boolean> memo) {
    if (i == st.length - 1) return true;
    long key = (long) i << 32 | k;
    if (memo.containsKey(key)) return memo.get(key);
    boolean ok = false;
    for (int step = k - 1; step <= k + 1 && !ok; step++) {
        Integer j = step > 0 ? at.get(st[i] + step) : null;
        if (j != null) ok = go(st, at, j, step, memo);
    }
    memo.put(key, ok);
    return ok;
}
```

| Approach | Time | Space |
|---|---|---|
| Sets of arriving jumps | O(n²) | O(n²) |
| Memo on (stone, k) | O(n²) | O(n²) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is the jump size at most n?</summary>

It grows by at most 1 per stone.

</details>


<details><summary>Why start with jump 0 on stone 0?</summary>

Then k + 1 = 1 is exactly the forced first jump.

</details>


## Connected
- [Jump Game](Jump%20Game.md)
- [Minimum Distance to Type a Word Using Two Fingers](Minimum%20Distance%20to%20Type%20a%20Word%20Using%20Two%20Fingers.md)
