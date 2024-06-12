# Base image for frontend and backend
FROM node:20-alpine as base

WORKDIR /app

# Stage for frontend development
FROM base as frontend-dev
WORKDIR /app/frontend
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ .
CMD ["npm", "run", "dev"]

# Stage for backend development
FROM base as backend-dev
WORKDIR /app/backend
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server/ .
CMD ["npm", "run", "dev"]

# Stage for frontend production build
FROM base as frontend-build
WORKDIR /app/frontend
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Stage for serving frontend in production
FROM nginx:alpine as frontend-prod
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Stage for backend production
FROM base as backend-prod
WORKDIR /app/backend
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server/ .
COPY --from=frontend-build /app/frontend/dist /app/backend/public
CMD ["node", "index.js"]