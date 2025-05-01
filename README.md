# URL Shortener Service

A RESTful API service for shortening long URLs with tracking statistics. Easily create, manage, and monitor your short URLs.

## Features

- **Shorten URLs**: Convert long URLs into short, manageable codes.
- **Redirects**: Accessing a short URL redirects to the original URL (301 redirect).
- **CRUD Operations**: Create, retrieve, update, and delete short URLs.
- **Statistics**: Track how many times a short URL has been accessed.
- **Optional Frontend**: Minimal frontend to interact with the API.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:Islam-abdelwahed/URL-Shorten.git
   cd url-shortener
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DATABASE_URL= "your mongoDB URL"
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

## API Endpoints

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| POST   | `/shorten`              | Create a new short URL               |
| GET    | `/shorten/:shortCode`   | Retrieve a short URL's details       |
| PUT    | `/shorten/:shortCode`   | Update a short URL                   |
| DELETE | `/shorten/:shortCode`   | Delete a short URL                   |
| GET    | `/shorten/:shortCode/stats` | Get statistics for a short URL  |
