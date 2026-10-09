---
topic: Disjoint Set
pattern: [Union-Find, DFS]
source: LeetCode 1061
difficulty: Medium
companies: [Amazon]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, disjoint-set]
---
# Lexicographically Smallest Equivalent String

> [!TIP]
> **🧠 Memory hook**
> Equivalent letters form clubs; always crown the alphabetically smallest member.
> **Mantra: SMALLER LETTER BECOMES THE ROOT**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Disjoint%20Set/Disjoint%20Set%20Animations.html#p=15) · **Pattern hub:** [Disjoint Set - Pattern Map](Disjoint%20Set%20-%20Pattern%20Map.md)

## Problem
Letters s1[i] and s2[i] are equivalent (transitively). Replace each letter of baseStr by the smallest equivalent letter.

## Key insight
Union the pairs, always making the smaller letter the root, then find(letter) is the answer for that letter. A DFS over the 26-node graph and taking the minimum per component is equivalent.

## Approach 1: Union-Find (smaller root)
```java
// Union-Find where the smaller letter always becomes the root, so find() returns the smallest equivalent letter
public String smallestEquivalentStringDsu(String s1, String s2, String baseStr) {
    int[] parent = new int[26];
    for (int i = 0; i < 26; i++) parent[i] = i;
    for (int i = 0; i < s1.length(); i++) {
        int a = find(parent, s1.charAt(i) - 'a'), b = find(parent, s2.charAt(i) - 'a');
        if (a < b) parent[b] = a;
        else parent[a] = b;
    }
    StringBuilder sb = new StringBuilder();
    for (char c : baseStr.toCharArray()) sb.append((char) ('a' + find(parent, c - 'a')));
    return sb.toString();
}

// Finds the root with path compression
private int find(int[] p, int x) {
    return p[x] == x ? x : (p[x] = find(p, p[x]));
}
```

## Approach 2: DFS per component
```java
// DFS over the equivalence graph, taking the smallest letter of each component
public String smallestEquivalentStringDfs(String s1, String s2, String baseStr) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < 26; i++) adj.add(new ArrayList<>());
    for (int i = 0; i < s1.length(); i++) { adj.get(s1.charAt(i) - 'a').add(s2.charAt(i) - 'a'); adj.get(s2.charAt(i) - 'a').add(s1.charAt(i) - 'a'); }
    int[] smallest = new int[26];
    Arrays.fill(smallest, -1);
    for (int i = 0; i < 26; i++) {
        if (smallest[i] != -1) continue;
        List<Integer> comp = new ArrayList<>();
        collect(adj, i, smallest, comp);
        int min = Collections.min(comp);
        for (int c : comp) smallest[c] = min;
    }
    StringBuilder sb = new StringBuilder();
    for (char c : baseStr.toCharArray()) sb.append((char) ('a' + smallest[c - 'a']));
    return sb.toString();
}

// Gathers one component (marks with -2 while collecting)
private void collect(List<List<Integer>> adj, int u, int[] mark, List<Integer> comp) {
    mark[u] = -2;
    comp.add(u);
    for (int v : adj.get(u)) if (mark[v] == -1) collect(adj, v, mark, comp);
}
```

| Approach | Time | Space |
|---|---|---|
| Union-Find (smaller root) | O((m + n) α) | O(26) |
| DFS per component | O(m + n) | O(26) |

## Recall before you reveal
<details><summary>Why does the smaller letter go on top?</summary>

So find returns the component minimum without extra bookkeeping.

</details>


<details><summary>Is the relation transitive?</summary>

Yes: a ≡ b and b ≡ c implies a ≡ c.

</details>


## Connected
- [Satisfiability of Equality Equations](Satisfiability%20of%20Equality%20Equations.md)
