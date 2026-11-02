# about-me: personal portfolio site

> **This is NOT the Next.js you know.** Next.js 16 has breaking changes: APIs, conventions
> and file structure may all differ from your training data. Read the relevant guide in
> `frontend/node_modules/next/dist/docs/` before writing any code, and heed deprecation notices.

A static personal portfolio for Md. Rabiul Hassan Mahmud, built with Next.js 16 and
Tailwind CSS 4. It is exported to plain HTML/JS/CSS, stored in a private S3 bucket and
served through CloudFront. There is **no backend**.

- Live site: https://d1v1dl0szqy9d2.cloudfront.net
- Deploy branch: `static-for-s3` (every push deploys automatically)
- AWS: account 438641188642, region `us-east-1`, CloudFormation stack `about-me`

## Repository layout

```
frontend/                  Next.js app (the whole site)
  src/app/                 layout.tsx, page.tsx, globals.css, icon.png, apple-icon.png
  src/components/          Portfolio.tsx (section switcher), Hero, Navbar, About, Skills,
                           Experience, Projects, AiCourses, Contact, Footer, icons.tsx
  src/lib/content.ts       ALL site content (profile, skills, experience, projects, courses)
  src/lib/types.ts         Content types
  src/lib/sections.ts      Navigation sections
  public/image-me.jpeg     Profile photo (hero, navbar, favicon)
  next.config.ts           output: "export", images.unoptimized
infra/
  template.yaml            CloudFormation: private S3 bucket + CloudFront (OAC)
  deploy.sh                Deploy stack, build, upload to S3, invalidate CloudFront
  github-oidc.yaml         One-time IAM role for GitHub Actions (OIDC, no stored keys)
.github/workflows/
  deploy-aws.yml           Runs infra/deploy.sh on push to static-for-s3
Md_Rabiul_Hassan_Mahmud.pdf  The CV; source of truth for site content
```

## Working on the site

All commands run from `frontend/` with Node 22.

```bash
npm run dev     # http://localhost:3000
npm run build   # static export to frontend/out/
npm run lint
```

- **Change content:** edit `frontend/src/lib/content.ts` only. It is imported directly by
  `Portfolio.tsx`; there is no API and no data fetching.
- **Static-export rules:** no server features (Route Handlers that read the request,
  Server Actions, cookies/headers, dynamic routes without `generateStaticParams`, the default
  `next/image` optimizer). Check `frontend/node_modules/next/dist/docs/` before adding Next
  features (see the note at the top).
- Never put the home address or phone number on the site.

## Deployment

### How it works
- `infra/template.yaml` creates:
  - A private, encrypted S3 bucket (CloudFormation names it, e.g. `about-me-sitebucket-sda5fkwhu16i`).
  - A CloudFront distribution (`E296C6EATQCLWO`) that alone can read the bucket via Origin
    Access Control. It redirects HTTP to HTTPS, compresses, uses HTTP/2+3, `PriceClass_100`,
    and serves `/404.html` for missing pages (S3 returns 403 for missing keys).
- `infra/deploy.sh` (env: `STACK_NAME`=about-me, `AWS_REGION`=us-east-1, optional `AWS_PROFILE`):
  1. `aws cloudformation deploy` of `template.yaml` (creates the bucket and distribution on first run).
  2. `npm ci` and `npm run build` in `frontend/`.
  3. Uploads `out/_next/static` with `Cache-Control: public,max-age=31536000,immutable`
     (hashed files), and everything else with `public,max-age=0,must-revalidate` and `--delete`.
  4. Invalidates CloudFront `/*`.

### CI/CD
`.github/workflows/deploy-aws.yml` runs on every push to `static-for-s3` (and on manual
`workflow_dispatch`). It uses Node 22 and assumes an AWS role via GitHub OIDC, using the
repo secret `AWS_DEPLOY_ROLE_ARN`, then runs `infra/deploy.sh`. Deploys never overlap
(concurrency group `deploy-aws`). A run takes about 4–5 minutes.

### One-time AWS setup (already done)
1. Create the deploy role with an admin profile (the local IAM user `aiengineer` lacks
   IAM/CloudFormation permissions):
   ```bash
   aws cloudformation deploy --template-file infra/github-oidc.yaml \
     --stack-name about-me-github-oidc --capabilities CAPABILITY_NAMED_IAM --region us-east-1
   ```
   Add `--parameter-overrides CreateOidcProvider=false` if the account already has the
   `token.actions.githubusercontent.com` provider. The role (`about-me-github-deploy`) can only
   be assumed from `khassanmahmud/about-me` on branch `static-for-s3`. Its permissions are
   limited to the `about-me` stack, `about-me-sitebucket-*` buckets and CloudFront. If the
   deploy branch changes, update both `deploy-aws.yml` and the `DeployBranch` parameter.
2. Save the role ARN as the GitHub secret `AWS_DEPLOY_ROLE_ARN`.

## History of changes (2026-11-02)

The project used to be a Next.js frontend (standalone server in Docker) plus an Express API
in `backend/`, both deployed as containers to Azure. It was converted to a static,
backend-free site on AWS:

1. Tried, then reverted at the user's request: deploying the API to Lambda behind the same
   CloudFront distribution.
2. **Removed the API dependency.** The frontend's bundled `src/lib/fallback.ts` was checked to
   be identical to `backend/src/data/*`, renamed to `src/lib/content.ts` (exports `profile`,
   `skillCategories`, `techBadges`, `experiences`, `projects`, `courses`), and
   `Portfolio.tsx` now renders it directly. Removed `src/lib/api.ts`, the loading spinner and
   the "Couldn't reach the API" notice. The slide-up animation when switching sections was kept.
3. **Static export.** `next.config.ts` changed from `output: 'standalone'` to
   `output: "export"` with `images: { unoptimized: true }`. The `start` and `backend:*`
   scripts and `scripts/copy-standalone-assets.mjs` were removed.
4. **AWS infrastructure and deploy script.** Added `infra/template.yaml` and `infra/deploy.sh`.
5. **CI/CD.** Added `.github/workflows/deploy-aws.yml` and `infra/github-oidc.yaml`. The
   deploy branch was first `for-aws`, then changed to `static-for-s3`.
6. **Removed unused code and files:** all of `backend/`, the Azure workflows
   (`main_about-me.yml`, `main_about-me-api.yml`), `frontend/Dockerfile`,
   `frontend/.dockerignore`, and the create-next-app placeholder SVGs in `frontend/public`.
   Added a root `.gitignore` for `.DS_Store`.
7. **First deploy succeeded**, and the live site was verified: home 200, photo 200, unknown
   path 404, HTTP redirects to HTTPS, direct S3 access 403, cache headers as above.
8. Hero heading "What I do" changed to "What I do?".

## Open items
- No custom domain yet. It would need an ACM certificate in us-east-1, `Aliases` and
  `ViewerCertificate` in `template.yaml`, and a DNS record.
- Old Azure resources (web apps `about-me`, the API app, registry `projectacr`) may still be
  running and should be deleted in the Azure portal.
- `azure_kubernetes_complete_roadmap.md` is unrelated personal notes, kept on purpose.
  `frontend/README.md` is still the create-next-app default.
