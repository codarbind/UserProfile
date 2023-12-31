# UserProfileAPI

## Installation

1. Clone the repository.
2. Install Node.js and npm if not already installed.
3. Run 'npm install' to install project dependencies.

## Running the Project

1. Start a MongoDB server and configure the database URL in src/config.js.
2. Run 'npm start' to start the API server.

## Running Tests

1. Run 'npm test::units' to execute the Jest tests.

## API Endpoints

- POST /api/users: Create a new user profile.
- GET /api/users: Retrieve a list of user profiles.
- GET /api/users/:id: Retrieve a single user by ID, where ID could be user ID, username, or email.
- GET /api/users/username/:username: Retrieve a single user by username.
- PUT /api/users/:id: Update an existing user profile.
- DELETE /api/users/soft/:idOrEmailOrUsername: Soft delete a user by ID, email, or username.
- DELETE /api/users/hard/:idOrEmailOrUsername: Hard delete a user by ID, email, or username.
