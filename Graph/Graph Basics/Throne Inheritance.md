---
topic: Graph Basics
pattern: [Tree DFS, Design]
source: LeetCode 1600
difficulty: Medium
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-basics]
---
# Throne Inheritance

> [!TIP]
> **🧠 Memory hook**
> A family tree read in birth order: king, then his first child with all of that child's descendants, then the next child.
> **Mantra: PRE-ORDER DFS, SKIP THE DEAD**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Graph%20Basics/Graph%20Basics%20Animations.html#p=17) · **Pattern hub:** [Graph Basics - Pattern Map](Graph%20Basics%20-%20Pattern%20Map.md)

## Problem
Support birth(parent, child), death(name) and getInheritanceOrder() for a royal family.

## Key insight
The order is a pre-order DFS of the family tree with children in birth order. Dead people stay in the tree (their children still inherit through them) and are only skipped when printing.

## Approach: Pre-order DFS
```java
// LeetCode 1600: Throne Inheritance
public class ThroneInheritance {
    private final Map<String, List<String>> children = new HashMap<>();
    private final Set<String> dead = new HashSet<>();
    private final String king;

    // Starts the family tree with the king as the root
    public ThroneInheritance(String kingName) {
        king = kingName;
        children.put(kingName, new ArrayList<>());
    }

    // Appends the child to the parent's list, so birth order is kept
    public void birth(String parentName, String childName) {
        children.computeIfAbsent(parentName, k -> new ArrayList<>()).add(childName);
    }

    // Marks a person dead without removing them, since their children still inherit through them
    public void death(String name) {
        dead.add(name);
    }

    // Pre-order DFS of the tree, skipping the dead
    public List<String> getInheritanceOrder() {
        List<String> order = new ArrayList<>();
        dfs(king, order);
        return order;
    }

    // Visits a person, then each child in birth order
    private void dfs(String name, List<String> order) {
        if (!dead.contains(name)) order.add(name);
        for (String child : children.getOrDefault(name, List.of())) dfs(child, order);
    }

    // The sample from the problem
    public static void main(String[] args) {
        ThroneInheritance t = new ThroneInheritance("king");
        t.birth("king", "andy");
        t.birth("king", "bob");
        t.birth("king", "catherine");
        t.birth("andy", "matthew");
        t.birth("bob", "alex");
        t.birth("bob", "asha");
        boolean ok = t.getInheritanceOrder().equals(List.of("king", "andy", "matthew", "bob", "alex", "asha", "catherine"));
        t.death("bob");
        ok &= t.getInheritanceOrder().equals(List.of("king", "andy", "matthew", "alex", "asha", "catherine"));
        System.out.println((ok ? "OK   " : "FAIL ") + "sample order before and after bob dies");
    }
}

// Appends the child to the parent's list, so birth order is kept
public void birth(String parentName, String childName) {
    children.computeIfAbsent(parentName, k -> new ArrayList<>()).add(childName);
}

// Marks a person dead without removing them, since their children still inherit through them
public void death(String name) {
    dead.add(name);
}

// Pre-order DFS of the tree, skipping the dead
public List<String> getInheritanceOrder() {
    List<String> order = new ArrayList<>();
    dfs(king, order);
    return order;
}

// Visits a person, then each child in birth order
private void dfs(String name, List<String> order) {
    if (!dead.contains(name)) order.add(name);
    for (String child : children.getOrDefault(name, List.of())) dfs(child, order);
}
```

| Approach | Time | Space |
|---|---|---|
| Pre-order DFS | O(n) per query | O(n) |

## Recall before you reveal
<details><summary>Why not delete a dead person?</summary>

Their descendants must still be reachable.

</details>


<details><summary>What gives the order?</summary>

Pre-order DFS with children kept in birth order.

</details>


## Connected
- [Design](../../Design/Design%20-%20Pattern%20Map.md)
