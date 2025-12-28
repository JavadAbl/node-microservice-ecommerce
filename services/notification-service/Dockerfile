FROM node:24.12-alpine

WORKDIR /

COPY package.json .
COPY prisma .

ENV DATABASE_URL="file:./dev.db"

RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma db push

EXPOSE 3000

CMD [ "npm","run","dev" ]
