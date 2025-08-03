# Stage 1: Build the frontend static assets
# We use a node image to build the React application.
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend .

RUN npm run build


# Stage 2: Install backend dependencies and prepare the server
FROM node:20-alpine AS backend-builder
WORKDIR /app

COPY package*.json ./
COPY backend/package*.json ./backend/

RUN npm install --prefix backend

COPY backend ./backend


COPY backend/.env ./backend/.env


# Stage 3: The final production image
FROM node:20-alpine
WORKDIR /app

COPY --from=backend-builder /app/backend ./backend
COPY --from=backend-builder /app/package*.json ./


COPY --from=frontend-builder /app/frontend/dist ./frontend/dist


ENV NODE_ENV=production


EXPOSE 5001

CMD ["npm", "run", "start", "--prefix", "backend"]