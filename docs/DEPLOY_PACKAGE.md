# NEXSPPF Production Deploy Package

Status: prepared only. Do not treat this document as proof that production has been deployed.

## Goal

Run the NEXS PPF Next.js app as an isolated Docker service and route only `nexsppf.com` / `www.nexsppf.com` to it from the host-level reverse proxy.

## Safety Rules

- Do not bind the app container directly to public ports 80/443.
- Do not edit catch-all/default reverse proxy blocks.
- Do not stop or restart unrelated containers/services.
- Use a dedicated service/container name: `nexsppf-web`.
- Use a loopback-only host port by default: `127.0.0.1:3102`.
- Deploy only from a clean, reviewed Git commit; do not deploy a dirty working tree.

## Files Added

- `Dockerfile` — multi-stage Node/Next.js production image.
- `docker-compose.yml` — isolated service bound to `${NEXSPPF_BIND:-127.0.0.1:3102}:3000`.
- `.dockerignore` — prevents local env/cache/git artifacts from entering Docker build context.
- `deploy/nginx/nexsppf-web.conf` — host-level nginx snippet scoped to `nexsppf.com` and `www.nexsppf.com` only.

## Host-level Deploy Steps

Run these on the actual production host, not inside the Hermes agent container, because the Hermes shell currently has no Docker/nginx/caddy/pm2 and does not own the host-level proxy.

1. Confirm existing services before changing anything:

```bash
docker ps
sudo nginx -T | grep -n "server_name\|proxy_pass" || true
sudo ss -ltnp
```

2. Clone or update the repo to a clean approved commit:

```bash
git clone https://github.com/KApoNG21/nexsppf.git /opt/nexsppf-web
cd /opt/nexsppf-web
git checkout main
git pull --ff-only origin main
git status --short --branch
```

3. Build and start the app on loopback only:

```bash
cd /opt/nexsppf-web
NEXSPPF_BIND=127.0.0.1:3102 docker compose up -d --build nexsppf-web
docker compose ps
docker logs --tail=100 nexsppf-web
curl -I http://127.0.0.1:3102/
```

4. Add reverse proxy routing only for NEXSPPF:

```bash
sudo cp deploy/nginx/nexsppf-web.conf /etc/nginx/conf.d/nexsppf-web.conf
sudo nginx -t
sudo systemctl reload nginx
```

If the host uses a panel, Caddy, Traefik, or another proxy, translate only this rule:

- `nexsppf.com` and `www.nexsppf.com` -> `http://127.0.0.1:3102`

5. Verify live routes:

```bash
curl -I -L https://nexsppf.com/
curl -I -L https://www.nexsppf.com/
curl -I -L https://nexsppf.com/products
curl -I -L https://nexsppf.com/warranty
curl -I -L https://nexsppf.com/r/PRO-1196MXY0401178Q
```

## Rollback

```bash
cd /opt/nexsppf-web
docker compose down
sudo rm -f /etc/nginx/conf.d/nexsppf-web.conf
sudo nginx -t
sudo systemctl reload nginx
```

This rollback touches only the NEXSPPF container and NEXSPPF nginx snippet.

## Current Environment Discovery

From the Hermes agent shell on 2026-05-06:

- Public IP observed: `156.67.214.132`.
- `www.nexsppf.com` resolved via Cloudflare and returned HTTPS 404.
- Direct origin Host-header checks returned 308/404, so host-level routing exists outside the Hermes container.
- Hermes shell has no Docker/nginx/caddy/apache/pm2 available and should not be used as the host-level deploy surface.

## Missing Information

- Actual production host access path and service manager.
- Whether the host proxy is nginx, Caddy, a control panel, Traefik, or another layer.
- Whether SSL is terminated by Cloudflare only or also on the host.
- Which Git commit should be deployed after current local uncommitted changes are reviewed.
