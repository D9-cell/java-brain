---
topic: Design
pattern: [Simulation]
source: LeetCode 2043
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Simple Bank System

> [!TIP]
> **🧠 Memory hook**
> A teller who checks your ID and balance before touching money.
> **Mantra: VALIDATE, THEN APPLY**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=29) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
transfer, deposit, withdraw on 1-based accounts.

## Key insight
Validate the account numbers and balance, then update.

## Approach: Array
```java
// Balances array (accounts are 1-based) with validity checks before every change
static class Bank {
    private final long[] bal;

    Bank(long[] balance) { bal = balance; }

    // Account number is between 1 and n
    private boolean valid(int a) { return a >= 1 && a <= bal.length; }

    // Both accounts valid and enough money in the source
    public boolean transfer(int a1, int a2, long money) {
        if (!valid(a1) || !valid(a2) || bal[a1 - 1] < money) return false;
        bal[a1 - 1] -= money;
        bal[a2 - 1] += money;
        return true;
    }

    // Valid account
    public boolean deposit(int a, long money) {
        if (!valid(a)) return false;
        bal[a - 1] += money;
        return true;
    }

    // Valid account with enough money
    public boolean withdraw(int a, long money) {
        if (!valid(a) || bal[a - 1] < money) return false;
        bal[a - 1] -= money;
        return true;
    }
}
```

| Approach | Time | Space |
|---|---|---|
| Array | O(1) | O(n) |

## Recall before you reveal
<details><summary>Index?</summary>

account − 1.

</details>

