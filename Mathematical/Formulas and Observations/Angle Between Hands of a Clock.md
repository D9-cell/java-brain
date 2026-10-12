---
topic: Formulas and Observations
pattern: [Rates, Fold the angle]
source: LeetCode 1344
difficulty: Medium
companies: [Microsoft]
review_stage: 0
next_review: 2026-10-13
tags: [java-brain, math]
---
# Angle Between Hands of a Clock

> [!TIP]
> **🧠 Memory hook**
> Minute hand **6°/min**, hour hand **30°/hour + 0.5°/min**. Take the difference and fold: **min(d, 360 − d)**.
> **Mantra: m = 6·min · h = 30·(hour%12) + 0.5·min · min(|h − m|, 360 − |h − m|)**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Mathematical/Formulas%20and%20Observations/Formulas%20and%20Observations%20Animations.html#p=10) · **Pattern hub:** [Formulas and Observations - Pattern Map](Formulas%20and%20Observations%20-%20Pattern%20Map.md)

## Problem
Return the smaller angle in degrees between the hour and minute hands for the given hour and minutes.

## Key insight
The hour hand also moves while minutes pass, which is the usual mistake. hour % 12 maps 12 to 0.

## Approach: Formula
```java
// Minute hand moves 6° per minute, hour hand 30° per hour plus 0.5° per minute
public double angleClock(int hour, int minutes) {
    double m = minutes * 6.0;
    double h = (hour % 12) * 30.0 + minutes * 0.5;
    double diff = Math.abs(h - m);
    return Math.min(diff, 360 - diff);
}
```

| Approach | Time | Space |
|---|---|---|
| Formula | O(1) | O(1) |

> [!WARNING]
> **Java gotcha**
> Checked against a brute-force version on random inputs when it was written.

## Recall before you reveal
<details><summary>Why 0.5° per minute?</summary>

30° per hour spread over 60 minutes.

</details>


<details><summary>Why fold?</summary>

The two angles between the hands add to 360°; the smaller is wanted.

</details>


## Connected
- [Minimum Time Visiting All Points](Minimum%20Time%20Visiting%20All%20Points.md)
