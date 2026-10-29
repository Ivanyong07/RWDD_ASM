# Fun Collectors: user pages (frontend)

Put this `user` folder at **`project/frontend/user/`**. The login page already sends users to `frontend/user/index.html`.
Design: a clean dashboard on a `#f5f3e9` background. Every box has a soft green layer behind it, and every page starts with a banner showing the user's points and rank.
Small leaves move slowly in the background (made by `js/effects.js`). There are no fixed corner leaves: add your own pictures if you want them.

## 1. Folder map
```
user/
├── index.html        Challenge page (the page after login)
├── history.html      History page
├── badges.html       Badges page
├── rewards.html      Rewards page
├── leaderboard.html  Leaderboard page (top 20 users by points)
├── css/
│   ├── base.css         colours, font, reset                       (every page)
│   ├── layout.css       top bar, sidebar, main area, responsive    (every page)
│   ├── components.css   cards, chips, buttons, upload box, toast   (every page)
│   ├── effects.css      the few animations                         (every page)
│   └── challenge.css  history.css  badges.css  rewards.css  leaderboard.css   (one page each)
├── js/
│   ├── config.js         settings: backend address, photo folder, timings
│   ├── icons.js          small icons drawn with code
│   ├── sample-data.js    TEMPORARY data (delete when the backend is ready)
│   ├── sample-store.js   TEMPORARY pretend backend (delete when the backend is ready)
│   ├── api.js            the ONLY file that gets data: every page calls its functions
│   ├── common.js         helpers, toast, search, top bar, user menu, banner with points and rank
│   ├── effects.js        opening picture, moving leaves, number count-up
│   └── challenge.js  history.js  badges.js  rewards.js  leaderboard.js         (one page each)
└── images/           photos (empty, see section 4)
```
HTML = structure only. CSS = look only. JS = behaviour only. Each page loads the shared files first and its own file last (the order is written in the HTML).
On a computer the menu is a sidebar. On a tablet or phone the top bar and the menu stay fixed (menu at the bottom).

## 2. Connecting the backend (for the backend teammates)
1. In `js/config.js` set `USE_SAMPLE_DATA = false`.
2. In `js/config.js` change `ENDPOINTS` to the real PHP files (they are called as `API_BASE + "/" + file`).
3. Delete `js/sample-data.js` and `js/sample-store.js`, and remove their `<script>` lines from the five HTML files.

Only `js/api.js` talks to the backend. These are the shapes the pages expect (JSON):

| Function in api.js | Returns |
|---|---|
| `getProfile()` | `{ user:{name,picture}, points, lifetime, spent, rank:{level,name,min_points}, next_rank:{...}\|null, ranks:[{level,name,min_points}], stats:{approved,pending,badges,badge_total} }` |
| `getChallenges()` | `{ challenges:[{id,title,description,difficulty,points,image,time_limit_hours,status,joined_at,deadline,note}] }` (see the challenge rules below) |
| `getHistory()` | `{ history:[{type,title,points,date,note}] }` where type is `earn`, `spend`, `pending` or `rejected` |
| `getBadges()` | `{ badges:[{id,name,description,image,earned}] }` (read from the database) |
| `getRewards()` | `{ rewards:[{id,name,description,cost,min_level,image}] }` (read from the database) |
| `getLeaderboard()` | `{ leaderboard:[{name,picture,points,rank_name,rank_level,is_me}], me:{position,name,picture,points,rank_name,rank_level,is_me} }` |
| `joinChallenge(id)` | POST JSON `{challenge_id}`; starts the time limit; returns `{ message, deadline }` |
| `submitChallengePhoto(id, file)` | POST form data `challenge_id` + `photo`; only allowed after joining and before the deadline; returns `{ message }` |
| `redeemReward(id)` | POST JSON `{reward_id}`; returns `{ message, new_badges:[names] }` |

**Challenge rules (join, time limit, status):**
1. The user presses **Join**. The backend saves the join time and a `deadline` = join time + the challenge's `time_limit_hours`.
2. The user must upload the photo before the `deadline`. After the deadline the backend must refuse the photo (error message "The time is up. Please join the challenge again.").
3. `status` of the user's latest try of a challenge is one of: `open` (never joined), `joined` (time is running, no photo yet), `pending` (photo sent, waiting for the admin), `approved`, `rejected`.
   The page shows a `joined` challenge whose deadline has passed as "Time is up" and lets the user join again (the backend can also save it as expired).
4. `note` is the admin's reason when the status is `rejected`. `joined_at` and `deadline` are `null` while `open`.
5. A user cannot join a challenge that is `joined` (time still running) or `pending`. After `approved`, `rejected` or a passed deadline the user can join again.
The Challenge page has two rows of choices that work together: Status (All, Available, In progress, Pending, Approved, Rejected) and Level (All levels, Beginner, Intermediate, Advanced), with a count on each.
`difficulty` must be exactly `beginner`, `intermediate` or `advanced`.
The `time_limit_hours` can be different for each challenge (24 = 1 day, 168 = 7 days).

**Leaderboard:** `leaderboard` is the top 20 users, highest total points first (the page never shows more than 20).
`points` is the total points the user has earned, so spending points does not move a user down.
`me` is the logged-in user with their real `position`, even when outside the top 20. Set `is_me: true` on that user's row.

On a failure the backend should answer with an HTTP error code and `{ "error": "message" }`. The message is shown to the user. Code `401` sends the user to the login page.
`rank.level` should match the user's `level` in the database. `image` is a path inside `images/` (for example `badges/first-step.jpeg`).

## 3. Trying the pages without a backend
`USE_SAMPLE_DATA` is `true` by default. The pages then use `sample-data.js` and keep their state in the browser.
The user menu has **Demo: approve my pending photos** and **Demo: reject my pending photos** buttons that pretend to be an admin. They disappear automatically when the backend is on.

## 4. Photos (all left blank: add them yourselves)
No picture file name is written in the code. Every photo slot is empty until a path is written in it.
Put the photos inside `images/`, then write their path (for example `badges/first-step.jpeg`) in the place shown below.

| Photo | Where to write the path |
|---|---|
| website logo (top bar) | `LOGO_PICTURE` in `js/config.js` |
| default profile picture | `DEFAULT_PROFILE_PICTURE` in `js/config.js` |
| opening picture | `OPENING_PICTURE` in `js/config.js` |
| challenge photos | `image` of each challenge in `js/sample-data.js` (later: the database) |
| badge pictures | `image` of each badge in `js/sample-data.js` (later: the database) |
| reward photos | `image` of each reward in `js/sample-data.js` (later: the database) |
| users' pictures (profile, leaderboard) | `picture` of the user (later: the database) |

Suggested sizes: logo and profile picture 300 x 300, opening picture 1920 x 1080, challenge and reward photos 800 x 450, badge pictures 400 x 400.

## 5. Where to change things
| I want to change... | Edit |
|---|---|
| colours, font, card style | `:root` in `css/base.css` |
| the green layer behind the boxes | `--layer` in `css/base.css` |
| the banner with points and rank | `.hero` in `css/components.css`, `renderHero()` in `js/common.js` |
| number, size and speed of the moving leaves | `spawnFallingLeaves()` in `js/effects.js` |
| width of the sidebar, height of the bars | `:root` in `css/base.css` |
| opening picture time / number of strips | `js/config.js` |
| hover and fade effects | `css/effects.css` |
