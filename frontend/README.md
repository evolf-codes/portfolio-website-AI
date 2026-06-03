# Portfolio frontend

Next.js client-rendered portfolio for Eric Volfson (Work, About, Contact).

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run start
npm run start:local   # build + serve on http://127.0.0.1:3002
npm run lint
npm run test         # Vitest unit tests
npm run test:e2e     # needs `npm run build` first (or use test:all)
npm run test:all     # unit tests + production build + e2e (includes CSS check)
```

After UI or CSS changes, run **`npm run test:all`** before handing off. The e2e suite includes a stylesheet check so unstyled “plain text” regressions are caught when `.next` is out of sync.

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_EMAIL` | No | Public contact address (default: eric.volfson@gmail.com) |
| `FORMSPREE_FORM_ID` | For contact send | Server-side Formspree delivery |

### Contact form (one-click email)

1. Sign up at [formspree.io](https://formspree.io).
2. Create a new form and set the notification email (e.g. an iCloud alias that forwards to `eric.volfson@gmail.com`).
3. Copy the form ID from the endpoint URL (`https://formspree.io/f/mjgdvkqj` → `mjgdvkqj`).
4. Add to `frontend/.env.local`:

```bash
FORMSPREE_FORM_ID=mjgdvkqj
```

5. Restart the dev server. Submissions on `/contact` are sent to your Formspree inbox without opening the visitor’s mail app.

If `FORMSPREE_FORM_ID` is missing, Submit falls back to opening a `mailto:` draft to `NEXT_PUBLIC_SITE_EMAIL`.

### Submitted but no email?

1. Open [Formspree](https://formspree.io) → your form → **Submissions**. If entries appear, the site works; email delivery is the issue.
2. In the form **Workflow**, confirm an **Email** action targets your verified address (`58_bent.sleigh@icloud.com`).
3. In **Account → Linked emails**, verify that iCloud address is confirmed.
4. Check **Spam** inside the Formspree dashboard first, then spam/junk on iCloud and Gmail.
5. If Formspree blocked delivery: [formspree.io/unblock/58_bent.sleigh@icloud.com](https://formspree.io/unblock/58_bent.sleigh@icloud.com)

### Styling looks like plain text?

That usually means an old `next start` process is serving HTML that points at missing CSS. Stop the server, then run `npm run start:local` (rebuilds and serves on port 3002). For day-to-day work, `npm run dev` avoids this.
