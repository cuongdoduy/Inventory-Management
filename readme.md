# **Fullstack Application with Next.js, NestJS, and MongoDB**

This project sets up a fullstack application using:
- **Frontend**: Next.js
- **Backend**: NestJS
- **Database**: MongoDB

The services are orchestrated with **Docker Compose** to ensure consistent and seamless deployment.

---

## **Prerequisites**
Make sure you have the following installed on your machine:
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

---
## **Setup Instructions**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project-root

# Create a .env file inside the backend directory:
# pass this information into backend/.env
MONGO_HOST=mongodb
MONGO_PORT=27017
MONGO_DATABASE=inventory
MONGO_USER=admin
MONGO_PASSWORD=password
```
### 2.Running project
#### 1. Start the Docker Containers
Run the following command from the project root:
```bash
docker-compose up --d
```
This will:
- Start MongoDB on localhost:27017
- Run the NestJS backend on localhost:5000
- Launch the Next.js frontend on localhost:3000

#### 2. Stop the Docker Containers
To stop and remove the containers, run:
```bash
docker-compose down
```
If you need to remove all data as well run:
```bash
docker-compose down -v
```

---
## **Available Endpoints**
### Frontend (Next.js)
- URL: http://localhost:3000
### Backend (NestJS) 
- Base URL: http://localhost:5000
- API Documentation (Swagger): http://localhost:5000/api




