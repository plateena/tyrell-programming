# Card Dealing Application Setup Guide

## Overview

This script interacts with an external API to distribute cards to players. It is a Node.js application using Axios for making HTTP requests. Also, there is a CLI script for it.

I'm using the CakePHP framework with Nginx to serve the backend application that handles the card dealing process. For the frontend, I'm using Node.js with Express, Axios, and EJS technology. Getting the input from the user and using Axios to call the API from the CakePHP backend and responding back the result to the user.

## Prerequisites

- Docker and Docker Compose

## Installation

1. **Clone the repository:**

    ```bash
    git clone git@github.com:plateena/tyrell-programming.git
    ```

2. **Get inside the file and run Docker Compose:**

    ```bash
    docker compose build
    docker compose up -d
    ```

3. **The frontend web base will be exposed on port 3000. You can access the URL at:**

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

- The api will respons in json format example: 

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
    or for the error response:
    ```json
        {
            "status": 400,
            "message": "Input value does not exist or value is invalid"
        }
    ```

### Additional Information:

- The frontend is served on port 3000.
- The backend is based on CakePHP and uses Nginx for serving.

## Cleanup
- To stop and clean up the Docker containers, run: 
    ```bash
    docker compose down
    ```


