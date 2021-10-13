FROM node:alpine AS deps

COPY . /code/
WORKDIR /code/

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
