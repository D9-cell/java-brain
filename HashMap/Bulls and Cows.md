---
topic: HashMap
pattern: [Frequency counting]
source: LeetCode 299
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, hashmap]
---
# Bulls and Cows

> [!TIP]
> **🧠 Memory hook**
> One shared counter: the secret deposits, the guess withdraws.
> **Mantra: BULL = SAME SPOT, COW WHEN THE COUNTER CANCELS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/HashMap/HashMap%20Animations.html#p=2) · **Pattern hub:** [HashMap - Pattern Map](HashMap%20-%20Pattern%20Map.md)

## Problem
Return "xAyB" (bulls, cows) for a guess.

## Key insight
Bulls are exact matches. For the rest, a digit seen on both sides makes one cow; a single signed counter detects that in one pass.

## Approach: One pass, signed counter
```java
// Bulls = same position; for the rest, a shared counter: secret digit +1, guess digit −1, a cow whenever they cancel
public String getHint(String secret, String guess) {
    int bulls = 0, cows = 0;
    int[] cnt = new int[10];
    for (int i = 0; i < secret.length(); i++) {
        int s = secret.charAt(i) - '0', g = guess.charAt(i) - '0';
        if (s == g) { bulls++; continue; }
        if (cnt[s]++ < 0) cows++;
        if (cnt[g]-- > 0) cows++;
    }
    return bulls + "A" + cows + "B";
}
```

| Approach | Time | Space |
|---|---|---|
| One pass, signed counter | O(n) | O(10) |

> [!WARNING]
> **Java gotcha**
> Verified against the min-count formula.

## Recall before you reveal
<details><summary>Formula version?</summary>

Σ min(secretCnt[d], guessCnt[d]) over non-bulls.

</details>

