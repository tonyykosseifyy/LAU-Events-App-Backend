# LAU Event App Backend API Documentation

## Overview

The LAU Event App Backend API manages users, events, and clubs at the Lebanese American University. It serves as the backend for a corresponding frontend application.

## API Endpoints

### Authentication Routes
- **Sign-in**
  - `POST /signin`
  - Description: Existing user sign-in or new user sign-up.

- **Refresh Token**
  - `POST /refreshToken`
  - Description: Refresh user's access token.

- **Sign-out**
  - `POST /signout`
  - Description: Existing user sign-out.

- **Sign-up**
  - `POST /signup`
  - Description: New user registration.

- **Admin Confirmation**
  - `GET /confirmation/admin`
  - Description: Confirm admin status.

### Club Routes
- **Get All Clubs**
  - `GET /clubs/`
  - Description: Retrieve all clubs.

- **Get Specific Club**
  - `GET /clubs/{id}`
  - Description: Retrieve a specific club by its ID.

- **Get Club with Events**
  - `GET /clubs/{id}/events`
  - Description: Retrieve a specific club by its ID along with its events.

- **Create Club**
  - `POST /clubs/`
  - Description: Create a new club.

- **Update Club**
  - `PUT /clubs/{id}`
  - Description: Update a specific club by its ID.

- **Delete Club**
  - `DELETE /clubs/{id}`
  - Description: Delete a specific club by its ID.

### ClubEvent Routes
- **Get All ClubEvents**
  - `GET /clubEvent/`
  - Description: Retrieve all ClubEvents.

- **Get Specific ClubEvent**
  - `GET /clubEvent/{id}`
  - Description: Retrieve a specific ClubEvent by its ID.

- **Create ClubEvent**
  - `POST /clubEvent/`
  - Description: Create a new ClubEvent.

- **Update ClubEvent**
  - `PUT /clubEvent/{id}`
  - Description: Update a specific ClubEvent by its ID.

- **Delete ClubEvent**
  - `DELETE /clubEvent/{id}`
  - Description: Delete a specific ClubEvent by its ID.

### Dashboard Routes
- **Get Dashboard Statistics**
  - `GET /dashboard/`
  - Description: Retrieve the statistics for the Dashboard.

- **Get All Data**
  - `GET /dashboard/all`
  - Description: Retrieve all data for the Dashboard.

### Event Routes
- **Get All Events**
  - `GET /event/`
  - Description: Retrieve all events.

- **Get Single Event**
  - `GET /event/{id}`
  - Description: Retrieve a single event by ID.

- **Create Event**
  - `POST /event/`
  - Description: Create a new event.

- **Update Event**
  - `PUT /event/{id}`
  - Description: Update an existing event by ID.

- **Delete Event**
  - `DELETE /event/{id}`
  - Description: Delete an event by ID.

- **Get Event Details**
  - `GET /event/{id}/details`
  - Description: Retrieve details of a single event by ID.

### UserEvent Routes
- **Get All User Events**
  - `GET /userEvents/`
  - Description: Retrieve all user events.

- **Get User Event by ID**
  - `GET /userEvents/{id}`
  - Description: Retrieve a user event by ID.

- **Create User Event**
  - `POST /userEvents/`
  - Description: Create a new user event.

- **Update User Event**
  - `PUT /userEvents/{id}`
  - Description: Update a user event by ID.

- **Delete User Event**
  - `DELETE /userEvents/{id}`
  - Description: Delete a user event by ID.

### User Routes
- **Get All Users**
  - `GET /users/`
  - Description: Retrieve all users.

- **Get User by ID**
  - `GET /users/{id}`
  - Description: Retrieve a user by ID.


## Related Repositories
This backend API is part of a larger application. The corresponding frontend repository can be found [here](https://github.com/link-to-frontend-repo).

## Built With
- **bcryptjs** - Used for hashing passwords.
- **cookie-parser** - Middleware for parsing cookies.
- **dotenv** - Loads environment variables from a .env file.
- **expo-server-sdk** - Server-side library for Expo SDK.
- **express** - Web framework for Node.js.
- **express-rate-limit** - Middleware for rate-limiting requests.
- **jade** - Template engine for Node.js.
- **joi** - Object schema description language and validator for JavaScript objects.
- **joi-password-complexity** - Joi extension for password complexity validation.
- **jsonwebtoken** - Implementation of JSON Web Tokens.
- **lodash** - Utility library providing convenience methods for working with arrays, numbers, objects, strings, etc.
- **lru-cache** - Least Recently Used (LRU) cache implementation.
- **morgan** - HTTP request logger middleware.
- **multer** - Middleware for handling `multipart/form-data`.
- **mysql2** - MySQL client for Node.js.
- **nodemailer** - Module for sending emails.
- **sequelize** - Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **swagger-jsdoc** - Integrates Swagger using JSDoc comments in your source code.



