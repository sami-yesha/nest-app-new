# apps/auth/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copy only essential files for dependency installation
COPY package.json yarn.lock ./
COPY apps/gateway apps/gateway/

# 2. Copy remaining files
COPY . .

# 2. Build using direct path (avoids workspace issues)
RUN cd apps/gateway && yarn build

# Development stage
FROM node:20-alpine AS development
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/gateway ./dist
VOLUME ["/app/apps/gateway", "/app/libs"]
CMD ["yarn", "workspace", "@app/gateway", "start:dev"]