FROM node:18-alpine
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci

COPY . .
!index.html

ENV NODE_ENV=production
RUN npm run build -s
RUN npm run start --if-present
RUN npm prune --omit=dev