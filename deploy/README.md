# NEXS PPF production deploy

Production domain: `https://nexsppf.com`

## Current deploy model

The repository is pushed to GitHub, but production is updated only when the VPS pulls `main` and rebuilds the Docker container `nexsppf-web`.

The deploy workflow `.github/workflows/deploy.yml` expects a GitHub Actions self-hosted runner on the VPS. If the runner is offline/not registered, the workflow will remain queued and production will not update.

## Manual deploy on VPS

Run on the production VPS only:

```bash
cd /docker/nexsppf-web/repo

git status --short --branch
git pull --ff-only origin main
bash deploy/host-deploy-nexsppf.sh
```

If `git pull` is blocked by untracked Docker files, move them to backup first:

```bash
cd /docker/nexsppf-web/repo
backup_dir="../repo-untracked-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$backup_dir"
for f in .dockerignore Dockerfile docker-compose.yml; do
  [ -e "$f" ] && mv -v "$f" "$backup_dir"/
done

git pull --ff-only origin main
bash deploy/host-deploy-nexsppf.sh
```

## Verify after deploy

```bash
for url in \
  "https://nexsppf.com/" \
  "https://nexsppf.com/products" \
  "https://nexsppf.com/warranty" \
  "https://nexsppf.com/r/PRO-1196MXY0401178Q" \
  "https://nexsppf.com/about-nexs" \
  "https://nexsppf.com/clear-ppf" \
  "https://nexsppf.com/compare" \
  "https://nexsppf.com/faq"; do
  echo "-- $url --"
  curl -fsSI -L --max-time 30 -A 'Mozilla/5.0' "$url" | sed -n '1,20p'
done
```

Expected: every route above returns `HTTP/2 200` or `HTTP/1.1 200` through Cloudflare/Traefik.

## Self-hosted runner requirement

For automatic deployment, register and run a GitHub Actions self-hosted runner for `KApoNG21/nexsppf` on the VPS. The runner must be online and allowed to run jobs labeled `self-hosted`.

Check in GitHub UI:

`https://github.com/KApoNG21/nexsppf/settings/actions/runners`
