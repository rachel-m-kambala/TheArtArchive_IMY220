# The Art Archive

The Art Archive is a photo-sharing web application where artists can share their work, discover other creators, manage profiles, create albums, and interact with posts.

## Features

- User signup, login and logout
- User profiles
- Create, edit and delete posts
- Local and Global feeds
- Albums
- Comments and post reporting
- Friend interactions

## Technologies

- React
- Vite
- React Router
- Tailwind CSS
- Node.js
- Express
- MongoDB Atlas
- Docker

## Installation

Clone the repository:

git clone https://github.com/rachel-m-kambala/TheArtArchive_IMY220.git

Create `backend/.env` and add:

MONGO_URI=mongodb+srv://u23559129_db_user:Purple1sal1festyle@cluster0.udird4d.mongodb.net/?appName=Cluster0
PORT=5000

## Running Locally

### Backend
cd Deliverable2/backend
npm install
npm start

Runs on `http://localhost:5000`.

### Frontend
cd Deliverable2/frontend
npm install
npm run dev

Runs on `http://localhost:5173`.

## Running with Docker
Make sure Docker Desktop is running.

Create the network:
docker network create artarchive-network

### Backend
cd Deliverable2/backend
docker build -t artarchive-backend .
docker run -d --name backend --network artarchive-network --env-file .env -p 5000:5000 artarchive-backend

### Frontend
cd Deliverable2/frontend
docker build -t artarchive-frontend .
docker run -d --name frontend --network artarchive-network -e VITE_API_PROXY_TARGET=http://backend:5000 -p 5173:5173 artarchive-frontend


Open the application at `http://localhost:5173`.

To stop the containers:
docker stop frontend backend

## Running with Docker Compose

Docker Compose is the recommended way to run the frontend and backend together.

Ensure Docker Desktop is running and that your docker-compose.yml file is in the directory containing the backend and frontend folders.

From that directory, build and start the application:

docker compose up --build

To run the containers in the background:

docker compose up --build -d

Open the application at:

http://localhost:5173

The backend API is available at:

http://localhost:5000

## Useful Docker Compose Commands

View running containers:

docker compose ps

View application logs:

docker compose logs -f

View backend logs only:

docker compose logs -f backend

View frontend logs only:

docker compose logs -f frontend

Stop the application:

docker compose stop

Stop and remove the containers:

docker compose down

Rebuild the images after making Dockerfile or configuration changes:

docker compose up --build -d

## Create the Docker Network

docker network create artarchive-network

If the network already exists, you can continue without creating it again.

Build and Run the Backend

cd Deliverable2/backend
docker build -t artarchive-backend .
docker run -d --name backend --network artarchive-network --env-file .env -p 5000:5000 artarchive-backend

Build and Run the Frontend

cd ../frontend
docker build -t artarchive-frontend .
docker run -d --name frontend --network artarchive-network -p 5173:5173 artarchive-frontend

Open the application at:

http://localhost:5173

Stop the Containers

docker stop frontend backend

Remove the stopped containers if needed:

docker rm frontend backend

## Author

Rachel Kambala