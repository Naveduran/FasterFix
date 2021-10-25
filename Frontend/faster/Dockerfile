FROM node:alpine AS deps

COPY . /code/
WORKDIR /code/

RUN npm install
RUN npm install tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9

EXPOSE 3000
CMD ["npm", "start"]
