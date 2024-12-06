# Electronic products retailer

## Prelimineries

You need to have [Docker](https://www.docker.com/) and [npm](https://nodejs.org/en) installed on your computer.

## Installation

1. Download this repository as a zip file:

2. Extract the files into some location:

3. Open the terminal or command prompt:

4. Navigate to the project directory:
   ```bash
   cd technest
   ```
5. Navigate to the server folder
   ```bash
   cd server
   ```
6. Build the project using docker compose:
   ```bash
   docker compose build
   ```
7. Run the server:
   ```bash
   docker compose up
   ```
8. Open a new terminal and navigate to the client:
   ```bash
   cd client
   ```
9. Install the dependencies:
   ```bash
   npm i
   ```
1. Start the app:
   ```bash
   npm run dev
   ```
1. Use the URL given by the above command to open the website:
   ```bash
    http://localhost:5173/
   ```
1. Use following credentials to login:
   ```bash
    email: zeek@gmail.com
    password: zeek@123
   ```
1. If You want to restart the application, Use following command to clean up the containers:
   ```bash
    cd server
    docker compose down
    docker volume prune -f
    docker compose build
    docker compose up
   ```

## Usage

1. Register or sign in to your account.

2. Explore the app's features

> **Note:** : You don't need to import the database dump manually, the `Docker` handles the import automatically.

## License

This project is licensed under the MIT License. 
