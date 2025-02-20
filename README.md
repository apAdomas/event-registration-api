# Event Registration API

## Overview

The Event Registration API is a simple RESTful API that allows users to view, create, and register for events. It provides basic event management and user registration functionalities while enforcing these constraints:

- **Unique user emails:** A user cannot register with an email that already exists.
- **Unique events:** An event is unique based on the combination of **name**, **date**, and **location** (the description is not used for uniqueness).
- **Duplicate registrations:** The same user cannot register for the same event twice.
- **Upcoming events:** When retrieving events, only those with a date greater than or equal to the current date are returned.

## Features

- **User Registration:**  
  Users can register with their full name, email, and password. Registration is only allowed if the email is unique.

- **Event Management:**  
  - Create new events by providing a name, description, date, and location.
  - Prevent duplicate events based on the combination of name, date, and location.
  - Retrieve upcoming events (events with a date on or after the current date).

- **Event Registration:**  
  Users can sign up for events, and duplicate registrations (same user for the same event) are prevented.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Validation:** Joi (with custom validators)
- **Testing:** Jest

## Setup Instructions
### 1. Clone the Repository
```git clone https://github.com/apAdomas/event-registration-api.git```
 
```cd event-registration-api```

### 2. Install Dependencies
```npm install```

### 3. Copy the `.env.example` file to create `.env` file:
```cp .env.example .env```
### 4. Edit `.env` file and set up database credentials
```sh
SQL_USERNAME=your_username
SQL_PASSWORD=your_password
SQL_DATABASE_NAME=your_database
SQL_HOST=your_host
```
### 5. Start the server
`npm run dev` 