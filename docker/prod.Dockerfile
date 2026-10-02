ARG NODE_IMAGE=node:24.21.0-trixie-slim

# --- deps: install all dependencies (dev deps are needed to build) ---
FROM ${NODE_IMAGE} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- builder: compile the app ---
FROM ${NODE_IMAGE} AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# Public URL, inlined in the bundle at build time (not a secret)
ARG NEXT_PUBLIC_BACK_END_URL
ENV NEXT_PUBLIC_BACK_END_URL=${NEXT_PUBLIC_BACK_END_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- runner: minimal, non-root runtime ---
FROM ${NODE_IMAGE} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

# Files stay owned by root (read-only for the node user).
# /app/.next/cache is the only runtime-writable path: mount a tmpfs on it.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Runtime only: drop the package managers and the setuid/setgid bits of the base image
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
      /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
 && find / -xdev -perm /6000 -type f -exec chmod a-s {} +

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.status<500?0:1)).catch(()=>process.exit(1))"]

CMD ["node", "server.js"]
