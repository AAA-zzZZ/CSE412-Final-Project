# CSE412 Final Project

This project is our database manager app for CSE 412. We built a PostgreSQL database with several related tables, connected it to an Express backend, and then made a React frontend so we could actually view and manage the data instead of just staring at SQL all day.

The app lets us do CRUD operations for:

- Products
- Users
- Merchants
- Ratings
- Merchant product listings

There is also a manufacturer route in the backend for reading manufacturer data.

Note to grader: The other deatils not included in this README, can be found in the submission report.

## What We Used

- PostgreSQL for the database
- Express + Node.js for the backend API
- React for the frontend
- `pg` for the PostgreSQL connection
- `cors` and `express.json()` for handling frontend/backend communication

## Project Structure

- `server.js` = backend API routes
- `db.js` = PostgreSQL connection setup
- `schema.sql` = database creation commands and sample insert statements, same as phase 02
- `frontend/` = React frontend

## Database Setup

The commands used to set up the database were the same as Phase 02, and a sample of that has been provided again here in `schema.sql`.

That file includes:

- table creation commands
- sample insert statements
- optional cleanup commands
- sequence reset commands

Our database in `db.js` is currently set to:

- Host: `localhost`
- Port: `5432`
- Database: `CSE412 Group Project`
- User: `postgres`

If your local PostgreSQL setup is different, just update `db.js` before running the project.

## How To Run It

### 1. Install backend dependencies

From the project root:

```bash
npm install
```

### 2. Install frontend dependencies

From the `frontend` folder:

```bash
npm install
```

### 3. Set up the database

Use the SQL in `schema.sql` to create the tables and insert the sample data.

### 4. Start the backend

From the project root:

```bash
node server.js
```

The backend runs at:

```text
http://localhost:5000
```

### 5. Start the frontend

From the `frontend` folder:

```bash
npm start
```

The frontend should open at:

```text
http://localhost:3000
```

## API Notes

We used REST-style routes in the backend. Some examples:

- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

For tables with composite keys, we used both IDs in the route:

- `PUT /api/ratings/:userid/:productid`
- `DELETE /api/ratings/:userid/:productid`
- `PUT /api/merchprod/:merchantid/:productid`
- `DELETE /api/merchprod/:merchantid/:productid`

## What The App Does

With the frontend, we can:

- view records in each table shown in the UI
- add new records
- edit existing records
- delete records

For `ratings` and `merchprod`, the backend also joins related tables so we can see readable names in the frontend instead of only raw IDs.

## Notes

- The frontend is set up to call the backend at `http://localhost:5000`
- The backend needs PostgreSQL running locally
- The sample data in `schema.sql` helps make sure the app is not empty when we start testing

## Summary

This project ties together our relational database design from Phase 01, SQL setup, backend CRUD routes, and a simple frontend interface. We used it to show that we can build the database, connect it to an API, and actually interact with the data in a full working app.
We hope you like it!
