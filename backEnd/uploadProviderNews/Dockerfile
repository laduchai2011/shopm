FROM node:18-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build:prod

RUN cp -a public prod-build-optimization

CMD ["node", "./prod-build-optimization/main.js"]