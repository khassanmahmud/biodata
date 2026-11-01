# about-me API server

Standalone Express + TypeScript API for the `about-me` portfolio site. The portfolio
content (profile, skills, experience, projects) that previously lived only inside the
React components is now served over HTTP.

## Requirements

- Node.js 20+
- npm

## Setup

```bash
cd backend
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

From the repository root you can use `npm run backend:dev`, `npm run backend:build`
and `npm run backend:start` instead.

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
| GET    | `/health`                | Liveness probe with uptime                        |
| GET    | `/api/profile`           | Name, title, tagline, summary, stats, socials     |
| GET    | `/api/skills`            | Skill categories with levels + flat tech badges   |
| GET    | `/api/experience`        | Full work history                                 |
| GET    | `/api/experience/:id`    | Single role by id                                 |
| GET    | `/api/projects`          | All projects; `?featured=true\|false` to filter   |
| GET    | `/api/projects/:id`      | Single project by id                              |

### Examples

```bash
curl http://localhost:4000/api/projects?featured=true
curl http://localhost:4000/api/projects/openauth
```

List endpoints return `{ "data": [...], "count": n }`; single-resource endpoints
return `{ "data": { ... } }`.

## Error format

All errors share one shape:

```json
{
  "error": {
    "status": 404,
    "message": "No project found with id \"example\""
  }
}
```

`400` invalid query parameter · `404` unknown route or resource · `500` unexpected
server error.

## Notes

- The frontend calls this API from `src/lib/api.ts` using
  `NEXT_PUBLIC_API_URL`, which defaults to `http://localhost:4000`. Set it at the
  repository root (not in `src/`) to point somewhere else.

## Layout

```
backend/
├── src/
│   ├── index.ts            # entry point: reads PORT, starts the listener
│   ├── app.ts              # express app factory: CORS, /health, routes
│   ├── errors.ts           # HttpError
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
│       └── portfolio.ts    # profile / skills / experience / projects
├── .env.example
├── package.json
└── tsconfig.json
```
