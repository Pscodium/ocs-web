# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

# 🔒 sem scripts
RUN pnpm install --ignore-scripts

# mantém criação do config (se ainda precisar)
RUN mkdir -p /app/data && echo '{"items":[]}' > /app/data/config.json

COPY . .

RUN pnpm build

# Stage 2: Produção
FROM node:20-alpine
WORKDIR /app

RUN npm install -g pnpm
RUN addgroup -S app && adduser -S app -G app

COPY package.json pnpm-lock.yaml ./

# 🔒 sem scripts
RUN pnpm install --prod --ignore-scripts

# se precisar de binários nativos (sharp etc)
RUN pnpm rebuild

# 👇 copia build
COPY --from=builder --chown=app:app /app/.next ./.next
COPY --from=builder --chown=app:app /app/public ./public
COPY --from=builder --chown=app:app /app/next.config.mjs ./next.config.mjs

# 👇 IMPORTANTE: copia teus dados/config
COPY --from=builder --chown=app:app /app/data ./data

ENV PORT=3000
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD node -e "const n=require('net');const p=process.env.PORT||3000;const s=n.connect(p,'127.0.0.1');s.on('connect',()=>{s.destroy();process.exit(0)});s.on('error',()=>process.exit(1));setTimeout(()=>process.exit(1),4000);"
USER app

CMD ["pnpm", "start"]