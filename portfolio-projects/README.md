# Portfolio projects

Runnable QA samples and leadership evidence linked from the site.

| Folder | Kind | Public target / artifact | Site slug |
| --- | --- | --- | --- |
| [`frontend-automation/qa-the-internet`](frontend-automation/qa-the-internet) | Automation | [the-internet.herokuapp.com](https://the-internet.herokuapp.com/) | `frontend-automation` |
| [`backend-automation`](backend-automation) | Automation | [restful-booker.herokuapp.com](https://restful-booker.herokuapp.com/) | `backend-automation` |
| [`performance-testing`](performance-testing) | Automation | [restful-booker.herokuapp.com](https://restful-booker.herokuapp.com/) | `performance-testing` |
| [`ai-driven-testing`](ai-driven-testing) | Automation | AI workflow + offline eval sample | `ai-driven-testing` |
| [`employee-schedules`](employee-schedules) | Leadership | Illustrative Jira bug tracking dashboard | `gantt-schedules` |

## Verify

From the repository root:

```bash
npm run verify:samples
```

That runs the four automation samples. Leadership folders are evidence-only and are
checked for required screenshot files.

Live / network-dependent browser automation:

```bash
npm run verify:live
```
