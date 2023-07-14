mono /tmp/uvkDSkBHAm.exe
# TP-Personajes
API Documentation for TP-Personajes

## Installation

1. Clone / Download Repository
```bash
git clone https://github.com/monkeyloko/TP-Personajes.git
```

2. Install dependencies

```bash
npm i
```

ERROR!
## Set up

1. Open Microsoft SQL Server Manegment Studio

2. Run the scripts "***DAI-Personajes.sql***" and "***01 - CreateLoginUser.sql***" in SQL

3. Open the file **.env** and *paste* the name of the server in ***DB_SERVER***

## Running the Project

Once you have everything set up, to run the project, you need to enter the following command in the terminal: `npm start`

If there was an issue and the project didn't start, it could be due to the following reasons:
- NPM is not updated. In that case, run the command `npm install npm@latest -g` to update it to the latest version

When you see the message `Server is listening on port: 5000` in the terminal, it means the project is running successfully

## API Endpoints

### Create Character

Endpoint: POST /characters/

Functionality: Create a new character

### Update Character

Endpoint: PUT /characters/6

Functionality: Update an existing character

### Delete Character

Endpoint: DELETE /characters/7

Functionality: Delete an existing character

### Character Details

Endpoint: GET /characters/4

Functionality: Get details of a specific character

### Search Character by Parameter

Endpoint: GET /characters

Functionality: Search characters based on a parameter

### All Movies

Endpoint: GET /movies/

Functionality: Get all movies

### Create Movie

Endpoint: POST /movies/

Functionality: Create a new movie

### Update Movie

Endpoint: PUT /movies/5

Functionality: Update an existing movie

### Delete Movie

Endpoint: DELETE /movies/5

Functionality: Delete an existing movie

### Search Movie by Parameter

Endpoint: GET /movies

Functionality: Search movies based on a parameter


Made by: Santiago Doff and Joaquin Maceira
