# Stage 1: Build the application
FROM node:18-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx tsc --build tsconfig.build.json

# Stage 2: Run the application
FROM node:18-alpine as executor
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
EXPOSE 4000

CMD [ "node", "build/index.js" ]