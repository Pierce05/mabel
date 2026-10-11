# Mabel product map

The landing page is preserved byte-for-byte at `landing-last-step/index.html`. Do not edit it during app development. Integrate it at the root only after the product passes QA.

| Landing-page promise | Dedicated product page | Connected behaviour |
|---|---|---|
| Plan | Month Plan + Goals | Budget and duration update the daily guide; goals have targets and contributions. |
| Track | Track Money | Expense/income logging, categories, search, deletion and live balance changes. |
| Decide / “Should I buy this?” | Should I Buy This + What-if Lab | Purchase decision, need/want, wait-a-week wishlist, live balance and forecast; unexpected-cost stress tests. |
| Grow | Financial Health + Challenges + Settings | Indicative health score, risk, runway, streaks, quiet mode and progress challenges. |
| Spill the tea / Chai pe charcha | Chai Pe Charcha | Dynamic spending recap, top category, delivery, largest spend, pace, subscriptions and goals. |
| Badges / aura | Badges & Aura | Achievement shelf and daily aura surprise; challenges grant aura on completion. |
| Vision board | Vision Board | Add/edit notes, select sticker and typography, drag notes, double-click text to edit, resize text, rotate, duplicate, delete, clear and reset. Saved in local browser storage. |
| Aesthetic / Chill | Vibe selector on login and in app header | The selected mode changes the palette, typography, component styling and copy mode across the app. |

## Run locally

From `app/` run `py -m http.server 5500` and open `http://localhost:5500`.

## Prototype boundaries

Authentication and persistence are local-browser prototypes, not production authentication. Data does not sync between devices. Financial scores and projections are educational estimates, not financial advice. Challenge progress is explicitly user-confirmed and checked against the transaction log where practical; it is not a bank connection.
