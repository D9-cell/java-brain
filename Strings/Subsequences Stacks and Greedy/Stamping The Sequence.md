---
topic: Subsequences Stacks and Greedy
pattern: [Reverse process, Greedy]
source: LeetCode 936
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, strings]
---
# Stamping The Sequence

> [!TIP]
> **🧠 Memory hook**
> Work **backwards**: any window that matches the stamp (with ? as wildcard) can be the **last stamp**; replace it with ?. Repeat until all ?. Reverse the order.
> **Mantra: FOR window: matches with ? wildcards and changes ≥ 1 letter → ?…? · reverse moves**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Strings/Subsequences%20Stacks%20and%20Greedy/Subsequences%20Stacks%20and%20Greedy%20Animations.html#p=15) · **Pattern hub:** [Subsequences Stacks and Greedy - Pattern Map](Subsequences%20Stacks%20and%20Greedy%20-%20Pattern%20Map.md)

## Problem
Starting from all ?, stamping overwrites a window with the stamp. Return a sequence of at most 10·n stamp positions that produces target, or an empty array.

## Key insight
The last stamp leaves an exact copy of the stamp. Undoing it turns that window into wildcards, which then match any later (earlier in time) stamp. Each useful undo removes at least one letter, so the process ends.

## Approach: Reverse stamping
```java
// Work backwards: repeatedly un-stamp any window that matches the stamp where not already wildcarded
public int[] movesToStamp(String stamp, String target) {
    char[] t = target.toCharArray();
    int m = stamp.length(), n = t.length, done = 0;
    boolean[] visited = new boolean[n - m + 1];
    List<Integer> order = new ArrayList<>();
    while (done < n) {
        boolean progress = false;
        for (int i = 0; i + m <= n; i++) {
            if (visited[i]) continue;
            int changed = unstamp(t, stamp, i);
            if (changed < 0) continue;
            visited[i] = true;
            done += changed;
            order.add(i);
            progress = true;
        }
        if (!progress) return new int[0];
    }
    Collections.reverse(order);
    return order.stream().mapToInt(Integer::intValue).toArray();
}

// If window i matches (with ? as wildcard) replace it by ? and return how many letters changed, else -1
int unstamp(char[] t, String stamp, int i) {
    int changed = 0;
    for (int k = 0; k < stamp.length(); k++) {
        if (t[i + k] == '?') continue;
        if (t[i + k] != stamp.charAt(k)) return -1;
        changed++;
    }
    if (changed == 0) return -1;
    for (int k = 0; k < stamp.length(); k++)
        if (t[i + k] != '?') t[i + k] = '?';
    return changed;
}
```

| Approach | Time | Space |
|---|---|---|
| Reverse stamping | O(n · (n − m) · m) | O(n) |

> [!WARNING]
> **Java gotcha**
> Checked by replaying the returned moves and by a BFS on targets that cannot be stamped.

## Recall before you reveal
<details><summary>Why work backwards?</summary>

Only the final stamp is fully visible.

</details>


<details><summary>Why require changed ≥ 1?</summary>

Undoing an all-? window makes no progress.

</details>


## Connected
- [String Matching in an Array](String%20Matching%20in%20an%20Array.md)
