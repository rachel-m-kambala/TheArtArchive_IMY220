# The Art Archive

The Art Archive is a photo-sharing web application that allows artists to showcase their work, discover new creators, and engage with the creative community.

## Features

- Upload artwork
- Add descriptions and hashtags
- Local and Global feeds
- User profiles

## Technologies
- React
- Vite
- React Router
- Node.js
- Express
- Docker

## Installation

1. Clone the repository:
   git clone https://github.com/rachel-m-kambala/TheArtArchive_IMY220.git
   
## Running Locally

### Backend

1. Navigate to the backend folder:
   cd Deliverable1
   cd backend

2. Install dependencies:
   npm install

3. Start the backend:
   npm start

The backend runs on:
   http://localhost:5000

### Frontend

1. Open a new terminal and navigate to the frontend folder:
   cd Deliverable1
   cd frontend

2. Install dependencies:
   npm install

3. Start the frontend:
   npm run dev

The frontend runs on:
   http://localhost:5173

## Running with Docker

The frontend and backend run in separate Docker containers.

### Backend Container

1. Navigate to the backend folder:
   cd Deliverable1
   cd backend

2. Build the Docker image:
   docker build -t art-archive-backend .

3. Run the Docker container:
   docker run -p 5000:5000 art-archive-backend

The backend will be available at:
   http://localhost:5000

### Frontend Container

1. Open a new terminal and navigate to the frontend folder:
   cd Deliverable1
   cd frontend

2. Build the Docker image:
   docker build -t art-archive-frontend .

3. Run the Docker container:
   docker run -p 5173:5173 art-archive-frontend

The frontend will be available at:
   http://localhost:5173

## Author

- Rachel Kambala