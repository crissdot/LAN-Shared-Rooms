FROM node:18-alpine

ARG REACT_APP_BACKEND_DOMAIN

WORKDIR /frontend

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "serve"]