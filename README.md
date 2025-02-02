# Clinimood-MERN-backend

## Description
This is the **RESTful API** developed using **node.js** with **Expres**s, made to manage medical appointments as well as see medical 
appointments and patients if you're a doctor. The app allows to **create, update and delete** users, medical appointments and
medical histories.

## Project structure
The project is organized n the following folders:
- `docs`: Contains all the **jsdoc** documentation pages.
- `src`: Our project folder.
  - `config`: Contains the projects **DB config files**
  - `controllers`: Contains all the controllers to get info from the **API**
  - `models`: Contains **DB models** for each table.
  - `routes`: Contains our **API** routes from where we call each endpoint.
  

## Installation

### Clone the repo
```bash
git clone https://github.com/c0d3sh0rt4g3/Clinimood-MERN-backend.git
```

### Install dependencies
```bash
npm install
```

### Add env variables
The only **env variable** that you will need to launch this project will be a variable called **MONGO_URI**, this variable
would be the url to your **mongoDB instance**

### Usage
To execute the server, execute the following command:
```bash
npm start
```
That will launch the server on http://localhost:5000

## Endpoints
### User
`GET /users`: Get all users. \
`GET /users/:dni`: Get a user by his **DNI**. \
`GET /users/role/:role`: Get all users with a specific role. \
`PUT /users/:dni`: Updates data of the user with the **DNI** given. \
`POST /users`: Registers a user with his **DNI, name, email, password and role** as mandatory fields. \
`POST /users/login`: Logs in a user using his email and password. \
`DELETE /users/:dni`: Deletes the user with the spceified **DNI**.

### History
`GET /history`: Get medical histories of all patients. \
`POST /history`: Creates a medical history for a patient with an specified **DNI** on the body of the call. \
`DELETE /history/:dni`: Deletes a patients history with the **DNI** of that patient.

### Appointments
`GET /appointments`: Get medical appointments of all patients. \
`GET /appointments/:dni`: Get all appointments of a patient by his **DNI**. \
`POST /appointments`: Creates a new appointment between a patient and a doctor with a date, description, patient **DNI** 
and doctor **DNI** as mandatory fields on the body of the call. \
`PUT /appointments/:appointmentId`: Updates data of an appointment that has the **appoitnment id** given. \
`DELETE /appointments/:appointmentId`: Deletes an appointment that has the **appoitnment id** given.

## Deployment
The url to the API deployed on [render]()

## JDOCS documentation
The url to our app backend documented with [jdocs](https://c0d3sh0rt4g3.github.io/Clinimood-MERN-backend/)
