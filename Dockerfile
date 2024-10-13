FROM node:20 as builder

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn config set registry https://registry.npmmirror.com

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20-slim

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 80

ENV PORT 80

CMD ["node", "server.js"]