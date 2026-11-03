# Deploy the portfolio to Cloudflare Pages

Production is **https://lucasnguyen.pages.dev/**.

- Pages project: `lucasnguyen`
- Production branch: `main`
- Cloudflare account: `6af8dfe8b9a25354be49976e97eee3f2`
- Build command: `npm run build`
- Upload directory: `dist/`
- Publish command: `npx wrangler pages deploy`

This project uses direct uploads. Pushing to GitHub alone does not deploy it.
Wrangler 4.156.2 supports the commands below. Node.js 20 or later is required by this repository.

## Authenticate

Check the existing session with `npx wrangler whoami`. If needed, run
`npx wrangler login` and complete the browser login for the account above.

## Build and publish the pushed commit

Run from this repository on `main`, after committing and pushing the intended changes.
Review `git status --short` and stage explicit paths when other work is present.
For a shared file with unrelated edits, stage only the intended hunks.

The commands below require `HEAD` to match `origin/main` and build an isolated
archive of that commit. Local uncommitted edits are preserved and excluded from
the upload. Run the block in Bash or Zsh:

```sh
(
  set -eu
  set -o pipefail

  test "$(git branch --show-current)" = main
  git fetch origin
  release_commit=$(git rev-parse HEAD)
  test "$release_commit" = "$(git rev-parse origin/main)"
  release_message=$(git log -1 --format=%s)
  release_dir=$(mktemp -d "${TMPDIR:-/tmp}/lucas-portfolio-pages.XXXXXX")

  git archive "$release_commit" | tar -x -C "$release_dir"
  cd "$release_dir"
  npm run check
  npm run build

  CLOUDFLARE_ACCOUNT_ID=6af8dfe8b9a25354be49976e97eee3f2 \
    npx wrangler pages deploy dist \
      --project-name lucasnguyen \
      --branch main \
      --commit-hash "$release_commit" \
      --commit-message "$release_message"
)
```

Wait for Wrangler's deployment success message and record the returned deployment URL.
Use `--branch main` for production; other branch names create preview deployments.

## Verify production

```sh
npx wrangler pages deployment list \
  --project-name lucasnguyen --environment production --json

git rev-list --left-right --count HEAD...origin/main
git status --short
```

Confirm the newest production deployment references the pushed commit. Git's count
should be `0 0`; report any remaining local edits separately.

Open **https://lucasnguyen.pages.dev/** on desktop and mobile and verify the changed
content, thumbnails, project links, language switching and filters. When promoting
projects, also check `/hidden/` and the projects' indexability metadata.
Compare the served files with the isolated `dist/` output when confirming the exact
version. Report the live URL and commit only after production verification succeeds.
