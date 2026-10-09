---
topic: Jumps and Reach
pattern: [State = other finger, Rolling layer]
source: LeetCode 1320
difficulty: Hard
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Minimum Distance to Type a Word Using Two Fingers

> [!TIP]
> **🧠 Memory hook**
> One finger is always on the **last typed letter**; the only unknown is where the other finger rests.
> **Mantra: dp[other]: SAME FINGER → dp + d(prev, cur) · OTHER FINGER → next[prev] = dp + d(other, cur)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=13) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
Letters A–Z sit on a keyboard with 6 columns. Type the word with two fingers; moving between keys costs the Manhattan distance, and the first placement of each finger is free. Return the minimum total distance.

## Key insight
After typing letter i − 1, one finger is on it. State = the other finger (26 positions plus "not placed yet"). For the next letter either the same finger moves (other stays), or the other finger moves and the finger on the previous letter becomes the "other".

## Approach: Layer over the other finger
```java
// dp[other] = least travel so far when one finger is on the last letter and the other on `other` (26 = free)
public int minimumDistance(String word) {
    int[] dp = new int[27];
    Arrays.fill(dp, Integer.MAX_VALUE / 2);
    dp[26] = 0;
    for (int i = 1; i < word.length(); i++) {
        int prev = word.charAt(i - 1) - 'A', cur = word.charAt(i) - 'A';
        int[] next = new int[27];
        Arrays.fill(next, Integer.MAX_VALUE / 2);
        for (int other = 0; other < 27; other++) {
            if (dp[other] >= Integer.MAX_VALUE / 2) continue;
            next[other] = Math.min(next[other], dp[other] + dist(prev, cur));
            next[prev] = Math.min(next[prev], dp[other] + dist(other, cur));
        }
        dp = next;
    }
    return Arrays.stream(dp).min().getAsInt();
}

// Manhattan distance between keys; 26 means the finger has not been placed yet
private int dist(int a, int b) {
    if (a == 26) return 0;
    return Math.abs(a / 6 - b / 6) + Math.abs(a % 6 - b % 6);
}
```

| Approach | Time | Space |
|---|---|---|
| Layer over the other finger | O(27 · n) | O(27) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why is "not placed" a state?</summary>

Its first move is free.

</details>


<details><summary>Why only 27 states?</summary>

The typing finger position is always the previous letter.

</details>


## Connected
- [Frog Jump](Frog%20Jump.md)
- [Paint House](../Counting%20Walks%20and%20Moves/Paint%20House.md)
