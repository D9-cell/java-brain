---
topic: Topological Sort
pattern: [Build the graph, Kahn, DFS]
source: LeetCode 269
difficulty: Hard
companies: [Airbnb, Amazon, Apple, Bloomberg, Facebook, Flipkart, Google, Microsoft, Oracle, Pinterest]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, topological-sort]
---
# Alien Dictionary

> [!TIP]
> **🧠 Memory hook**
> A dictionary in an unknown language: the first letter where two neighbouring words differ reveals one ordering rule.
> **Mantra: FIRST DIFFERING LETTER ⇒ EDGE; PREFIX TRAP ⇒ ""**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Topological%20Sort/Topological%20Sort%20Animations.html#p=4) · **Pattern hub:** [Topological Sort - Pattern Map](Topological%20Sort%20-%20Pattern%20Map.md)

## Problem
Words are sorted in an alien alphabet. Return a valid letter order, or "" if the list is inconsistent.

## Key insight
Compare adjacent words only: the first differing letters a, b give the edge a → b; stop at the first difference. If a longer word comes before its own prefix, return "". Then topologically sort the letters; a leftover means a contradiction.

## Approach 1: Kahn on letters
```java
// The first differing letters of adjacent words give edges a -> b; Kahn's algorithm on those letters yields the order
public String alienOrderKahn(String[] words) {
    Map<Character, Set<Character>> adj = new TreeMap<>();
    Map<Character, Integer> indegree = new TreeMap<>();
    for (String w : words) for (char c : w.toCharArray()) { adj.putIfAbsent(c, new TreeSet<>()); indegree.putIfAbsent(c, 0); }
    for (int i = 0; i + 1 < words.length; i++) {
        String a = words[i], b = words[i + 1];
        if (a.length() > b.length() && a.startsWith(b)) return "";
        for (int k = 0; k < Math.min(a.length(), b.length()); k++) {
            if (a.charAt(k) != b.charAt(k)) {
                if (adj.get(a.charAt(k)).add(b.charAt(k))) indegree.merge(b.charAt(k), 1, Integer::sum);
                break;
            }
        }
    }
    Queue<Character> que = new ArrayDeque<>();
    for (Map.Entry<Character, Integer> e : indegree.entrySet()) if (e.getValue() == 0) que.add(e.getKey());
    StringBuilder sb = new StringBuilder();
    while (!que.isEmpty()) {
        char u = que.poll();
        sb.append(u);
        for (char v : adj.get(u)) if (indegree.merge(v, -1, Integer::sum) == 0) que.add(v);
    }
    return sb.length() == adj.size() ? sb.toString() : "";
}
```

## Approach 2: DFS with three states
```java
// Same graph, DFS with three states; letters are prepended after their successors finish
public String alienOrderDfs(String[] words) {
    Map<Character, Set<Character>> adj = new TreeMap<>();
    for (String w : words) for (char c : w.toCharArray()) adj.putIfAbsent(c, new TreeSet<>());
    for (int i = 0; i + 1 < words.length; i++) {
        String a = words[i], b = words[i + 1];
        if (a.length() > b.length() && a.startsWith(b)) return "";
        for (int k = 0; k < Math.min(a.length(), b.length()); k++) {
            if (a.charAt(k) != b.charAt(k)) { adj.get(a.charAt(k)).add(b.charAt(k)); break; }
        }
    }
    Map<Character, Integer> state = new HashMap<>();
    StringBuilder sb = new StringBuilder();
    for (char c : adj.keySet()) if (!state.containsKey(c) && !visit(c, adj, state, sb)) return "";
    return sb.reverse().toString();
}

// Returns false on a cycle
private boolean visit(char u, Map<Character, Set<Character>> adj, Map<Character, Integer> state, StringBuilder sb) {
    state.put(u, 1);
    for (char v : adj.get(u)) {
        Integer st = state.get(v);
        if (st != null && st == 1) return false;
        if (st == null && !visit(v, adj, state, sb)) return false;
    }
    state.put(u, 2);
    sb.append(u);
    return true;
}
```

| Approach | Time | Space |
|---|---|---|
| Kahn on letters | O(total letters) | O(1) alphabet |
| DFS with three states | O(total letters) | O(1) alphabet |

> [!WARNING]
> **Java gotcha**
> The "abc" before "ab" case must return "" explicitly, because the first-difference loop finds no difference.

## Recall before you reveal
<details><summary>Why only adjacent words?</summary>

Sortedness is transitive: adjacent pairs imply the rest.

</details>


<details><summary>Why stop after the first difference?</summary>

Later letters carry no information about the alphabet.

</details>


## Connected
- [Course Schedule II](Course%20Schedule%20II.md)
