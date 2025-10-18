# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia apenas arquivos de dependência para cache
COPY package.json pnpm-lock.yaml ./

# Instala todas as dependências (dev + prod)
RUN pnpm install

# Copia o restante do código e builda o Next.js
COPY . .
RUN pnpm build

# Stage 2: Produção
FROM node:20-alpine
WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia package.json e lockfile
COPY package.json pnpm-lock.yaml ./

# Instala apenas dependências de produção
RUN pnpm install --prod

# Copia build e public do stage anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Define porta interna do container
ENV PORT=3000
EXPOSE 3000

# Comando padrão de produção
CMD ["pnpm", "start"]