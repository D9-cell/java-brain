---
topic: Recursion
pattern: [Recursive descent parsing]
source: LeetCode 1096
difficulty: Hard
companies: [Google]
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, recursion]
---
# Brace Expansion II

> [!TIP]
> **🧠 Memory hook**
> A menu grammar: commas mean "or", side by side means "and then". Three cooks: union, concat, unit.
> **Mantra: UNION OF CONCATS OF UNITS**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Recursion/Recursion%20Animations.html#p=19) · **Pattern hub:** [Recursion - Pattern Map](Recursion%20-%20Pattern%20Map.md)

## Problem
Return the sorted list of distinct words the expression represents.

## Key insight
union := concat ("," concat)*; concat := unit+ (cartesian product); unit := letter | "{" union "}". A shared index moves through the string.

## Approach: Recursive descent
```java
    // unit := letter | '{' union '}'
    private TreeSet<String> unit() {
        TreeSet<String> res;
        if (s.charAt(idx) == '{') {
            idx++;
            res = union();
        } else {
            res = new TreeSet<>(List.of(String.valueOf(s.charAt(idx))));
        }
        idx++;
        return res;
    }

    // concat := unit unit ... (cartesian product of neighbouring units)
    private TreeSet<String> concat() {
        TreeSet<String> res = new TreeSet<>(List.of(""));
        while (idx < s.length() && (s.charAt(idx) == '{' || Character.isLetter(s.charAt(idx)))) {
            TreeSet<String> next = unit(), combined = new TreeSet<>();
            for (String a : res) for (String b : next) combined.add(a + b);
            res = combined;
        }
        return res;
    }

    // union := concat (',' concat)*
    private TreeSet<String> union() {
        TreeSet<String> res = new TreeSet<>();
        while (true) {
            res.addAll(concat());
            if (idx < s.length() && s.charAt(idx) == ',') idx++;
            else return res;
        }
    }

    // Parses the whole expression as a union; TreeSet gives sorted, distinct words
    public List<String> braceExpansionII(String expression) {
        s = expression;
        idx = 0;
        return new ArrayList<>(union());
    }

    // Runs samples
    public static void main(String[] args) {
        List<String> a = new BraceExpansionII().braceExpansionII("{a,b}{c,{d,e}}"), b = new BraceExpansionII().braceExpansionII("{{a,z},a{b,c},{ab,z}}");
        System.out.println((a.equals(List.of("ac", "ad", "ae", "bc", "bd", "be")) && b.equals(List.of("a", "ab", "ac", "z")) ? "OK   " : "FAIL ") + a + " " + b);
    }
}


    // concat := unit unit ... (cartesian product of neighbouring units)
    private TreeSet<String> concat() {
        TreeSet<String> res = new TreeSet<>(List.of(""));
        while (idx < s.length() && (s.charAt(idx) == '{' || Character.isLetter(s.charAt(idx)))) {
            TreeSet<String> next = unit(), combined = new TreeSet<>();
            for (String a : res) for (String b : next) combined.add(a + b);
            res = combined;
        }
        return res;
    }

    // union := concat (',' concat)*
    private TreeSet<String> union() {
        TreeSet<String> res = new TreeSet<>();
        while (true) {
            res.addAll(concat());
            if (idx < s.length() && s.charAt(idx) == ',') idx++;
            else return res;
        }
    }

    // Parses the whole expression as a union; TreeSet gives sorted, distinct words
    public List<String> braceExpansionII(String expression) {
        s = expression;
        idx = 0;
        return new ArrayList<>(union());
    }

    // Runs samples
    public static void main(String[] args) {
        List<String> a = new BraceExpansionII().braceExpansionII("{a,b}{c,{d,e}}"), b = new BraceExpansionII().braceExpansionII("{{a,z},a{b,c},{ab,z}}");
        System.out.println((a.equals(List.of("ac", "ad", "ae", "bc", "bd", "be")) && b.equals(List.of("a", "ab", "ac", "z")) ? "OK   " : "FAIL ") + a + " " + b);
    }
}

// union := concat (',' concat)*
private TreeSet<String> union() {
    TreeSet<String> res = new TreeSet<>();
    while (true) {
        res.addAll(concat());
        if (idx < s.length() && s.charAt(idx) == ',') idx++;
        else return res;
    }
}

// Parses the whole expression as a union; TreeSet gives sorted, distinct words
public List<String> braceExpansionII(String expression) {
    s = expression;
    idx = 0;
    return new ArrayList<>(union());
}
```

| Approach | Time | Space |
|---|---|---|
| Recursive descent | output-bound | O(depth + output) |

## Recall before you reveal
<details><summary>Who consumes "}"?</summary>

unit(), after union() returns.

</details>


## Connected
- Parsing with a stack: the Stack folder
