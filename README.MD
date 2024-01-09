# LAU Event App Backend API Documentation

## Overview
The LAU Event App Backend API is designed to manage users, events, and clubs within the Lebanese American University. It facilitates interactions between students and the administrative body.

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
