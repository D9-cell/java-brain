---
topic: Jumps and Reach
pattern: [Sliding-window count, Boolean DP]
source: LeetCode 1871
difficulty: Medium
review_stage: 0
next_review: 2026-10-10
tags: [java-brain, dp]
---
# Jump Game VII

> [!TIP]
> **🧠 Memory hook**
> A cell is reachable if **any** reachable cell sits in the window `[i − max, i − min]`: just count them.
> **Mantra: inWindow += ok[i − min]; inWindow −= ok[i − max − 1]**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Jumps%20and%20Reach/Jumps%20and%20Reach%20Animations.html#p=4) · **Pattern hub:** [Jumps and Reach - Pattern Map](Jumps%20and%20Reach%20-%20Pattern%20Map.md)

## Problem
A binary string starts with 0. From a 0 at i you may jump to a 0 at j with i + minJump ≤ j ≤ i + maxJump. Can you reach the last index?

## Key insight
Flip the direction: index i is reachable if s[i] is 0 and some reachable index lies in its look-back window. A running count of reachable indexes in that window updates in O(1) as i moves.

## Approach 1: Window count
```java
// Sliding count of reachable indexes inside the window [i - maxJump, i - minJump]
public boolean canReach(String s, int minJump, int maxJump) {
    int n = s.length(), inWindow = 0;
    boolean[] ok = new boolean[n];
    ok[0] = true;
    for (int i = 1; i < n; i++) {
        if (i - minJump >= 0 && ok[i - minJump]) inWindow++;
        if (i - maxJump - 1 >= 0 && ok[i - maxJump - 1]) inWindow--;
        ok[i] = s.charAt(i) == '0' && inWindow > 0;
    }
    return ok[n - 1];
}
```

## Approach 2: Plain look-back
```java
// Plain DP looking back over the whole window
public boolean canReachSlow(String s, int minJump, int maxJump) {
    int n = s.length();
    boolean[] ok = new boolean[n];
    ok[0] = true;
    for (int i = 1; i < n; i++)
        for (int j = Math.max(0, i - maxJump); j <= i - minJump && !ok[i]; j++) ok[i] = s.charAt(i) == '0' && ok[j];
    return ok[n - 1];
}
```

| Approach | Time | Space |
|---|---|---|
| Window count | O(n) | O(n) |
| Plain look-back | O(n · (max − min)) | O(n) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force or plain DP version on small random inputs when it was written.

## Recall before you reveal
<details><summary>Which index enters the window at i?</summary>

i − minJump.

</details>


<details><summary>Which leaves?</summary>

i − maxJump − 1.

</details>


## Connected
- [Jump Game VI](Jump%20Game%20VI.md)
- [Jump Game](Jump%20Game.md)
