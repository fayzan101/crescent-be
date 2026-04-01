

# ---------- Build Stage ----------
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
RUN apk add --no-cache openssl
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- Production Stage ----------
FROM node:18-alpine AS production
WORKDIR /usr/src/app
RUN apk add --no-cache openssl
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/main.js"]
