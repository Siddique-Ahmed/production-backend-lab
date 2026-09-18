# ===========================
# Stage 1: Builder
# ===========================
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ===========================
# Stage 2: Production
# ===========================
FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3  \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

USER node

CMD ["npm", "start"]