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

COPY package.json pnpm-lock.yaml ./

# 🔒 sem scripts
RUN pnpm install --prod --ignore-scripts

# se precisar de binários nativos (sharp etc)
RUN pnpm rebuild

# 👇 copia build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# 👇 IMPORTANTE: copia teus dados/config
COPY --from=builder /app/data ./data

ENV PORT=3000
EXPOSE 3000

CMD ["pnpm", "start"]