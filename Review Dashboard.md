---
type: dashboard
tags: [java-brain]
---
# 🔁 Review Dashboard
Needs the **Dataview** plugin (already installed). Spacing: stage 0 → 1d, 1 → 3d, 2 → 7d, 3 → 21d, 4 → 60d.

## Due today or overdue (mixed topics = interleaving)
```dataview
TABLE topic, pattern, review_stage AS "stage", next_review AS "due"
FROM ""
WHERE next_review AND next_review <= date(today)
SORT next_review ASC
```

## Coming up this week
```dataview
TABLE topic, next_review AS "due"
FROM ""
WHERE next_review AND next_review > date(today) AND next_review <= date(today) + dur(7 days)
SORT next_review ASC
```

## All problems by pattern
```dataview
TABLE WITHOUT ID file.link AS "Problem", topic, pattern, difficulty
FROM ""
WHERE next_review
SORT topic ASC
```
