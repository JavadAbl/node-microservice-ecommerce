FROM node:24.12-alpine

WORKDIR /app

COPY package.json .
COPY prisma .

ENV DATABASE_URL="mysql://admin:admin@notifications-db:3306/notifications_db"

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm","run","dev" ]
