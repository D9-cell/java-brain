---
topic: Trees and Advanced Graphs
pattern: [Weighted graph, DFS, Floyd-Warshall]
source: LeetCode 399
difficulty: Medium
companies: [Amazon, Google, Facebook]
review_stage: 0
next_review: 2026-10-08
tags: [java-brain, graph-trees]
---
# Evaluate Division

> [!TIP]
> **🧠 Memory hook**
> Currency exchange: a path of rates multiplies into the final rate.
> **Mantra: a/b = w ⇒ EDGES a→b = w AND b→a = 1/w; MULTIPLY ALONG THE PATH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Graph/Trees%20and%20Advanced%20Graphs/Trees%20and%20Advanced%20Graphs%20Animations.html#p=16) · **Pattern hub:** [Trees and Advanced Graphs - Pattern Map](Trees%20and%20Advanced%20Graphs%20-%20Pattern%20Map.md)

## Problem
Given equations a / b = value, answer queries x / y (or −1 when it cannot be determined).

## Key insight
Each equation is a two-way edge with weights w and 1/w. A query is the product of weights along any path from x to y, so DFS/BFS (or precompute all pairs with Floyd-Warshall). Unknown variables answer −1.

## Approach 1: DFS multiplying weights
```java
// DFS from the numerator towards the denominator multiplying edge weights along the way
public double[] calcEquationDfs(List<List<String>> equations, double[] values, List<List<String>> queries) {
    Map<String, Map<String, Double>> graph = build(equations, values);
    double[] answer = new double[queries.size()];
    for (int i = 0; i < answer.length; i++) {
        String a = queries.get(i).get(0), b = queries.get(i).get(1);
        answer[i] = graph.containsKey(a) && graph.containsKey(b) ? dfs(graph, a, b, 1.0, new HashSet<>()) : -1.0;
    }
    return answer;
}

// Returns the product along a path from u to target, or -1 when there is none
private double dfs(Map<String, Map<String, Double>> graph, String u, String target, double acc, Set<String> seen) {
    if (u.equals(target)) return acc;
    seen.add(u);
    for (Map.Entry<String, Double> e : graph.get(u).entrySet()) {
        if (seen.contains(e.getKey())) continue;
        double res = dfs(graph, e.getKey(), target, acc * e.getValue(), seen);
        if (res != -1.0) return res;
    }
    return -1.0;
}

// Builds the weighted two-way graph
private Map<String, Map<String, Double>> build(List<List<String>> equations, double[] values) {
    Map<String, Map<String, Double>> graph = new HashMap<>();
    for (int i = 0; i < equations.size(); i++) {
        String a = equations.get(i).get(0), b = equations.get(i).get(1);
        graph.computeIfAbsent(a, k -> new HashMap<>()).put(b, values[i]);
        graph.computeIfAbsent(b, k -> new HashMap<>()).put(a, 1.0 / values[i]);
    }
    return graph;
}
```

## Approach 2: Floyd-Warshall on ratios
```java
// Floyd-Warshall on ratios: ratio[a][c] = ratio[a][b] * ratio[b][c]
public double[] calcEquationFloyd(List<List<String>> equations, double[] values, List<List<String>> queries) {
    Map<String, Integer> id = new HashMap<>();
    for (List<String> eq : equations) for (String v : eq) id.putIfAbsent(v, id.size());
    int n = id.size();
    double[][] ratio = new double[n][n];
    for (double[] row : ratio) Arrays.fill(row, -1.0);
    for (int i = 0; i < n; i++) ratio[i][i] = 1.0;
    for (int i = 0; i < equations.size(); i++) {
        int a = id.get(equations.get(i).get(0)), b = id.get(equations.get(i).get(1));
        ratio[a][b] = values[i];
        ratio[b][a] = 1.0 / values[i];
    }
    for (int k = 0; k < n; k++) for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) {
        if (ratio[i][k] != -1.0 && ratio[k][j] != -1.0) ratio[i][j] = ratio[i][k] * ratio[k][j];
    }
    double[] answer = new double[queries.size()];
    for (int q = 0; q < answer.length; q++) {
        Integer a = id.get(queries.get(q).get(0)), b = id.get(queries.get(q).get(1));
        answer[q] = a == null || b == null ? -1.0 : ratio[a][b];
    }
    return answer;
}
```

| Approach | Time | Space |
|---|---|---|
| DFS multiplying weights | O(Q · (V + E)) | O(V + E) |
| Floyd-Warshall on ratios | O(V³ + Q) | O(V²) |

> [!WARNING]
> **Java gotcha**
> Cheapest consistent version: weighted Union-Find stores each variable's ratio to its root.

## Recall before you reveal
<details><summary>Why store 1 / value on the reverse edge?</summary>

b / a is the reciprocal of a / b.

</details>


<details><summary>What if x is unknown?</summary>

Return −1.0 (even for x / x).

</details>


## Connected
- [Redundant Connection](../Disjoint%20Set/Redundant%20Connection.md)
