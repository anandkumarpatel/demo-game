FROM node:20.0
ADD package.json /app/
ADD package-lock.json /app/
WORKDIR /app
RUN npm install --omit=dev
COPY build /app/build
COPY server.js /app
CMD ["npm", "run", "api"]
