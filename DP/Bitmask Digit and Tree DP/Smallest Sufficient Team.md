---
topic: Bitmask Digit and Tree DP
pattern: [Skill mask, Set cover]
source: LeetCode 1125
difficulty: Hard
companies: [Google, Amazon]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, dp]
---
# Smallest Sufficient Team

> [!TIP]
> **🧠 Memory hook**
> The state is **which skills are covered**; store the best team (as a person mask) per covered set.
> **Mantra: team[covered | skills(p)] = smaller of (itself, team[covered] + p)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/DP/Bitmask%20Digit%20and%20Tree%20DP/Bitmask%20Digit%20and%20Tree%20DP%20Animations.html#p=1) · **Pattern hub:** [Bitmask Digit and Tree DP - Pattern Map](Bitmask%20Digit%20and%20Tree%20DP%20-%20Pattern%20Map.md)

## Problem
Given required skills and each person's skills, return the indices of a smallest team covering all required skills.

## Key insight
There are at most 2¹⁶ skill masks. For each person, update every reachable mask: adding the person gives a larger covered set with one more member. Keep the team with fewer people.

## Approach: Skill-mask DP
```java
// team[mask] = smallest set of people (as a bitmask over people) covering the skills in mask
public int[] smallestSufficientTeam(String[] reqSkills, List<List<String>> people) {
    int m = reqSkills.length, n = people.size();
    Map<String, Integer> id = new HashMap<>();
    for (int i = 0; i < m; i++) id.put(reqSkills[i], i);
    int[] skill = new int[n];
    for (int p = 0; p < n; p++) for (String s : people.get(p)) skill[p] |= 1 << id.get(s);
    long[] team = new long[1 << m];
    boolean[] seen = new boolean[1 << m];
    seen[0] = true;
    for (int p = 0; p < n; p++)
        for (int mask = 0; mask < (1 << m); mask++) {
            if (!seen[mask]) continue;
            int next = mask | skill[p];
            long cand = team[mask] | (1L << p);
            if (!seen[next] || Long.bitCount(cand) < Long.bitCount(team[next])) {
                seen[next] = true;
                team[next] = cand;
            }
        }
    long best = team[(1 << m) - 1];
    int[] res = new int[Long.bitCount(best)];
    for (int p = 0, k = 0; p < n; p++) if ((best >> p & 1) == 1) res[k++] = p;
    return res;
}
```

| Approach | Time | Space |
|---|---|---|
| Skill-mask DP | O(n · 2ᵐ) | O(2ᵐ) |

> [!WARNING]
> **Java gotcha**
> Verified against a brute-force enumeration on small random inputs when it was written.

## Recall before you reveal
<details><summary>Why store the team and not just its size?</summary>

The problem asks for the members.

</details>


<details><summary>Why a long for the team?</summary>

Up to 60 people fit in one 64-bit mask.

</details>


## Connected
- [Maximize Score After N Operations](Maximize%20Score%20After%20N%20Operations.md)
