FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY tailwind.config.js .

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve 

CMD ["serve","-s","dist"]