FROM node:20-alpine3.19 AS build

COPY . /app/

WORKDIR /app

RUN npm install
RUN npm run dev

FROM node:20-alpine3.19 AS next

WORKDIR /app

COPY --from=build /app/package*.json .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next

EXPOSE 3000

CMD ["npm", "run", "dev"]