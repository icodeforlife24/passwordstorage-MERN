# Password Backend

This is the backend service for the Password Storage MERN application. It provides RESTful APIs for securely storing, retrieving, and managing user passwords.

## Features

- User authentication (JWT-based)
- Secure password storage (hashed and salted)
- CRUD operations for password entries
- Built with Node.js, Express, and MongoDB

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

```bash
git clone https://github.com/yourusername/passwordstorage-MERN.git
cd passwordstorage-MERN/passwordbackend
npm install
```

### Configuration

Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Running the Server

```bash
npm start
```

The server will run on `http://localhost:5000`.

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a JWT
- `GET /api/passwords` - Get all stored passwords (auth required)
- `POST /api/passwords` - Add a new password entry (auth required)
- `PUT /api/passwords/:id` - Update a password entry (auth required)
- `DELETE /api/passwords/:id` - Delete a password entry (auth required)

## License

MIT
