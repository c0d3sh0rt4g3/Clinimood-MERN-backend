# Clinimood-MERN-backend

## Description
This is the **RESTful API** developed using **node.js** with **Expres**s, made to manage medical appointments as well as see medical 
appointments and patients if you're a doctor. The app allows to **create, update and delete** users, medical appointments and
medical histories.

## Installation

### Clone the repo
```git clone https://github.com/c0d3sh0rt4g3/Clinimood-MERN-backend.git```

### Install dependencies
```npm install```

### Add env variables
The only **env variable** that you will need to launch this project will be a variable called **MONGO_URI**, this variable
would be the url to your **mongoDB instance**

### Usage
To execute the server, execute the following command:
```npm start```
That will launch the server on http://localhost:5000

## Endpoints
### User
``GET /users``: Get all users. \
``GET /users/:dni``: Get a user by his **DNI**. \
``GET /users/role/:role``: Get all users with a specific role. \
``PUT /users/:dni``: Updates data of the user with the **DNI** given. \
``POST /users``: Registers a user with his **DNI, name, email, password and role** as mandatory fields. \
``POST /users/login``: Logs in a user using his email and password. \
``DELETE /users/:dni``: Deletes the user with the spceified **DNI**.

## JDOCS documentation
The url to our app backend documented with [jdocs](https://c0d3sh0rt4g3.github.io/Clinimood-MERN-backend/)
