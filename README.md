# School Management API

A simple Node.js + Express + MySQL API to manage school data.

## Features
- Add a new school
- List schools sorted by proximity to a given location
- Input validation
- MySQL database integration

## Tech Stack
- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- cors

---

## Project Structure

~~~bash
educase-nodejs-assignment/
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .env.example
├── .gitignore
├── sql/
│   └── schema.sql
└── src/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── schoolController.js
    └── routes/
        │   └── schoolRoutes.js
~~~

---

## Prerequisites
Make sure you have these installed:
- Node.js
- npm
- MySQL

---

## 1) Install Dependencies

If the project is already cloned or downloaded, run:

~~~bash
npm install
~~~

If you are creating the project from scratch, run:

~~~bash
npm init -y
npm install express mysql2 dotenv cors
npm install -D nodemon
~~~

---

## 2) Environment Variables

Create a `.env` file in the root folder and add:

~~~env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_Db
DB_PORT=3306
~~~

---

## 3) Create Database and Table from Terminal

### Step 1: Open MySQL terminal
~~~bash
mysql -u root -p
~~~

### Step 2: Create the database
Inside the MySQL shell, run:

~~~sql
CREATE DATABASE IF NOT EXISTS school_Db;
~~~

### Step 3: Exit MySQL
~~~sql
exit
~~~

### Step 4: Run the SQL file to create the table
From the project root, run:

~~~bash
mysql -u root -p school_Db < sql/schema.sql
~~~

This will create the `schools` table inside `school_Db`.

---

## 4) SQL Schema

The table schema is inside:

~~~bash
sql/schema.sql
~~~

### Current schema
~~~sql
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    logitude FLOAT NOT NULL
);
~~~

> Note: The column name is `logitude` in the current code and SQL file.  
> If you want to correct it to `longitude`, update it in both the SQL file and the controller.

---

## 5) Run the Project

Start the server in development mode:

~~~bash
npm run dev
~~~

The API will run on:

~~~bash
http://localhost:3000
~~~

---

## 6) API Endpoints

All routes are prefixed with:

~~~bash
/api
~~~

---

### 6.1 Add School API

**Endpoint:**
~~~bash
POST /api/addschool
~~~

**Request Body:**
~~~json
{
  "name": "Green Valley School",
  "address": "Andheri East, Mumbai",
  "latitude": 19.1136,
  "longitude": 72.8697
}
~~~

**Success Response:**
~~~json
{
  "message": "School added successfully!!",
  "school": [
    {
      "id": 1,
      "name": "Green Valley School",
      "address": "Andheri East, Mumbai",
      "latitude": 19.1136,
      "logitude": 72.8697
    }
  ]
}
~~~

---

### 6.2 List Schools API

**Endpoint:**
~~~bash
GET /api/listschool
~~~

**Request Body:**
~~~json
{
  "latitude": 19.076,
  "longitude": 72.8777
}
~~~

> Note: The current implementation reads `latitude` and `longitude` from the request body.

**Success Response:**
~~~json
{
  "message": "Schools found sccessfully!",
  "totalSchools": 1,
  "schools": [
    {
      "id": 1,
      "name": "Green Valley School",
      "address": "Andheri East, Mumbai",
      "latitude": 19.1136,
      "logitude": 72.8697,
      "distanceInKM": 4.92
    }
  ]
}
~~~

---

## 7) Testing with Postman

### Add School
- Method: `POST`
- URL: `http://localhost:3000/api/addschool`
- Body: raw JSON

### List Schools
- Method: `GET`
- URL: `http://localhost:3000/api/listschool`
- Body: raw JSON with latitude and longitude

---

## 8) Deployment Steps

### Backend Hosting
You can deploy the backend on a Node.js hosting service such as Render.

#### Deployment flow
1. Push the project to GitHub.
2. Open the hosting dashboard.
3. Create a new Web Service.
4. Connect your GitHub repository.
5. Select the correct branch.
6. Set the build command:
   ~~~bash
   npm install
   ~~~
7. Set the start command:
   ~~~bash
   node server.js
   ~~~
8. Add environment variables from `.env` in the hosting dashboard.
9. Deploy the service.
10. Copy the live API URL.

#### Important
Before deployment, make sure your `server.js` listens on:

~~~js
const PORT = process.env.PORT || 3000;
~~~

---

### Database Hosting
Use a hosted MySQL database provider such as:
- Aiven MySQL
- Railway MySQL
- PlanetScale
- Any other MySQL hosting service

Update the `.env` values in the hosting dashboard with the hosted database credentials.

---

## 9) Postman Collection

A Postman collection is included/shared separately for:
- Add School API
- List Schools API

It contains:
- Example requests
- Example responses
- Endpoint documentation

---

## 10) Common Commands

Run the server:
~~~bash
npm run dev
~~~

Create database:
~~~bash
mysql -u root -p
~~~

Create table:
~~~bash
mysql -u root -p school_Db < sql/schema.sql
~~~

---

## 11) Notes
- Make sure MySQL is running before starting the API.
- Make sure `.env` values match your database credentials.
- If you change the database name, update `.env` accordingly.
- The route names in this project are lowercase:
  - `/api/addschool`
  - `/api/listschool`
- The current SQL file uses `logitude` instead of `longitude`.
  - Keep it as-is for this codebase, or rename it consistently in both SQL and controller.

---