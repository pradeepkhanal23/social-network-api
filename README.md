# Social Media API

This is a RESTful API for social media type of platform. It is built with Node.js, Express and MongoDB.The API here manages the users, their associated thoughts, friends and and the reactions of their thoughts respectively.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Questions](#questions)

## Introduction

This API serves as the backend for a social media platform where users can post thoughts, react to thoughts, add friends, and more.

## Features

- User management (CRUD operations)
- Thought management (CRUD operations)
- Reaction management (Add and remove reactions to thoughts)
- Friend management (Add and remove friends between users)
- Database seeding for initial data setup
- Error handling and validation

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- RESTful API principles
- Postman (for testing API endpoints)

## Demo

The full demo video on this project is available [here.](https://youtu.be/eeCbryWY-zU)

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed locally or accessible remotely.

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone git@github.com:pradeepkhanal23/social-network-api.git
   ```

2. **Navigate to Project Directory**

   ```
   cd social-network-api
   ```

3. **Install Dependencies**

   ```
   npm install
   ```

   The server will start at `http://localhost:3001`

4. **Start the Server**

   ```
   npm start
   ```

## Usage

### API Endpoints

#### Users

- **GET /api/users**: Fetch all users.
- **POST /api/users**: Create a new user.
- **GET /api/users/:userId**: Fetch a single user by `_id`.
- **PUT /api/users/:userId**: Update a user by `_id`.
- **DELETE /api/users/:userId**: Delete a user by `_id`.

#### Friends

- **POST /api/users/:userId/friends/:friendId**: Add a friend to a user's friend list.
- **DELETE /api/users/:userId/friends/:friendId**: Remove a friend from a user's friend list.

#### Thoughts

- **POST /api/users/:userId/thoughts**: Create a new thought associated with a user.
- **PUT /api/users/:userId/thoughts/:thoughtId**: Update a thought associated with a user.

#### Thoughts Endpoints

- **GET /api/thoughts**: Fetch all thoughts.
- **GET /api/thoughts/:thoughtId**: Fetch a single thought by `_id`.
- **DELETE /api/thoughts/:thoughtId**: Delete a thought by `_id`.

#### Reactions

- **POST /api/thoughts/:thoughtId/reactions**: Create a reaction for a thought.
- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId**: Delete a reaction from a thought by `reactionId`.

## Testing

- Use API testing tools like Insomnia or Postman to interact with the endpoints.
- Verify that data operations (GET, POST, PUT, DELETE) work as expected.

## Questions

If you have any questions, feel free to reach out:

- **GitHub**: [pradeepkhanal23](https://github.com/pradeepkhanal23)
- **Email**: [pradeepkhanal642@gmail.com](mailto:pradeepkhanal642@gmail.com)
