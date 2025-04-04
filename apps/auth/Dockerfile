# apps/auth/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copy only essential files for dependency installation
COPY package.json yarn.lock ./
COPY apps/auth apps/auth/

# 2. Copy remaining files
COPY . .

# 3. Build using direct path (avoids workspace issues)
RUN cd apps/auth && yarn build

# Development stage
FROM node:20-alpine AS development
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/auth ./dist
VOLUME ["/app/apps/auth", "/app/libs"]
CMD ["yarn", "workspace", "@app/auth", "start:dev"]