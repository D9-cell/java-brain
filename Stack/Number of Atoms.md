---
topic: Stack
pattern: [Saved state (stack of maps)]
source: LeetCode 726
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, stack]
---
# Number of Atoms

> [!TIP]
> **🧠 Memory hook**
> Nested boxes of counts; closing a box multiplies its contents.
> **Mantra: STACK OF MAPS, ")k" MULTIPLIES AND MERGES**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Stack/Stack%20Animations.html#p=21) · **Pattern hub:** [Stack - Pattern Map](Stack%20-%20Pattern%20Map.md)

## Problem
Count the atoms in a formula like "K4(ON(SO3)2)2".

## Key insight
Parse atoms (Upper + lowers + count) into the top map; "(" pushes a map; ")k" pops, multiplies by k and merges down.

## Approach: Stack of HashMaps
```java
// Stack of count maps: '(' opens a new map; ')' + multiplier folds it into the map below
public String countOfAtoms(String f) {
    Deque<Map<String, Integer>> st = new ArrayDeque<>();
    st.push(new HashMap<>());
    int i = 0, n = f.length();
    while (i < n) {
        char c = f.charAt(i);
        if (c == '(') { st.push(new HashMap<>()); i++; }
        else if (c == ')') {
            i++;
            int start = i;
            while (i < n && Character.isDigit(f.charAt(i))) i++;
            int mult = start < i ? Integer.parseInt(f.substring(start, i)) : 1;
            Map<String, Integer> top = st.pop();
            for (Map.Entry<String, Integer> e : top.entrySet()) st.peek().merge(e.getKey(), e.getValue() * mult, Integer::sum);
        } else {
            int start = i++;
            while (i < n && Character.isLowerCase(f.charAt(i))) i++;
            String atom = f.substring(start, i);
            start = i;
            while (i < n && Character.isDigit(f.charAt(i))) i++;
            int cnt = start < i ? Integer.parseInt(f.substring(start, i)) : 1;
            st.peek().merge(atom, cnt, Integer::sum);
        }
    }
    StringBuilder sb = new StringBuilder();
    for (Map.Entry<String, Integer> e : new TreeMap<>(st.peek()).entrySet()) {
        sb.append(e.getKey());
        if (e.getValue() > 1) sb.append(e.getValue());
    }
    return sb.toString();
}
```

| Approach | Time | Space |
|---|---|---|
| Stack of HashMaps | O(n²) worst | O(n) |

## Recall before you reveal
<details><summary>Output order?</summary>

Sorted names (TreeMap).

</details>

