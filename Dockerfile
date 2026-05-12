FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npx prisma generate
RUN npm run build

# Final Stage
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

EXPOSE 3000

# Run migrations and start app
CMD npx prisma migrate deploy && npm start
