---
topic: Trie
pattern: [Trie of folders, Subtree serialisation]
source: LeetCode 1948
difficulty: Hard
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, trie]
---
# Delete Duplicate Folders in System

> [!TIP]
> **🧠 Memory hook**
> Fingerprint every folder by what is inside it; identical fingerprints mean demolish both.
> **Mantra: TRIE, POST-ORDER SIGNATURE, COUNT, PRUNE**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Trie/Trie%20Animations.html#p=9) · **Pattern hub:** [Trie - Pattern Map](Trie%20-%20Pattern%20Map.md)

## Problem
Mark all folders with identical non-empty subfolder structures, delete them (and their subfolders), and return the remaining paths.

## Key insight
Build a trie of folder names. In post-order, serialise each folder as the concatenation of `(childName + childSignature)` over **sorted** children. Count the signatures; remove children whose signature count is > 1.

## Approach: Trie + serialisation
```java
// Folder trie node; TreeMap keeps children sorted so serialisation is canonical
static class Node {
    TreeMap<String, Node> children = new TreeMap<>();
    String sig = "";
}

// Post-order: a folder's signature is "(childName childSig)" for each child in sorted order
static String serialize(Node node, Map<String, Integer> freq) {
    StringBuilder sb = new StringBuilder();
    for (Map.Entry<String, Node> e : node.children.entrySet())
        sb.append('(').append(e.getKey()).append(serialize(e.getValue(), freq)).append(')');
    node.sig = sb.toString();
    if (!node.sig.isEmpty()) freq.merge(node.sig, 1, Integer::sum);
    return node.sig;
}

// Drops every child whose non-empty signature occurs more than once
static void prune(Node node, Map<String, Integer> freq) {
    node.children.values().removeIf(c -> !c.sig.isEmpty() && freq.get(c.sig) > 1);
    for (Node c : node.children.values()) prune(c, freq);
}

// Lists the remaining folder paths in pre-order
static void collect(Node node, Deque<String> path, List<List<String>> out) {
    for (Map.Entry<String, Node> e : node.children.entrySet()) {
        path.addLast(e.getKey());
        out.add(new ArrayList<>(path));
        collect(e.getValue(), path, out);
        path.removeLast();
    }
}

// Build trie, serialise subtrees, delete duplicates, list what is left
public List<List<String>> deleteDuplicateFolder(List<List<String>> paths) {
    Node root = new Node();
    for (List<String> p : paths) {
        Node cur = root;
        for (String f : p) cur = cur.children.computeIfAbsent(f, k -> new Node());
    }
    Map<String, Integer> freq = new HashMap<>();
    serialize(root, freq);
    prune(root, freq);
    List<List<String>> out = new ArrayList<>();
    collect(root, new ArrayDeque<>(), out);
    return out;
}
```

| Approach | Time | Space |
|---|---|---|
| Trie + serialisation | O(N·L·log C) | O(N·L) |

## Recall before you reveal
<details><summary>Why sort children?</summary>

So that equal structures give equal strings.

</details>


<details><summary>Why are empty signatures excluded?</summary>

Leaf folders are never duplicates by definition.

</details>


## Connected
- Find Duplicate Subtrees: the `Tree` folder
