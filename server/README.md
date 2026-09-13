# about-me API server

Standalone Express + TypeScript API for the `about-me` portfolio site. The portfolio
content (profile, skills, experience, projects) that previously lived only inside the
React components is now served over HTTP, and the contact form posts to it.

## Requirements

- Node.js 20+
- npm

## Setup

```bash
cd server
npm install
cp .env.example .env   # optional, defaults work out of the box
```

> Note: if your shell has `NODE_ENV=production` set, npm skips dev dependencies.
> Install with `npm install --include=dev` in that case.

## Scripts

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start with `tsx watch` (auto-reload on save) |
| `npm run build`     | Compile TypeScript to `dist/`                |
| `npm start`         | Run the compiled server from `dist/`         |
| `npm run typecheck` | Type-check without emitting                  |

From the repository root you can use `npm run server:dev`, `npm run server:build`
and `npm run server:start` instead.

## Environment variables

| Variable      | Default                 | Description                                            |
| ------------- | ----------------------- | ------------------------------------------------------ |
| `PORT`        | `4000`                  | Port the API listens on                                |
| `CORS_ORIGIN` | `http://localhost:3000` | Comma-separated allowed origins, or `*` to allow any   |

## Endpoints

Base URL: `http://localhost:4000`

| Method | Path                     | Description                                       |
| ------ | ------------------------ | ------------------------------------------------- |
| GET    | `/`                      | Service index listing every available endpoint    |
| GET    | `/health`                | Liveness probe with uptime and message count      |
| GET    | `/api/profile`           | Name, title, tagline, summary, stats, socials     |
| GET    | `/api/skills`            | Skill categories with levels + flat tech badges   |
| GET    | `/api/experience`        | Full work history                                 |
| GET    | `/api/experience/:id`    | Single role by id                                 |
| GET    | `/api/projects`          | All projects; `?featured=true\|false` to filter   |
| GET    | `/api/projects/:id`      | Single project by id                              |
| POST   | `/api/contact`           | Submit a contact message                          |

### Examples

```bash
curl http://localhost:4000/api/projects?featured=true
curl http://localhost:4000/api/projects/openauth

curl -X POST http://localhost:4000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Project inquiry",
    "message": "I would like to discuss a new project with you."
  }'
# 201 -> { "ok": true, "id": "...", "receivedAt": "..." }
```

List endpoints return `{ "data": [...], "count": n }`; single-resource endpoints
return `{ "data": { ... } }`.

### Validation

`POST /api/contact` requires `name` (2–100), `email` (valid address, ≤254),
`subject` (3–150) and `message` (10–5000) characters. Values are trimmed.
Failures return `422` with a per-field list.

## Error format

All errors share one shape:

```json
{
  "error": {
    "status": 422,
    "message": "Validation failed",
    "details": [{ "field": "email", "message": "Email must be a valid email address" }]
  }
}
```

`400` invalid/malformed body · `404` unknown route or resource · `422` validation
failure · `500` unexpected server error.

## Notes

- Contact messages are stored **in memory** and are lost on restart. Swap
  `src/messages.ts` for a database, email provider, or queue before relying on it.
- There is no rate limiting on `POST /api/contact` yet — add one (e.g.
  `express-rate-limit`) before exposing this publicly.
- The frontend calls this API from `src/components/Contact.tsx` using
  `NEXT_PUBLIC_API_URL`, which defaults to `http://localhost:4000`. Set it at the
  repository root (not in `src/`) to point somewhere else.

## Layout

```
server/
├── src/
│   ├── index.ts            # entry point: reads PORT, starts the listener
│   ├── app.ts              # express app factory: CORS, JSON, /health, routes
│   ├── errors.ts           # HttpError
│   ├── messages.ts         # in-memory contact message store
│   ├── types.ts            # shared domain types
│   ├── data/               # portfolio content
│   │   ├── profile.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   └── projects.ts
│   ├── middleware/
│   │   └── errorHandler.ts # 404 + centralised error responses
│   └── routes/
│       ├── index.ts        # mounts routers under /api
│       ├── portfolio.ts    # profile / skills / experience / projects
│       └── contact.ts      # POST /api/contact
├── .env.example
├── package.json
└── tsconfig.json
```
