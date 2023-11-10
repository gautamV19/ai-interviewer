FROM node:18-alpine

WORKDIR /app

ENV APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
ENV APPWRITE_PROJECT_ID=64d1102db3f877d3874a

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]