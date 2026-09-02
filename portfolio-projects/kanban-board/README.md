# Delivery flow board

A small, dependency-free Kanban sample designed to make delivery risk visible. It demonstrates explicit workflow policy, WIP enforcement, blocked and ageing work, keyboard-friendly movement, and honest flow metrics.

![Illustrative Jira delivery management report](evidence/jira-delivery-reporting.svg)

The portfolio view translates the tested workflow into a Jira-style management report: release readiness, delivery risk, decisions, and linked documentation. It is explicitly labelled as illustrative sample data rather than a client screenshot.

## Run

Requires Node.js 20+ and Python 3.

```bash
npm test
python3 -m http.server 4173
```

Open <http://localhost:4173>. Use a card's arrow buttons to move it. Every action also works with the keyboard; focus and status changes are announced to assistive technology.

## Quality approach

The workflow rules live in a pure JavaScript model, separate from rendering. The automated suite checks valid and invalid transitions, WIP boundaries, blocked work, ageing flags, and flow calculations without browser timing or network dependencies. Native buttons and landmarks provide a small, robust accessibility surface.

Evidence: [Jira-style management report](evidence/jira-delivery-reporting.svg), [tested board](evidence/kanban-board.png), and [test run](evidence/test-results.txt).

## Deliberate limits

State resets on refresh, metrics use the included fixture, and cards cannot be created or reordered. Those are intentional MVP boundaries: the sample evaluates flow-control decisions rather than persistence or task-management breadth. The next useful increment is an automated accessibility scan in a real browser.
