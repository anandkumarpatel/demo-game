FROM node:20.0
ADD package.json /app/
ADD package-lock.json /app/
WORKDIR /app
RUN npm install --omit=dev
ADD . /app/
RUN npm run build
CMD ["npm", "run", "api"]
