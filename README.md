# Real-Time Bidding Platform

This project is a comprehensive real-time bidding platform built with Node.js, Express, Socket.io, and MySQL. The platform supports advanced CRUD operations, user authentication, role-based access control, real-time bidding, and notifications.


## Features

- User authentication and authorization
- Role-based access control (user, admin)
- CRUD operations for auction items
- Real-time bidding with Socket.io
- Notification system for bids
- Image upload functionality for auction items
- Unit and integration tests


## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [MySQL](https://www.mysql.com/) (v8 or later)
- [npm](https://www.npmjs.com/) (v6 or later)


## Installation

1. **Clone the repository**
`git clone https://github.com/maaz64/real-time-bidding-platform-API.git`

2. **Navigate to root directory** `cd real-time-bidding-platform-API`

3. **Install dependencies**: `npm install`
4. **Set up environment variables in a `.env` file**
5. **Create the database schema**
6. **Run the server: `npm start`**


## Configuration

#### Create a .env file in the root directory of the project and add the following environment variables:

- `PORT=3000`
- `JWT_SECRET=your_jwt_secret`
- `DATABASE_URL = mysql://username:password@localhost:3306/your_db`
- `DATABASE_URL_TEST= mysql://username:password@localhost:3306/your_test_db`

## Database Setup

#### Create the MySQL database
`CREATE DATABASE bidding_db;
`

## API Endpoints

### Users

- `POST /users/register`: Register a new user
- `POST /users/login`: Authenticate a user and return a token
- `GET /users/profile`: Get the profile of the logged-in user

### Items

- `GET /items`: Retrieve all auction items (with pagination)
- `GET /items/:id`: Retrieve a single auction item by ID
- `POST /items`: Create a new auction item (authenticated users)
- `PUT /items/:id`: Update an auction item by ID (authenticated users)
- `DELETE /items/:id`: Delete an auction item by ID (authenticated users)

### Bids

- `GET /items/:itemId/bids`: Retrieve all bids for a specific item
- `POST /items/:itemId/bids`: Place a new bid on a specific item (authenticated users)

### Notifications

- `GET /notifications`: Retrieve notifications for the logged-in user
- `POST /notifications/mark-read`: Mark notifications as read

## Testing

#### Run the tests

`npm test`