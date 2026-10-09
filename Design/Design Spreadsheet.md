---
topic: Design
pattern: [Simulation, Parsing]
source: LeetCode 3484
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Design Spreadsheet

> [!TIP]
> **🧠 Memory hook**
> A calculator that can look up cells.
> **Mantra: PARSE "=X+Y", CELL OR NUMBER**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=13) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
setCell, resetCell and getValue("=X+Y") where operands are cell references or integers.

## Key insight
Column = letter − 'A', row = the number after it. Split the formula at "+".

## Approach: Grid + parsing
```java
// 26 columns × rows grid; a formula "=X+Y" adds two operands that are cells or numbers
static class Spreadsheet {
    private final int[][] grid;

    Spreadsheet(int rows) { grid = new int[rows + 1][26]; }

    // "B12" → grid cell (column letter, 1-based row)
    public void setCell(String cell, int value) { grid[Integer.parseInt(cell.substring(1))][cell.charAt(0) - 'A'] = value; }

    // Reset to 0
    public void resetCell(String cell) { setCell(cell, 0); }

    // An operand is a cell if it starts with a letter, otherwise a number
    private int value(String op) {
        return Character.isLetter(op.charAt(0)) ? grid[Integer.parseInt(op.substring(1))][op.charAt(0) - 'A'] : Integer.parseInt(op);
    }

    // Split "=X+Y" at '+'
    public int getValue(String formula) {
        int plus = formula.indexOf('+');
        return value(formula.substring(1, plus)) + value(formula.substring(plus + 1));
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Grid + parsing | O(1) / O(L) | O(rows) |

## Recall before you reveal
<details><summary>How do you tell a cell from a number?</summary>

Character.isLetter(first char).

</details>

