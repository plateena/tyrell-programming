# Card Dealing Application Setup Guide

## Overview

This script facilitates communication with an external API to distribute cards among players. It operates as a Node.js application, leveraging Axios for seamless HTTP requests. Additionally, there is a dedicated CLI script. The overall setup involves utilizing the CakePHP framework alongside Nginx to serve the backend application responsible for managing the card dealing process. On the frontend, Node.js, Express, Axios, and EJS technologies are employed. The workflow entails gathering user input, utilizing Axios to invoke the CakePHP backend API, and subsequently delivering the results back to the user.

## Prerequisites

- Docker and Docker Compose

## Installation

1. **Clone the repository:**

    ```bash
    git clone git@github.com:plateena/tyrell-programming.git
    ```

2. **Navigate to the project directory and run Docker Compose:**

    ```bash
    cd tyrell-programming
    docker compose build
    docker compose up -d
    ```

3. **Access the frontend web interface at:**

    [http://localhost:3000](http://localhost:3000)

4. **Command Line Option:**

    ```bash
    docker exec -it tyrell-nodejs ./deal-card-cli <number of people>
    ```

## Backend Documentation

- The backend API for card distribution is available at:

    ```
    http://localhost:8080/api/card-distribution/distribute/{numberPlayers}
    ```

    Replace `{numberPlayers}` with the actual number of players for card dealing.

- The API responds in JSON format. For example:

    ```json
    {
        "status": 200,
        "message": "Success",
        "data": [
            [ "C-9", "H-K", "S-J", "D-9", "H-5", "C-K", "H-9", "D-J", "D-X", "H-7", "H-8", "D-3", "D-5" ],
            [ "S-5", "D-Q", "H-4", "S-6", "D-K", "C-X", "S-4", "S-A", "H-X", "C-6", "S-X", "S-K", "H-Q" ],
            [ "C-5", "C-2", "C-J", "D-2", "C-7", "H-A", "D-A", "S-7", "S-9", "C-A", "H-6", "D-7", "D-4" ],
            [ "C-3", "S-3", "C-Q", "D-6", "H-2", "H-J", "S-8", "S-Q", "S-2", "C-4", "C-8", "H-3", "D-8" ]
        ]
    }
    ```

    For error responses:

    ```json
    {
        "status": 400,
        "message": "Input value does not exist or value is invalid"
    }
    ```

### Additional Information:

For your convenience, here are additional details about the application:
- Frontend Access: The frontend interface is accessible at http://localhost:3000.
- Backend Framework: The backend is developed using CakePHP at http://localhost:8080
- Server: Nginx is utilized to serve the application on the backend.

## Cleanup

To stop and clean up the Docker containers, run:

```bash
docker compose down
