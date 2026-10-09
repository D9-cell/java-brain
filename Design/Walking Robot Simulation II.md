---
topic: Design
pattern: [Cycle precomputation]
source: LeetCode 2069
difficulty: Medium
review_stage: 0
next_review: 2026-10-07
tags: [java-brain, design]
---
# Walking Robot Simulation II

> [!TIP]
> **🧠 Memory hook**
> A racetrack: the robot only laps the border, so its position is an index on the lap.
> **Mantra: PRECOMPUTE PERIMETER, step % LEN, ORIGIN FACES SOUTH**

**Animation:** [▶ Open in browser](https://d9-cell.github.io/java-brain/Design/Design%20Animations.html#p=32) · **Pattern hub:** [Design - Pattern Map](Design%20-%20Pattern%20Map.md)

## Problem
step(num), getPos(), getDir() for a robot that turns left at walls.

## Key insight
The robot never leaves the perimeter. Precompute the perimeter cells and their facing direction, then move an index modulo its length.

## Approach: Perimeter list
```java
// The robot only ever walks the border: precompute the perimeter cells with their facing direction
static class Robot {
    private final List<int[]> pos = new ArrayList<>();
    private final List<String> dir = new ArrayList<>();
    private int i = 0;
    private boolean moved = false;

    // Perimeter in walking order: East along the bottom, North up the right, West along the top, South down the left
    Robot(int width, int height) {
        for (int x = 0; x < width; x++) { pos.add(new int[]{x, 0}); dir.add("East"); }
        for (int y = 1; y < height; y++) { pos.add(new int[]{width - 1, y}); dir.add("North"); }
        for (int x = width - 2; x >= 0; x--) { pos.add(new int[]{x, height - 1}); dir.add("West"); }
        for (int y = height - 2; y > 0; y--) { pos.add(new int[]{0, y}); dir.add("South"); }
        dir.set(0, "South");
    }

    // Move num steps around the cycle
    public void step(int num) {
        moved = true;
        i = (i + num) % pos.size();
    }

    // Current cell
    public int[] getPos() { return pos.get(i); }

    // At the origin the robot faces East until it has moved; afterwards it arrives there facing South
    public String getDir() { return !moved ? "East" : dir.get(i); }
}
```

| Approach | Time | Space |
|---|---|---|
| Perimeter list | O(1) per op | O(w + h) |

> [!WARNING]
> **Java gotcha**
> Verified against a literal step-by-step walk on random grids.

## Recall before you reveal
<details><summary>The trap?</summary>

After any movement, being at (0,0) means facing South.

</details>

