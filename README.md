# Tutor Application

This repository contains a full-stack tutor application built with a React frontend and a Node.js backend. The application uses MongoDB as the database. The frontend is built with Vite, and the backend uses Express. Docker is used to containerize the application for development and production environments.

## Table of Contents

- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
  - [Development](#development)
  - [Production](#production)
- [CI/CD Pipeline](#cicd-pipeline)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
MONGODB_URL=mongodb://root:example@mongodb:27017/mydatabase?authMechanism=DEFAULT
```

## Running the Application

### Development

To run the application in development mode:

### Clone the repository:
```sh 
git clone https://github.com/harambee-developers/Project_Tutor_App.git
cd Project_Tutor_App
```
### Build and start the containers:

```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```
This command will start the frontend on http://localhost:5173 and the backend on http://localhost:7777.

Access the application:
    Frontend: http://localhost:5173
    Backend: http://localhost:7777

### Production

To run the application in production mode:

### Clone the repository:
```sh
git clone https://github.com/harambee-developers/Project_Tutor_App.git
cd Project_Tutor_App
```
### Build and start the containers:
```sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```
This command will start the frontend on http://localhost (port 80) and the backend on http://localhost:7777.

Access the application:
    Frontend: http://localhost
    Backend: http://localhost:7777