# Mabel — Make Every Buck Last

A responsive, front-end hackathon prototype for a Gen Z personal-finance experience built around a ₹10,000 / 30-day challenge.

## Run it
- Open `app/index.html` in a modern browser, or serve the folder with a local static server.
- Choose **Explore the demo instead** to enter sample data.
- Create a local prototype account to test signup/login.
- No build step or package install is required.

## Included app areas
- Local signup/login flow and demo session
- Overview dashboard and responsive navigation
- Expense/income tracker with categories, search and delete
- What-if simulator for purchases and unexpected costs
- Month plan controls (budget, days, current day)
- Savings goals and goal contributions
- Bills and subscriptions management
- Challenges, aura and badges
- Spending breakdowns, seven-day chart and indicative risk/forecast
- Profile settings, dark mode, vibe mode, local JSON export and reset
- Responsive mobile layout

## Important limitations before judging / public deployment
This is a **client-side prototype**, not production-ready financial software:
- Authentication is local-only and not secure for real accounts; password values are stored locally in this prototype.
- Data lives in browser localStorage; no server, database, cross-device sync, email verification, password reset, or multi-user backend.
- The forecast and risk indicator are simplified estimates, not financial advice.
- Recurring costs are tracked but not automatically deducted from balance.
- Challenge progress is a demo representation; rigorous day-by-day challenge validation is not yet implemented.
- Do not enter real credentials or sensitive financial data.

For a real deployment, replace local authentication/storage with a server-side auth provider and database, add validation and security tests, and run accessibility/browser checks.

## Folder guide
- `app/` — working responsive product prototype
- `landing-last-step/index.html` — your original landing page preserved separately for the final integration step
- `reference/claude-source/` — source snippets you supplied, preserved unmodified for reference

## Suggested final hackathon QA
1. Test demo entry and signup/login in a fresh browser profile.
2. Log an expense and income; verify the dashboard and insights update.
3. Run a purchase simulation and add a shock expense.
4. Create and fund a goal.
5. Add/pause a subscription or bill.
6. Join a challenge, switch vibe and dark mode, export data.
7. Test phone widths around 360px, 390px and 430px, then desktop at 1366px.
8. Verify deployment URL, repo visibility and submission form links.
